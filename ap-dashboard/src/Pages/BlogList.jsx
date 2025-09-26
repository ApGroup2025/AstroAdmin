import React, { useEffect, useState } from "react";
import { FiCalendar, FiBook, FiLoader, FiTrash2 } from "react-icons/fi"; 
import { getAllBlogs, deleteBlog } from "../constants/api";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const fetchBlogs = async () => {
    try {
      const data = await getAllBlogs();
      console.log(data,"blogdata")
      setBlogs(data);
    } catch (err) {
      setError(err.message || "Error fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const confirmDelete = (blog) => {
    setSelectedBlog(blog);
    setShowDeletePopup(true);
  };
const handleDeleteConfirm = async () => {
  try {
    console.log(" Delete confirmation started...");
    console.log("Selected Blog:", selectedBlog);

    await deleteBlog(selectedBlog._id);
    console.log(" Blog deleted from server:", selectedBlog._id);

    setBlogs((prev) => {
      const updated = prev.filter((b) => b._id !== selectedBlog._id);
      console.log(" Updated blogs list:", updated);
      return updated;
    });

    console.log("Closing delete popup...");
    setShowDeletePopup(false);

    console.log("Resetting selected blog...");
    setSelectedBlog(null);

    console.log("Delete flow completed successfully!");
  } catch (err) {
    console.error(" Error deleting blog:", err);
    alert(err.message || "Error deleting blog");
  }
};


  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setSelectedBlog(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 mx-auto mb-4 animate-spin text-orange-600" />
          <p className="text-lg font-medium text-slate-700">Loading amazing blogs...</p>
          <p className="text-sm text-slate-500 mt-2">
            Please wait while we fetch the latest content
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <FiBook className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, #fff5f0 0%, #f0fdf4 50%, #ecfdf5 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
              <FiBook className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Latest{" "}
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-green-600"
                style={{
                  backgroundImage: `linear-gradient(135deg, #f97316, #ea580c, #006d4d)`,
                }}
              >
                Blogs
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover insightful articles, tutorials, and stories from our
              community
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                <FiBook className="w-12 h-12 text-orange-400" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-2">
                No blogs found
              </h3>
              <p className="text-slate-600">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {blogs.map((blog, index) => (
                <article
                  key={blog._id}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 hover:border-l-6"
                  style={{
                    borderLeftColor: index % 2 === 0 ? "#f97316" : "#006d4d",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <div className="flex flex-col lg:flex-row">
                    {blog.images && blog.images.length > 0 && (
                      <div className="lg:w-80 lg:flex-shrink-0">
                        <img
                          src={blog.images[0]}
                          alt={blog.title}
                          className="h-48 sm:h-56 lg:h-full w-full lg:w-80 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    )}

                    <div className="p-4 sm:p-6 lg:p-8 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-4 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <FiCalendar
                            className="w-4 h-4"
                            style={{
                              color: index % 2 === 0 ? "#f97316" : "#006d4d",
                            }}
                          />
                          <span className="font-medium">
                            {new Date(blog.createdAt).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      <h2 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-slate-700 transition-colors duration-200">
                        {blog.title}
                      </h2>

                   

                      {/* {blog.author && (
                        <div className="flex items-center gap-2 mb-4">
                          <span className="font-medium">By {blog.author}</span>
                        </div>
                      )} */}

                      <div className="flex items-center justify-between">
                        <span
                          className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#f97316" : "#006d4d",
                          }}
                        >
                          Article #{index + 1}
                        </span>
                     
                        <button
                          onClick={() => confirmDelete(blog)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-200"
                        >
                          <FiTrash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

  
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Confirm Delete
            </h3>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete{" "}
              {/* <span className="font-medium text-red-600">
                {selectedBlog?.title}
              </span> */}

            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogList;