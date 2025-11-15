import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import BlogCard from "../components/BlogCard";
import BlogLayout from "../components/layout/BlogLayout";
import BlogFilters from "../components/common/BlogFilters";
import Pagination from "../components/common/Pagination";
import { BlogFilter } from "../types/blog";
import { filterAndSearchPosts } from "../utils/blogUtils";
import { blogPosts } from '../data/blogPosts';

const BlogList: React.FC = () => {
  const { t } = useTranslation(); // Hook initialized
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<BlogFilter>({});
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Get data from TypeScript module
  const allPosts = blogPosts;
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  // Filter and paginate posts
  const searchResults = useMemo(() => {
    return filterAndSearchPosts(allPosts, searchQuery, filters, currentPage, postsPerPage);
  }, [allPosts, searchQuery, filters, currentPage]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get featured posts for hero section
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 2);
  const hasResults = searchResults.posts.length > 0;
  const isFiltered = !!(searchQuery.trim() || filters.category || filters.tags?.length || filters.author || filters.featured);

  return (
    <BlogLayout 
      title={t('blogList.meta.title')}
      description={t('blogList.meta.description')}
    >
      {/* Hero Section with Featured Posts */}
      {!isFiltered && featuredPosts.length > 0 && (
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-medium text-gray-900 mb-6">
                {t('blogList.hero.titleStart')} <span className="text-blue-700">{t('blogList.hero.titleHighlight')}</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t('blogList.hero.subtitle')}
              </p>
            </div>

            {/* Featured Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {featuredPosts.map((post: any) => (
                <div key={post.id} className="transform hover:scale-[1.02] transition-transform duration-300">
                  <BlogCard 
                    post={post} 
                    onClick={handlePostClick} 
                    featured={true}
                  />
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-medium text-blue-700">{allPosts.length}+</div>
                <div className="text-gray-600">{t('blogList.stats.articles')}</div>
              </div>
              <div>
                <div className="text-3xl font-medium text-green-600">50K+</div>
                <div className="text-gray-600">{t('blogList.stats.readers')}</div>
              </div>
              <div>
                <div className="text-3xl font-medium text-purple-600">95%</div>
                <div className="text-gray-600">{t('blogList.stats.successRate')}</div>
              </div>
              <div>
                <div className="text-3xl font-medium text-orange-600">24/7</div>
                <div className="text-gray-600">{t('blogList.stats.support')}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title for Filtered Views */}
          {isFiltered && (
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
                {searchQuery 
                  ? t('blogList.results.searchTitle', { query: searchQuery }) 
                  : t('blogList.results.filteredTitle')
                }
              </h1>
              <p className="text-lg text-gray-600">
                {t('blogList.results.count', { count: searchResults.totalCount })}
              </p>
            </div>
          )}

          {/* Filters */}
          <BlogFilters
            filters={filters}
            onFilterChange={setFilters}
            categories={categories}
            posts={allPosts}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Results Section */}
          {hasResults ? (
            <>
              {/* Results Info */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-medium text-gray-900">
                    {isFiltered ? t('blogList.results.searchResults') : t('blogList.results.latestArticles')}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {t('blogList.results.count', { count: searchResults.totalCount })} 
                    {searchResults.totalPages > 1 && (
                      <span className="ml-1">
                        • {t('blogList.results.pageInfo', { current: currentPage, total: searchResults.totalPages })}
                      </span>
                    )}
                  </p>
                </div>

                {/* Sort Options (for future enhancement) */}
                <div className="hidden md:flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{t('blogList.sort.label')}:</span>
                  <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="date">{t('blogList.sort.latest')}</option>
                    <option value="popular">{t('blogList.sort.popular')}</option>
                    <option value="views">{t('blogList.sort.views')}</option>
                  </select>
                </div>
              </div>

              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {searchResults.posts.map((post: any) => (
                  <BlogCard 
                    key={post.id} 
                    post={post} 
                    onClick={handlePostClick}
                  />
                ))}
              </div>

              {/* Pagination */}
              {searchResults.totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={searchResults.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            /* No Results */
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('blogList.empty.title')}</h3>
                <p className="text-gray-600 mb-6">
                  {isFiltered 
                    ? t('blogList.empty.filteredMessage')
                    : t('blogList.empty.defaultMessage')
                  }
                </p>
                {isFiltered && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({});
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {t('blogList.empty.clearFilters')}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className=" bg-blue-700 rounded-2xl p-8 text-center text-white mt-16">
            <h3 className="text-2xl font-medium mb-4">{t('blogList.newsletter.title')}</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              {t('blogList.newsletter.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('blogList.newsletter.placeholder')}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
                {t('blogList.newsletter.button')}
              </button>
            </div>
            <p className="text-xs text-blue-200 mt-3">
              {t('blogList.newsletter.disclaimer')}
            </p>
          </div>
        </div>
      </section>
    </BlogLayout>
  );
};

export default BlogList;