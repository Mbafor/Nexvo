import { useParams, useNavigate } from "react-router-dom";
import blogsData from "../data/blogs.json";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const blog = blogsData.find((b) => b.id === Number(id));

  // Handle missing blog gracefully
  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB]">
        <p className="text-xl text-red-600 mb-4 font-medium">
          Post not found
        </p>
        <button
          onClick={() => navigate("/blogs")}
          className="px-6 py-2 bg-[#1E3A8A] hover:bg-[#2A4EB0] text-white rounded-lg font-medium transition"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 h-16 bg-[#1E3A8A] border-b border-[#162B5A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between h-full">
          {/* Logo */}
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            QuickCV
          </h2>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => navigate("/builder")}
              className="text-white font-medium hover:text-[#93C5FD] transition"
            >
              Builder
            </button>
            <button
              onClick={() => navigate("/blogs")}
              className="text-white font-medium hover:text-[#93C5FD] transition"
            >
              Blogs
            </button>
          </div>
        </div>
      </nav>

      {/* Blog Content */}
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-3 leading-snug">
          {blog.title}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {blog.date} • {blog.author}
        </p>

        {/* Thumbnail */}
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-64 sm:h-80 object-cover rounded-xl mb-8 shadow-md"
        />

        {/* Blog Content */}
        <article
          className="prose prose-blue max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="mt-10">
          <button
            onClick={() => navigate("/blogs")}
            className="px-6 py-2 bg-[#1E3A8A] hover:bg-[#2A4EB0] text-white rounded-lg font-medium transition"
          >
            ← Back to Blogs
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#162B5A] bg-[#1E3A8A] text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm sm:text-base">
          <p>© 2025 QuickCV. Create professional CVs in minutes.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
