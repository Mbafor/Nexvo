import React from 'react';

export interface Author {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  title: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  verified: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon?: string;
}

export interface BlogMetadata {
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  canonicalUrl?: string;
  socialImage: string;
  readingTime: number; // in minutes
  publishedAt: string;
  updatedAt?: string;
}

export interface BlogContent {
  intro: string;
  body: string | React.ReactElement;
  conclusion?: string;
  tableOfContents?: TableOfContentsItem[];
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number; // 1-6 for h1-h6
}

export interface BlogEngagement {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  bookmarks: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string; // Added missing property
  date: string; // Added missing property
  readTime: number; // Added missing property (in minutes)
  featuredImage: {
    url: string;
    alt: string;
    caption?: string;
    photographer?: {
      name: string;
      url?: string;
    };
  };
  author: Author;
  category: Category;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  content: BlogContent;
  metadata: BlogMetadata;
  engagement: BlogEngagement;
}

export interface BlogFilter {
  category?: string;
  tags?: string[];
  author?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  featured?: boolean;
}

export interface BlogSearchResult {
  posts: BlogPost[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  featuredImage: {
    url: string;
    alt: string;
  };
  readingTime: number;
  publishedAt: string;
}