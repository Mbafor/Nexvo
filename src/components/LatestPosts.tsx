import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatDate, getReadTimeText } from "../utils/blogUtils";
import { getLatestPosts } from "../data/blogPosts";

const LatestPosts = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Get latest posts with limit
  const latestBlogs = getLatestPosts(3);

  const handleClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {latestBlogs.map((blog) => (
        <div
          key={blog.id}
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
          <div className="p-5">
            <h3 className="text-xl font-medium text-gray-900 mb-2 line-clamp-2">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {/* Format date and reading time */}
              {formatDate(blog.metadata.publishedAt, 'short')} • {blog.author.name} • {getReadTimeText(blog.metadata.readingTime)}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {blog.tags.slice(0, 2).map((tag: string) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick(blog.slug);
              }}
              className="text-blue-700 font-medium hover:text-blue-600 transition-colors"
            >
              {t('blog1.latest_posts.read_more')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestPosts;