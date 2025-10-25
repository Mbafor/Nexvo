import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { formatDate, getReadTimeText } from "../utils/blogUtils";
import { getLatestPosts } from "../data/blogPosts";
=======
import blogsData from "../data/blogs.json";
>>>>>>> f100b2e5753ae8c64942b4494f3bb8bff3aa15d4

const LatestPosts = () => {
  const navigate = useNavigate();

<<<<<<< HEAD
  // Get the latest 3 posts
  const latestBlogs = getLatestPosts(3);

  const handleClick = (slug: string) => {
    navigate(`/blog/${slug}`);
=======
  // Sort newest first and take 3 latest posts
  const latestBlogs = [...blogsData]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const handleClick = (id: number) => {
    navigate(`/blog/${id}`);
>>>>>>> f100b2e5753ae8c64942b4494f3bb8bff3aa15d4
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {latestBlogs.map((blog) => (
        <div
          key={blog.id}
<<<<<<< HEAD
          onClick={() => handleClick(blog.slug)}
          className="cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
        >
          <div className="relative">
            <img
              src={blog.featuredImage.url}
              alt={blog.featuredImage.alt}
              className="w-full h-48 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=${encodeURIComponent(blog.category.name)}`;
              }}
            />
            <div className="absolute top-3 right-3">
              <span 
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: blog.category.color }}
              >
                {blog.category.icon} {blog.category.name}
              </span>
            </div>
          </div>
=======
          onClick={() => handleClick(blog.id)}
          className="cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
        >
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-48 object-cover"
          />
>>>>>>> f100b2e5753ae8c64942b4494f3bb8bff3aa15d4
          <div className="p-5">
            <h3 className="text-xl font-semibold text-[#1E3A8A] mb-2 line-clamp-2">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
<<<<<<< HEAD
              {formatDate(blog.metadata.publishedAt, 'short')} • {blog.author.name} • {getReadTimeText(blog.metadata.readingTime)}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {blog.tags.slice(0, 2).map((tag: string) => (
=======
              {blog.date} • {blog.author}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {blog.tags.slice(0, 2).map((tag) => (
>>>>>>> f100b2e5753ae8c64942b4494f3bb8bff3aa15d4
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
                >
<<<<<<< HEAD
                  #{tag}
=======
                  {tag}
>>>>>>> f100b2e5753ae8c64942b4494f3bb8bff3aa15d4
                </span>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
<<<<<<< HEAD
                handleClick(blog.slug);
=======
                handleClick(blog.id);
>>>>>>> f100b2e5753ae8c64942b4494f3bb8bff3aa15d4
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
