import { BlogPost, BlogFilter, BlogSearchResult } from '../types/blog';

/**
 * Calculate estimated reading time based on word count
 * Average reading speed: 200-250 words per minute
 */
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 225;
  const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

/**
 * Format date for display in various formats
 */
export const formatDate = (
  dateString: string,
  format: 'short' | 'long' | 'relative' = 'long'
): string => {
  const date = new Date(dateString);
  const now = new Date();

  switch (format) {
    case 'short':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

    case 'relative':
      const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffInDays === 0) return 'Today';
      if (diffInDays === 1) return 'Yesterday';
      if (diffInDays < 7) return `${diffInDays} days ago`;
      if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
      if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
      return `${Math.floor(diffInDays / 365)} years ago`;

    case 'long':
    default:
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
  }
};

/**
 * Generate excerpt from blog content
 */
export const generateExcerpt = (content: string, maxLength: number = 150): string => {
  const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Create SEO-friendly slug from title
 */
export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

/**
 * Filter and search blog posts
 */
export const filterAndSearchPosts = (
  posts: BlogPost[],
  searchQuery: string = '',
  filters: BlogFilter = {},
  page: number = 1,
  postsPerPage: number = 9
): BlogSearchResult => {
  let filteredPosts = [...posts];

  // Apply text search
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.subtitle?.toLowerCase().includes(query) ||
      post.content.intro.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query)) ||
      post.author.name.toLowerCase().includes(query)
    );
  }

  // Apply category filter
  if (filters.category) {
    filteredPosts = filteredPosts.filter(post => 
      post.category.slug === filters.category
    );
  }

  // Apply tags filter
  if (filters.tags && filters.tags.length > 0) {
    filteredPosts = filteredPosts.filter(post =>
      filters.tags!.some(tag => post.tags.includes(tag))
    );
  }

  // Apply author filter
  if (filters.author) {
    filteredPosts = filteredPosts.filter(post => 
      post.author.id === filters.author
    );
  }

  // Apply date range filter
  if (filters.dateRange) {
    filteredPosts = filteredPosts.filter(post => {
      const postDate = new Date(post.metadata.publishedAt);
      return postDate >= filters.dateRange!.start && postDate <= filters.dateRange!.end;
    });
  }

  // Apply featured filter
  if (filters.featured !== undefined) {
    filteredPosts = filteredPosts.filter(post => post.featured === filters.featured);
  }

  // Sort by published date (most recent first)
  filteredPosts.sort((a, b) => 
    new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );

  // Calculate pagination
  const totalCount = filteredPosts.length;
  const totalPages = Math.ceil(totalCount / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    totalCount,
    currentPage: page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};

/**
 * Get related posts based on tags and category
 */
export const getRelatedPosts = (
  currentPost: BlogPost,
  allPosts: BlogPost[],
  limit: number = 3
): BlogPost[] => {
  const otherPosts = allPosts.filter(post => post.id !== currentPost.id);
  
  // Score posts based on shared tags and category
  const scoredPosts = otherPosts.map(post => {
    let score = 0;
    
    // Same category gets higher score
    if (post.category.id === currentPost.category.id) {
      score += 3;
    }
    
    // Shared tags get points
    const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
    score += sharedTags.length;
    
    // Same author gets a small boost
    if (post.author.id === currentPost.author.id) {
      score += 1;
    }
    
    return { post, score };
  });
  
  // Sort by score and return top posts
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
};

/**
 * Format engagement numbers (views, likes, etc.)
 */
export const formatEngagementNumber = (num: number): string => {
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
  return (num / 1000000).toFixed(1) + 'M';
};

/**
 * Get estimated read time in human readable format
 */
export const getReadTimeText = (minutes: number): string => {
  if (minutes < 1) return 'Less than 1 min read';
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
};

/**
 * Extract unique tags from all posts
 */
export const extractAllTags = (posts: BlogPost[]): string[] => {
  const tagSet = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};

/**
 * Extract unique authors from all posts
 */
export const extractAllAuthors = (posts: BlogPost[]) => {
  const authorMap = new Map();
  posts.forEach(post => {
    if (!authorMap.has(post.author.id)) {
      authorMap.set(post.author.id, post.author);
    }
  });
  return Array.from(authorMap.values());
};

/**
 * Generate meta description for SEO
 */
export const generateMetaDescription = (post: BlogPost): string => {
  return post.metadata.seoDescription || generateExcerpt(post.content.intro, 160);
};

/**
 * Create social sharing URL
 */
export const createSocialShareUrl = (
  platform: 'twitter' | 'facebook' | 'linkedin',
  post: BlogPost,
  baseUrl: string
): string => {
  const url = `${baseUrl}/blog/${post.slug}`;
  const title = post.title;
  const description = generateMetaDescription(post);

  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&via=QuickCV`;
    
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`;
    
    default:
      return url;
  }
};