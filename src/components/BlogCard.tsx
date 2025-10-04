import React from "react";

interface BlogCardProps {
  id: number;
  title: string;
  date: string;
  author: string;
  thumbnail: string;
  tags: string[];
  views: number;
  likes: number;
  onClick: (id: number) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  date,
  author,
  thumbnail,
  tags,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(id)}
      className="cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-2 flex flex-col overflow-hidden"
    >
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-[#1E3A8A] mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          {date} • {author}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex justify-between text-gray-600 text-sm">
      
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
