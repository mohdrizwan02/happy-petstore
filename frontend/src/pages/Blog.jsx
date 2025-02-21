import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

const Blog = () => {
  const { blogId } = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setblog] = useState();
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    console.log(location)
    setLoading((prev) => true);
    window.scrollTo(0, 0);
    console.log(blogId);
    setTimeout(() => {
      axios.get(`/api/v1/blogs/${blogId}`).then((response) => {
        console.log(response);
        setblog((prev) => response.data.data.blog);
        setLoading((prev) => false);
      }).catch((error)=>{
        setLoading((prev)=>false)
        console.log(error) 
      });
    }, 1500);
  }, []);
  return (
    <>
      <div className="w-full min-h-screen">
        {!loading ? (
          blog ? (
            <div className="mx-auto max-w-screen-xl space-y-5 px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center sm:mx-10 ">
                <div className="">
                  <h1 className="text-lg">
                    Posted on : {blog.createdAt?.slice(0, 10)}
                  </h1>
                </div>
                {
                  <div className="">
                    <button className="bg-[#2f0601] px-2 py-1 rounded-lg text-white"
                      onClick={()=>navigate(location.pathname.replace("/view","/edit"))}
                    >
                      edit
                    </button>
                  </div>
                }
              </div>
              <div className="grid grid-cols-1  gap-4 md:grid-cols-2 md:gap-8">
                <div>
                  <img src={blog.image} className="rounded" alt="" />
                </div>

                <div className="w-full">
                  <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                    {blog.title}
                  </h2>

                  <p className="mt-4 text-gray-700">{blog.content}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-10 flex flex-col sm:flex-row justify-center items-center gap-10">
              <h1 className="text-center">Some error occured please go back</h1>
              <button
                className="px-2 py-1 bg-[#2f0601] rounded-lg text-white"
                onClick={() => navigate("/blogs")}
              >
                view blogs
              </button>
            </div>
          )
        ) : (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
