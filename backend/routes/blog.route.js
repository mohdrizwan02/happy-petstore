import { Router } from "express";

import { authentication } from "../middlewares/auth.middelware.js";

import {
  getAllBlogs,
  addBlog,
  getBlogById,
  editBlog,
  editBlogImage,
  deleteBlog,
} from "../controllers/blog.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(authentication);

router.route("/").get(getAllBlogs);

router.route("/add-blog").post(upload.single("image"), addBlog);

router.route("/:blogId").get(getBlogById);

router.route("/:blogId/edit-blog").patch(editBlog);

router
  .route("/:blogId/edit-blog-Image")
  .patch(upload.single("image"), editBlogImage);

  router.route("/:blogId/delete-blog").get(deleteBlog)

export default router;
