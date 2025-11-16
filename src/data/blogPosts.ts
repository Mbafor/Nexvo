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
    // UPDATED: Namespace changed to 'resources.'
    bio: "resources.authors.mbafor_joshua.bio",
    title: "resources.authors.mbafor_joshua.title",
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
    // UPDATED: Namespace changed to 'resources.'
    bio: "resources.authors.sarah_chen.bio",
    title: "resources.authors.sarah_chen.title",
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
    // UPDATED: Namespace changed to 'resources.'
    name: "resources.categories.cv_tips.name",
    slug: "cv-tips",
    description: "resources.categories.cv_tips.description",
    color: "#3B82F6",
    icon: "📝"
  },
  {
    id: "career-advice",
    name: "resources.categories.career_advice.name",
    slug: "career-advice", 
    description: "resources.categories.career_advice.description",
    color: "#10B981",
    icon: "🚀"
  },
  {
    id: "industry-insights",
    name: "resources.categories.industry_insights.name",
    slug: "industry-insights",
    description: "resources.categories.industry_insights.description",
    color: "#8B5CF6",
    icon: "💡"
  },
  {
    id: "templates",
    name: "resources.categories.templates.name",
    slug: "templates",
    description: "resources.categories.templates.description",
    color: "#F59E0B",
    icon: "🎨"
  }
];

// Blog posts data
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