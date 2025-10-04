import { useNavigate } from "react-router-dom";
import blogsData from "../data/blogs.json";

const LatestPosts = () => {
  const navigate = useNavigate();

  // Sort newest first and take 3 latest posts
  const latestBlogs = [...blogsData]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const handleClick = (id: number) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {latestBlogs.map((blog) => (
        <div
          key={blog.id}
          onClick={() => handleClick(blog.id)}
          className="cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
        >
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <h3 className="text-xl font-semibold text-[#1E3A8A] mb-2 line-clamp-2">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {blog.date} • {blog.author}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {blog.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick(blog.id);
              }}
              className="text-[#1E3A8A] font-medium hover:text-[#3B82F6] transition-colors"
            >
              Read More →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestPosts;
