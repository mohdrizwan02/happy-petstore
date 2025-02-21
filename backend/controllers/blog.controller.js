import { asyncHandler } from "../utils/asyncHandler.js";

import { Blog } from "../models/blog.model.js";
import mongoose from "mongoose";

import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllBlogs = asyncHandler(async (req, res) => {
  const { category = "all", limit = 10, page = 1 } = req.query;

  console.log(category, limit, page);

  const perPage = parseInt(limit);
  const skip = (parseInt(page) - 1) * perPage;

  let blogs;
  let totalBlogs;

  let query = {}; // Default query fetches all blogs

  if (category === "latest") {
    query = {}; // No specific filter for latest, just sort by createdAt
  }

  if (category === "all") {
    query = {};
  }

  if (category === "latest") {
    blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);
    totalBlogs = await Blog.countDocuments();
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          blogs: blogs,
          totalPages: Math.ceil(totalBlogs / perPage),
        },
        "Latest blogs have been fetched successfully"
      )
    );
  }

  if (category === "all") {
    blogs = await Blog.find(query).skip(skip).limit(perPage);
    totalBlogs = await Blog.countDocuments();
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          blogs: blogs,
          totalPages: Math.ceil(totalBlogs / perPage),
        },
        "All blogs have been fetched successfully"
      )
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        blogs: {},
        totalPages: 0,
      },
      "fetched popular blogs"
    )
  );
});

const addBlog = asyncHandler(async (req, res) => {
  const owner = req.user._id;
  const { title, content } = req.body;
  const blogImageLocalPath = req.file?.path;
  console.log(content, title, blogImageLocalPath);

  if (!title || !content) {
    throw new ApiError(400, "All fields are required");
  }
  if (!blogImageLocalPath) {
    throw new ApiError(400, "Image for a blog is necessary");
  }

  const response = await uploadOnCloudinary(blogImageLocalPath);

  if (!response) {
    throw new ApiError(500, "Cloudinary image upload is failed");
  }

  const cloudinaryImagePath = response.url;

  const createdBlog = await Blog.create({
    title,
    content,
    image: cloudinaryImagePath,
    owner,
  });

  if (!createdBlog) {
    throw new ApiError(500, "error adding your blog");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        blog: createdBlog,
      },
      "blog has bee successfully created"
    )
  );
});

const getBlogById = asyncHandler(async (req, res) => {
  const blogId = new mongoose.Types.ObjectId(req.params?.blogId);

  console.log(blogId);

  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new ApiError(400, "Invalid Blog Id");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        blog,
      },
      "blog has been fetched successfully"
    )
  );
});

const editBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  console.log(title, content);

  const blogId = req.params?.blogId;

  const blog = await Blog.findByIdAndUpdate(
    new mongoose.Types.ObjectId(blogId),
    {
      $set: {
        title,
        content,
      },
    },
    {
      new: true,
    }
  );

  if (!blog) {
    throw new ApiError(400, "Blog not found invalid blog Id");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        blog,
      },
      "blog has been updated successfully"
    )
  );
});

const editBlogImage = asyncHandler(async (req, res) => {
  const blogId = req.params.blogId ; 

  const blogImageLocalPath = req.file?.path;

  if (!blogImageLocalPath) {
    throw new ApiError(400, "blog Image is required");
  }

  const response = await uploadOnCloudinary(blogImageLocalPath);

  if (!response) {
    throw new ApiError(500, "upload of file on Cloudinary is failed");
  }
  const cloudinaryFilePath = response.url;

  const blog = await Blog.findByIdAndUpdate(
    new mongoose.Types.ObjectId(blogId),
    {
      $set: {
        image: cloudinaryFilePath,
      },
    },
    {
      new: true,
    }
  );

  if (!blog) {
    throw new ApiError(500, "failed to update blog image");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        blog,
      },
      "Blog image has been successfully updated"
    )
  );
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blogId = req.params?.blogId;

  if (!blogId) {
    throw new ApiError(400, "Invalid request or blog id not provided");
  }

  const blog = Blog.findById(new mongoose.Types.ObjectId(blogId));

  if (!blog) {
    throw new ApiError(400, "blog found or invalid blog id");
  }

  if (String(blog.owner) !== String(req.user._id)) {
    throw new ApiError(400, "you are not the owner :: unauthorized request");
  }

  try {
    const response = await Blog.deleteOne({
      _id: blogId,
    });
    if (!response) {
      throw new ApiError(400, "error deleting the blog or Invalid blog id");
    }

    if (response.deletedCount == 0) {
      return res.status(300).json(
        new ApiResponse(
          300,

          response,
          "blog has been already deleted"
        )
      );
    }

    if (response.deletedCount == 1) {
      return res
        .status(200)
        .json(
          new ApiResponse(200, response, "blog has been successfully deleted")
        );
    }

    console.log(response);
  } catch (error) {
    throw new ApiError(400, "Invalid blog Id");
  }
});

export {
  getAllBlogs,
  addBlog,
  getBlogById,
  editBlog,
  editBlogImage,
  deleteBlog,
};
