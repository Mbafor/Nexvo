// src/data/blogPosts.ts
import { BlogPost, Author, Category } from '../types/blog';
import { atsOptimizedCvGuide } from './posts/atsOptimizedCvGuide';
import { modernCvTemplates2025 } from './posts/modernCvTemplates2025';
import { remoteWorkCvOptimization } from './posts/remoteWorkCvOptimization';

// Authors data
export const authors: Author[] = [
  {
    id: "mbafor-joshua",
    name: "Mbafor Joshua",
    email: "mbafor.joshua@quickcv.com",
    avatar: "/images/authors/mbafor-joshua.jpg",
    bio: "Senior Product Manager and Career Coach with 8+ years of experience helping professionals land their dream jobs. Passionate about modern recruitment trends and CV optimization.",
    title: "Senior Product Manager & Career Coach",
    social: {
      linkedin: "https://linkedin.com/in/mbafor-joshua",
      twitter: "https://twitter.com/mbaforjoshua",
      website: "https://mbaforjoshua.com"
    },
    verified: true
  },
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    email: "sarah.chen@quickcv.com",
    avatar: "/images/authors/sarah-chen.jpg",
    bio: "HR Director at Fortune 500 companies with expertise in talent acquisition and modern recruitment strategies. Helps job seekers understand what recruiters really want.",
    title: "HR Director & Recruitment Expert",
    social: {
      linkedin: "https://linkedin.com/in/sarah-chen-hr"
    },
    verified: true
  }
];

// Categories data
export const categories: Category[] = [
  {
    id: "cv-tips",
    name: "CV Tips",
    slug: "cv-tips",
    description: "Expert advice on creating standout CVs that get noticed by recruiters",
    color: "#3B82F6",
    icon: "📝"
  },
  {
    id: "career-advice",
    name: "Career Advice",
    slug: "career-advice", 
    description: "Professional guidance for advancing your career and landing your dream job",
    color: "#10B981",
    icon: "🚀"
  },
  {
    id: "industry-insights",
    name: "Industry Insights",
    slug: "industry-insights",
    description: "Latest trends and insights from the recruitment and hiring industry",
    color: "#8B5CF6",
    icon: "💡"
  },
  {
    id: "templates",
    name: "Templates",
    slug: "templates",
    description: "Modern CV templates and design inspiration for different industries",
    color: "#F59E0B",
    icon: "🎨"
  }
];

// Blog posts data (imported from individual files)
export const blogPosts: BlogPost[] = [
  atsOptimizedCvGuide,
  modernCvTemplates2025,
  remoteWorkCvOptimization
];

// Helper functions
export const getAuthorById = (id: string): Author | undefined => {
  return authors.find(author => author.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured && post.status === 'published');
};

export const getPostsByCategory = (categorySlug: string): BlogPost[] => {
  return blogPosts.filter(post => 
    post.category.slug === categorySlug && post.status === 'published'
  );
};

export const getLatestPosts = (limit: number = 6): BlogPost[] => {
  return blogPosts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .slice(0, limit);
};

// Export all data
export const resourcesData = {
  authors,
  categories,
  posts: blogPosts
};