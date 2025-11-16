import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatDate, getReadTimeText } from "../utils/blogUtils";
import { getLatestPosts } from "../data/blogPosts";
import { BlogPost } from "../types/blog";

const LatestPosts = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Renamed variable: latestBlogs -> latestPosts
  const latestPosts = getLatestPosts(3);

  const handleClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Renamed iterator: blog -> post */}
      {latestPosts.map((post: BlogPost) => (
        <div
          key={post.id}
          onClick={() => handleClick(post.slug)}
          className="cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
        >
          <div className="relative">
            <img
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              className="w-full h-48 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=${encodeURIComponent(t(post.category.name))}`;
              }}
            />
            <div className="absolute top-3 right-3">
              <span 
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: post.category.color }}
              >
                {/* Translated Category Name */}
                {post.category.icon} {t(post.category.name)}
              </span>
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-xl font-medium text-gray-900 mb-2 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {formatDate(post.metadata.publishedAt, 'short')} • {post.author.name} • {getReadTimeText(post.metadata.readingTime)}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 2).map((tag: string) => (
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
                handleClick(post.slug);
              }}
              className="text-blue-700 font-medium hover:text-blue-600 transition-colors"
            >
              {/* Updated Key Structure */}
              {t('career_center.latest_posts.read_article')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestPosts;