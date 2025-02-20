import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("all");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading((prev) => true);

    setTimeout(() => {
      axios
        .get(`/api/v1/blogs?category=${category}&limit=${limit}&page=${page}`)
        .then((response) => {
          console.log(response);
          setBlogs((prev) => response?.data.data.blogs);
          setTotalPages((prev) => response.data.data?.totalPages);

          setLoading((prev) => false);
        })
        .catch((error) => {
          console.log(error);
          toast.error("error has occurred reload the page", {
            position: "top-center",
          });
          setLoading((prev) => false);
        });
    }, 2000);
  }, [category, page]);

  return (
    <>
      <div className="w-full ">
        <div className="bg-[#2f0601]/50">
          <div className="max-w-screen-xl mx-auto px-4 py-3 items-center gap-x-4 justify-between text-[#2f0601] sm:flex md:px-8">
            <p className="py-2 font-medium">
              You can also contribute to the commmunity by creating your own
              blogs.
            </p>
            <button
              className="flex-none inline-block w-full mt-3 py-2 px-3 text-center text-white font-medium bg-[#2f0601] duration-150 hover:bg-white hover:text-[#2f0601] rounded-lg sm:w-auto sm:mt-0 sm:text-sm"
              onClick={() => navigate("add-blog")}
            >
              Add Blog
            </button>
          </div>
        </div>
        <div className="flex justify-center w-full z-50 sticky top-5 mt-10">
          <div className="flex">
            <button
              className={`sm:w-[150px] w-[100px] ${
                category == "all"
                  ? "bg-[#2f0601] text-white"
                  : "bg-[white] text-[#2f0601]"
              } flex justify-center font-medium rounded-l px-5 py-2 border   border-[#2f0601] hover:bg-[#2f0601] hover:text-white`}
              onClick={() => setCategory((prev) => "all")}
            >
              Recent
            </button>

            <button
              className={`sm:w-[150px] w-[100px] ${
                category == "popular"
                  ? "bg-[#2f0601] text-white"
                  : "bg-[white] text-[#2f0601]"
              } flex justify-center font-medium px-5 py-2 border-t border-b   border-[#2f0601] hover:bg-[#2f0601] hover:text-white`}
              onClick={() => setCategory((prev) => "popular")}
            >
              Popular
            </button>

            <button
              className={`sm:w-[150px] w-[100px] ${
                category == "latest"
                  ? "bg-[#2f0601] text-white"
                  : "bg-[white] text-[#2f0601]"
              } flex items-center gap-x-2 justify-center font-medium rounded-r px-5 py-2 border border-[#2f0601] hover:bg-[#2f0601] hover:text-white`}
              onClick={() => setCategory((prev) => "latest")}
            >
              Latest
            </button>
          </div>
        </div>
        <div className="w-full min-h-screen my-10">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 md:mx-10  mx-5 grid-cols-1">
            {loading ? (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : blogs ? (
              blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <div
                    className="overflow-hidden rounded-lg mx-auto border w-[300px]  border-gray-100 bg-white shadow-lg"
                    key={index}
                  >
                    <img
                      alt="blog image"
                      src={blog.image}
                      className="h-56 w-full object-cover"
                    />

                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900">
                        {blog.title}
                      </h3>

                      <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        {blog.content}
                      </p>

                      <button
                        onClick={() => navigate(`${blog._id}`)}
                        className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                      >
                        view Blog
                        <span
                          aria-hidden="true"
                          className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                        >
                          &rarr;
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="">No Blogs found</div>
              )
            ) : (
              <div className="">error !No Blogs found</div>
            )}
          </div>
          {blogs.length > 0 && !loading && (
            <div className="flex  justify-center items-center">
              <div className="mt-4 flex items-center gap-2">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blogs;
