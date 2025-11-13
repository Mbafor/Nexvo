import React, { useState } from "react";
import { BlogPost } from "../types/blog";
import { formatDate, generateExcerpt, formatEngagementNumber, getReadTimeText } from "../utils/blogUtils";

interface BlogCardProps {
  post: BlogPost;
  onClick: (slug: string) => void;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick, featured = false }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const cardClass = featured 
    ? "group cursor-pointer bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden ring-2 ring-blue-500/20" 
    : "group cursor-pointer bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden";

  return (
    <article
      onClick={() => onClick(post.slug)}
      className={cardClass}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(post.slug);
        }
      }}
      aria-label={`Read article: ${post.title}`}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-700 text-white shadow-md">
            ⭐ Featured
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-48 lg:h-56 overflow-hidden bg-gray-100">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse bg-gray-200 w-full h-full"></div>
          </div>
        )}
        
        {!imageError ? (
          <img
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="text-4xl mb-2">📝</div>
              <div className="text-sm font-medium">{post.category.name}</div>
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span 
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white shadow-md backdrop-blur-sm"
            style={{ backgroundColor: post.category.color }}
          >
            {post.category.icon} {post.category.name}
          </span>
        </div>

        {/* Reading Time */}
        <div className="absolute bottom-4 left-4">
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-black/70 text-white backdrop-blur-sm">
            🕒 {getReadTimeText(post.metadata.readingTime)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
          {post.title}
        </h3>

        {/* Subtitle */}
        {post.subtitle && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {post.subtitle}
          </p>
        )}

        {/* Excerpt */}
        <p className="text-gray-700 mb-4 flex-1 line-clamp-3 leading-relaxed">
          {generateExcerpt(post.content.intro, 120)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Author and Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=3B82F6&color=fff&size=32`;
                }}
              />
              {post.author.verified && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-700 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
              <p className="text-xs text-gray-500">{formatDate(post.metadata.publishedAt, 'short')}</p>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{formatEngagementNumber(post.engagement.views)}</span>
            </span>
            
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{formatEngagementNumber(post.engagement.likes)}</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
