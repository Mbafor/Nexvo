import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogLayout from "../components/layout/BlogLayout";
import BlogCard from "../components/BlogCard";
import { 
  formatDate, 
  getReadTimeText, 
  formatEngagementNumber,
  getRelatedPosts,
  createSocialShareUrl,
  generateMetaDescription 
} from "../utils/blogUtils";
import { getBlogPostBySlug, blogData } from "../data/blogPosts";

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Get post data
  const post = slug ? getBlogPostBySlug(slug) : null;
  const relatedPosts = post ? getRelatedPosts(post, blogData.posts, 3) : [];

  // Reading progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const element = contentRef.current;
      const windowHeight = window.innerHeight;
      const documentHeight = element.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const pctScrolled = Math.floor((scrollTop / trackLength) * 100);
      
      setReadingProgress(Math.min(100, Math.max(0, pctScrolled)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Table of contents active section tracking
  useEffect(() => {
    if (!post?.content.tableOfContents) return;

    const handleScroll = () => {
      const sections = post.content.tableOfContents!.map(item => 
        document.getElementById(item.id)
      ).filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.getBoundingClientRect().top <= 100) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  // Handle missing blog gracefully
  if (!post) {
    return (
      <BlogLayout title="Post Not Found - QuickCV Blog">
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="mb-8">
              <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">
              The article you're looking for doesn't exist or may have been moved.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/blogs")}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Browse All Articles
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      </BlogLayout>
    );
  }

  const baseUrl = window.location.origin;
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin' | 'copy') => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(postUrl);
      // You could add a toast notification here
      setShowShareMenu(false);
      return;
    }

    const shareUrl = createSocialShareUrl(platform, post, baseUrl);
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <BlogLayout 
      title={`${post.metadata.seoTitle} - QuickCV Blog`}
      description={generateMetaDescription(post)}
    >
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Article Hero */}
      <article className="bg-white">
        <div className="relative">
          {/* Hero Image */}
          <div className="relative h-96 lg:h-[500px] overflow-hidden">
            <img
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Hero Content */}
            <div className="absolute inset-0 flex items-end">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-white">
                {/* Category Badge */}
                <div className="mb-4">
                  <span 
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                    style={{ backgroundColor: post.category.color }}
                  >
                    {post.category.icon} {post.category.name}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {post.title}
                </h1>

                {/* Subtitle */}
                {post.subtitle && (
                  <p className="text-xl md:text-2xl text-gray-200 mb-6 max-w-3xl">
                    {post.subtitle}
                  </p>
                )}

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full border-2 border-white"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=3B82F6&color=fff&size=48`;
                      }}
                    />
                    <div>
                      <div className="font-semibold">{post.author.name}</div>
                      <div className="text-gray-300">{post.author.title}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-300">
                    <span>{formatDate(post.metadata.publishedAt, 'long')}</span>
                    <span>•</span>
                    <span>{getReadTimeText(post.metadata.readingTime)}</span>
                    <span>•</span>
                    <span>{formatEngagementNumber(post.engagement.views)} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/blogs")}
                  className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  All Articles
                </button>
              </div>

              <div className="flex items-center space-x-3">
                {/* Like Button */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isLiked 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <svg className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm font-medium">
                    {formatEngagementNumber(post.engagement.likes + (isLiked ? 1 : 0))}
                  </span>
                </button>

                {/* Bookmark Button */}
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked 
                      ? 'bg-yellow-100 text-yellow-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <svg className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>

                {/* Share Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>

                  {showShareMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg className="w-4 h-4 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                        Share on Twitter
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        Share on LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg className="w-4 h-4 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Share on Facebook
                      </button>
                      <hr className="my-2" />
                      <button
                        onClick={() => handleShare('copy')}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy Link
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Table of Contents - Desktop */}
            {post.content.tableOfContents && post.content.tableOfContents.length > 0 && (
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="sticky top-32">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h3>
                    <nav className="space-y-2">
                      {post.content.tableOfContents.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`block w-full text-left text-sm py-2 px-3 rounded transition-colors ${
                            activeSection === item.id
                              ? 'bg-blue-100 text-blue-700 font-medium'
                              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                          }`}
                          style={{ paddingLeft: `${(item.level - 2) * 12 + 12}px` }}
                        >
                          {item.title}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className={`${post.content.tableOfContents ? 'lg:col-span-3' : 'lg:col-span-4'} order-1 lg:order-2`}>
              <div ref={contentRef} className="prose prose-lg max-w-none">
                {/* Introduction */}
                <div className="text-xl text-gray-700 leading-relaxed mb-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  {post.content.intro}
                </div>

                {/* Main Content */}
                <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:my-6 prose-li:my-2 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm">
                  {typeof post.content.body === 'string' ? (
                    <div dangerouslySetInnerHTML={{ __html: post.content.body }} />
                  ) : (
                    post.content.body
                  )}
                </div>

                {/* Conclusion */}
                {post.content.conclusion && (
                  <div className="mt-12 p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Takeaways</h3>
                    <div className="text-gray-700 leading-relaxed">
                      {post.content.conclusion}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author Bio */}
                <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-16 h-16 rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=3B82F6&color=fff&size=64`;
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-lg font-semibold text-gray-900">{post.author.name}</h4>
                        {post.author.verified && (
                          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{post.author.title}</p>
                      <p className="text-gray-700 mb-4">{post.author.bio}</p>
                      <div className="flex space-x-3">
                        {post.author.social.linkedin && (
                          <a
                            href={post.author.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                        {post.author.social.twitter && (
                          <a
                            href={post.author.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-600"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                          </a>
                        )}
                        {post.author.social.website && (
                          <a
                            href={post.author.social.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard 
                    key={relatedPost.id} 
                    post={relatedPost} 
                    onClick={(slug) => navigate(`/blog/${slug}`)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Get More Career Insights</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join 10,000+ professionals receiving weekly tips on CV optimization, career growth, and job search strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </article>
    </BlogLayout>
  );
};

export default BlogPost;
