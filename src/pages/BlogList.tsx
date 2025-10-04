import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import blogsData from "../data/blogs.json";

const BlogList = () => {
  const navigate = useNavigate();

  // Sort blogs by most recent
  const sortedBlogs = [...blogsData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Navigate to single post
  const handleClick = (id: number) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 h-16 bg-[#1E3A8A] border-b border-[#162B5A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between h-full">
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            QuickCV
          </h2>
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

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1E3A8A] mb-10">
          Our Latest Blogs
        </h2>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedBlogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} onClick={handleClick} />
          ))}
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

export default BlogList;
