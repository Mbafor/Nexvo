import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Import added
import { BlogFilter, Category } from '../../types/blog';
import { extractAllTags, extractAllAuthors } from '../../utils/blogUtils';
import { BlogPost } from '../../types/blog';

interface BlogFiltersProps {
  filters: BlogFilter;
  onFilterChange: (filters: BlogFilter) => void;
  categories: Category[];
  posts: BlogPost[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const BlogFilters: React.FC<BlogFiltersProps> = ({
  filters,
  onFilterChange,
  categories,
  posts,
  searchQuery,
  onSearchChange,
}) => {
  const { t } = useTranslation(); // Hook initialized
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isAuthorsOpen, setIsAuthorsOpen] = useState(false);
  const tagsRef = useRef<HTMLDivElement>(null);
  const authorsRef = useRef<HTMLDivElement>(null);

  const allTags = extractAllTags(posts);
  const allAuthors = extractAllAuthors(posts);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tagsRef.current && !tagsRef.current.contains(event.target as Node)) {
        setIsTagsOpen(false);
      }
      if (authorsRef.current && !authorsRef.current.contains(event.target as Node)) {
        setIsAuthorsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryChange = (categorySlug: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === categorySlug ? undefined : categorySlug,
    });
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    onFilterChange({
      ...filters,
      tags: newTags.length > 0 ? newTags : undefined,
    });
  };

  const handleAuthorChange = (authorId: string) => {
    onFilterChange({
      ...filters,
      author: filters.author === authorId ? undefined : authorId,
    });
  };

  const handleFeaturedToggle = () => {
    onFilterChange({
      ...filters,
      featured: filters.featured === true ? undefined : true,
    });
  };

  const clearAllFilters = () => {
    onFilterChange({});
    onSearchChange('');
  };

  const hasActiveFilters = !!(
    filters.category || 
    filters.tags?.length || 
    filters.author || 
    filters.featured !== undefined ||
    searchQuery.trim()
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('blog.filters.searchPlaceholder')}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !filters.category
                ? 'bg-blue-700 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('blog.filters.allCategories')}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filters.category === category.slug
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={{
                backgroundColor: filters.category === category.slug ? category.color : undefined,
              }}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Additional Filters */}
      <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-gray-200">
        {/* Featured Toggle */}
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.featured === true}
            onChange={handleFeaturedToggle}
            className="rounded border-gray-300 text-blue-700 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">{t('blog.filters.featuredOnly')}</span>
        </label>

        {/* Tags Filter */}
        <div className="relative" ref={tagsRef}>
          <button
            onClick={() => setIsTagsOpen(!isTagsOpen)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t('blog.filters.tags')}
            {filters.tags && filters.tags.length > 0 && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                {filters.tags.length}
              </span>
            )}
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isTagsOpen && (
            <div className="absolute z-10 mt-1 w-64 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {allTags.map((tag) => (
                <label key={tag} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.tags?.includes(tag) || false}
                    onChange={() => handleTagToggle(tag)}
                    className="rounded border-gray-300 text-blue-700 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700">#{tag}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Authors Filter */}
        <div className="relative" ref={authorsRef}>
          <button
            onClick={() => setIsAuthorsOpen(!isAuthorsOpen)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t('blog.filters.authors')}
            {filters.author && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                1
              </span>
            )}
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isAuthorsOpen && (
            <div className="absolute z-10 mt-1 w-64 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {allAuthors.map((author) => (
                <button
                  key={author.id}
                  onClick={() => handleAuthorChange(author.id)}
                  className={`w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 ${
                    filters.author === author.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-6 h-6 rounded-full mr-3"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=3B82F6&color=fff&size=24`;
                    }}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{author.name}</div>
                    <div className="text-xs text-gray-500">{author.title}</div>
                  </div>
                  {author.verified && (
                    <svg className="w-4 h-4 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {t('blog.filters.clearAll')}
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {searchQuery && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
              {t('blog.filters.active.search')}: "{searchQuery}"
              <button
                onClick={() => onSearchChange('')}
                className="ml-2 text-blue-700 hover:text-blue-700"
              >
                ×
              </button>
            </span>
          )}
          {filters.category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
              {t('blog.filters.active.category')}: {categories.find(c => c.slug === filters.category)?.name}
              <button
                onClick={() => onFilterChange({ ...filters, category: undefined })}
                className="ml-2 text-blue-700 hover:text-blue-700"
              >
                ×
              </button>
            </span>
          )}
          {filters.tags?.map((tag) => (
            <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              #{tag}
              <button
                onClick={() => handleTagToggle(tag)}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          ))}
          {filters.author && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              {t('blog.filters.active.author')}: {allAuthors.find(a => a.id === filters.author)?.name}
              <button
                onClick={() => onFilterChange({ ...filters, author: undefined })}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.featured && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              {t('blog.filters.active.featured')}
              <button
                onClick={() => onFilterChange({ ...filters, featured: undefined })}
                className="ml-2 text-yellow-600 hover:text-yellow-800"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogFilters;