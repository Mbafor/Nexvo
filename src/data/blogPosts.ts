// src/data/resourcesData.ts
import { BlogPost, Author, Category } from '../types/blog';

// Authors data
export const authors: Author[] = [
  {
    id: "mbafor-joshua",
    name: "Mbafor Joshua",
    email: "mbafor.joshua@quickcv.com",
    avatar: "/images/authors/mbafor-joshua.jpg",
    // We put keys here. If your Type definition requires a string, this satisfies it.
    bio: "resources.authors.mbafor-joshua.bio", 
    title: "resources.authors.mbafor-joshua.title",
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
    bio: "resources.authors.sarah-chen.bio",
    title: "resources.authors.sarah-chen.title",
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
    name: "resources.categories.cv-tips.name", // Translation Key
    slug: "cv-tips",
    description: "resources.categories.cv-tips.description", // Translation Key
    color: "#3B82F6",
  },
  {
    id: "career-advice",
    name: "resources.categories.career-advice.name",
    slug: "career-advice", 
    description: "resources.categories.career-advice.description",
    color: "#10B981",
  },
  {
    id: "industry-insights",
    name: "resources.categories.industry-insights.name",
    slug: "industry-insights",
    description: "resources.categories.industry-insights.description",
    color: "#8B5CF6",
  },
  {
    id: "templates",
    name: "resources.categories.templates.name",
    slug: "templates",
    description: "resources.categories.templates.description",
    color: "#F59E0B",
  }
];

// Blog posts data (simplified version)
export const blogPosts: BlogPost[] = [
  {
    id: 'ats-optimized-cv-guide-2025',
    slug: 'ats-optimized-cv-guide-2025',
    title: 'The Complete Guide to ATS-Optimized CVs in 2025',
    subtitle: 'Master the art of beating Applicant Tracking Systems and getting your CV in front of human recruiters',
    excerpt: 'Learn how to create ATS-friendly CVs that pass automated screening systems while maintaining visual appeal and readability for human recruiters.',
    date: '2025-01-15',
    readTime: 12,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=600&fit=crop',
      alt: 'Modern professional reviewing an ATS-optimized CV on a computer screen',
      caption: 'Understanding ATS systems is crucial for modern job seekers'
    },
    author: {
      id: "mbafor-joshua",
      name: "Mbafor Joshua",
      email: "mbafor.joshua@quickcv.com",
      avatar: "/images/authors/mbafor-joshua.jpg",
      bio: "Senior Product Manager and Career Coach with 8+ years of experience helping professionals land their dream jobs.",
      title: "Senior Product Manager & Career Coach",
      social: {
        linkedin: "https://linkedin.com/in/mbafor-joshua",
        twitter: "https://twitter.com/mbaforjoshua",
        website: "https://mbaforjoshua.com"
      },
      verified: true
    },
    category: {
      id: "cv-tips",
      name: "CV Tips",
      slug: "cv-tips",
      description: "Expert advice on creating standout CVs that get noticed by recruiters",
      color: "#3B82F6",
      icon: "💡"
    },
    tags: ['ATS', 'CV Optimization', 'Job Search', 'Recruitment', '2025 Trends'],
    status: 'published',
    featured: true,
    content: {
      intro: 'In 2025, over 98% of Fortune 500 companies use Applicant Tracking Systems (ATS) to filter CVs before they reach human recruiters.',
      body: '<p>This is the main content of the blog post...</p>',
      conclusion: 'Mastering ATS optimization is no longer optional in today\'s competitive job market.',
      tableOfContents: [
        { id: 'understanding-ats', title: 'Understanding How ATS Systems Work', level: 2 },
        { id: 'common-ats-mistakes', title: 'Common ATS Mistakes That Kill Your Chances', level: 2 }
      ]
    },
    metadata: {
      seoTitle: 'Complete ATS-Optimized CV Guide 2025 | Beat Applicant Tracking Systems',
      seoDescription: 'Master ATS optimization with our comprehensive 2025 guide.',
      keywords: ['ATS optimization', 'CV optimization', 'applicant tracking system'],
      socialImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=630&fit=crop',
      readingTime: 15,
      publishedAt: '2025-01-15T10:00:00Z',
      updatedAt: '2025-01-20T14:30:00Z'
    },
    engagement: {
      views: 25420,
      likes: 1250,
      shares: 567,
      comments: 89,
      bookmarks: 445
    }
  },
  {
    id: 'modern-cv-templates-2025',
    slug: 'modern-cv-templates-2025',
    title: 'Top 10 Modern CV Templates That Get Interviews in 2025',
    subtitle: 'Discover the latest design trends and professional templates that recruiters love',
    excerpt: 'Explore the most effective CV templates for 2025, featuring modern designs that balance creativity with ATS compatibility.',
    date: '2025-01-10',
    readTime: 8,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1586953228114-93c6b270b8d5?w=1200&h=600&fit=crop',
      alt: 'Collection of modern CV template designs on a desk',
      caption: 'Modern CV templates that stand out from the crowd'
    },
    author: {
      id: "sarah-chen",
      name: "Sarah Chen",
      email: "sarah.chen@quickcv.com",
      avatar: "/images/authors/sarah-chen.jpg",
      bio: "HR Director at Fortune 500 companies with expertise in talent acquisition and modern recruitment strategies.",
      title: "HR Director & Recruitment Expert",
      social: {
        linkedin: "https://linkedin.com/in/sarah-chen-hr"
      },
      verified: true
    },
    category: {
      id: "templates",
      name: "Templates",
      slug: "templates",
      description: "Modern CV templates and design inspiration for different industries",
      color: "#F59E0B",
      icon: "🎨"
    },
    tags: ['CV Templates', 'Design', 'Modern CVs', 'Professional Templates', '2025 Trends'],
    status: 'published',
    featured: true,
    content: {
      intro: 'The right CV template can make the difference between getting noticed and getting overlooked in today\'s competitive job market.',
      body: '<p>Here we explore the top template trends for 2025...</p>',
      conclusion: 'Choose a template that reflects your industry and personality while maintaining professional standards.',
      tableOfContents: [
        { id: 'template-trends', title: '2025 CV Template Trends', level: 2 },
        { id: 'industry-specific', title: 'Industry-Specific Template Recommendations', level: 2 }
      ]
    },
    metadata: {
      seoTitle: 'Best Modern CV Templates 2025 | Professional Resume Designs',
      seoDescription: 'Discover the top CV templates for 2025 that help you stand out and get interviews.',
      keywords: ['CV templates', 'resume templates', 'modern CV design', 'professional templates'],
      socialImage: 'https://images.unsplash.com/photo-1586953228114-93c6b270b8d5?w=1200&h=630&fit=crop',
      readingTime: 8,
      publishedAt: '2025-01-10T09:00:00Z',
      updatedAt: '2025-01-10T09:00:00Z'
    },
    engagement: {
      views: 18750,
      likes: 892,
      shares: 423,
      comments: 67,
      bookmarks: 334
    }
  },
  {
    id: 'remote-work-cv-optimization',
    slug: 'remote-work-cv-optimization',
    title: 'How to Optimize Your CV for Remote Work Opportunities',
    subtitle: 'Stand out in the remote job market with targeted CV strategies',
    excerpt: 'Learn how to tailor your CV specifically for remote positions, highlighting relevant skills and experience that remote employers value most.',
    date: '2025-01-05',
    readTime: 10,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=600&fit=crop',
      alt: 'Professional working remotely with laptop and documents',
      caption: 'Remote work requires specific CV optimization strategies'
    },
    author: {
      id: "mbafor-joshua",
      name: "Mbafor Joshua",
      email: "mbafor.joshua@quickcv.com",
      avatar: "/images/authors/mbafor-joshua.jpg",
      bio: "Senior Product Manager and Career Coach with 8+ years of experience helping professionals land their dream jobs.",
      title: "Senior Product Manager & Career Coach",
      social: {
        linkedin: "https://linkedin.com/in/mbafor-joshua",
        twitter: "https://twitter.com/mbaforjoshua",
        website: "https://mbaforjoshua.com"
      },
      verified: true
    },
    category: {
      id: "career-advice",
      name: "Career Advice",
      slug: "career-advice",
      description: "Professional guidance for advancing your career and landing your dream job",
      color: "#10B981",
      icon: "💼"
    },
    tags: ['Remote Work', 'CV Optimization', 'Digital Nomad', 'Work From Home', 'Career Advice'],
    status: 'published',
    featured: false,
    content: {
      intro: 'Remote work has fundamentally changed how employers evaluate candidates, requiring new CV strategies.',
      body: '<p>Remote work optimization strategies and key skills to highlight...</p>',
      conclusion: 'Positioning yourself as a remote-ready candidate can open doors to global opportunities.',
      tableOfContents: [
        { id: 'remote-skills', title: 'Essential Remote Work Skills to Highlight', level: 2 },
        { id: 'formatting-tips', title: 'CV Formatting for Remote Applications', level: 2 }
      ]
    },
    metadata: {
      seoTitle: 'Remote Work CV Optimization Guide | Get Hired for Remote Jobs',
      seoDescription: 'Learn how to optimize your CV for remote work opportunities with expert tips and strategies.',
      keywords: ['remote work CV', 'work from home jobs', 'remote job applications', 'digital nomad CV'],
      socialImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=630&fit=crop',
      readingTime: 10,
      publishedAt: '2025-01-05T11:00:00Z',
      updatedAt: '2025-01-05T11:00:00Z'
    },
    engagement: {
      views: 14230,
      likes: 678,
      shares: 234,
      comments: 45,
      bookmarks: 289
    }
  }
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