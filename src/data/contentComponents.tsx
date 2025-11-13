import React from 'react';

// Content components for rich formatting
export const Highlight: React.FC<{ children: React.ReactNode; color?: string }> = ({ 
  children, 
  color = 'yellow' 
}) => (
  <span className={`px-2 py-1 rounded-md font-medium ${
    color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
    color === 'blue' ? 'bg-blue-100 text-blue-700' :
    color === 'green' ? 'bg-green-100 text-green-800' :
    color === 'red' ? 'bg-red-100 text-red-800' :
    'bg-gray-100 text-gray-800'
  }`}>
    {children}
  </span>
);

export const CalloutBox: React.FC<{ 
  type?: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  children: React.ReactNode;
}> = ({ type = 'info', title, children }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  };

  const icons = {
    info: '💡',
    warning: '⚠️',
    success: '✅',
    error: '❌'
  };

  return (
    <div className={`p-6 rounded-lg border-l-4 my-6 ${styles[type]}`}>
      {title && (
        <div className="flex items-center mb-3">
          <span className="text-xl mr-2">{icons[type]}</span>
          <h4 className="font-semibold text-lg">{title}</h4>
        </div>
      )}
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};

export const CodeBlock: React.FC<{ 
  language?: string;
  children: React.ReactNode;
}> = ({ language, children }) => (
  <div className="my-6">
    {language && (
      <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono rounded-t-lg">
        {language}
      </div>
    )}
    <pre className={`bg-gray-900 text-gray-100 p-4 overflow-x-auto font-mono text-sm ${
      language ? 'rounded-b-lg' : 'rounded-lg'
    }`}>
      <code>{children}</code>
    </pre>
  </div>
);

export const StatsBox: React.FC<{
  stats: { label: string; value: string; color?: string }[];
}> = ({ stats }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
    {stats.map((stat, index) => (
      <div key={index} className="text-center">
        <div className={`text-2xl font-bold ${stat.color || 'text-blue-700'}`}>
          {stat.value}
        </div>
        <div className="text-sm text-gray-600">{stat.label}</div>
      </div>
    ))}
  </div>
);

export const QuoteBox: React.FC<{
  quote: string;
  author: string;
  role?: string;
}> = ({ quote, author, role }) => (
  <div className="my-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-l-4 border-blue-500 rounded-r-lg">
    <blockquote className="text-lg italic text-gray-700 mb-4">
      "{quote}"
    </blockquote>
    <div className="text-right">
      <cite className="font-semibold text-gray-900">— {author}</cite>
      {role && <div className="text-sm text-gray-600">{role}</div>}
    </div>
  </div>
);

export const ChecklistItem: React.FC<{ 
  checked?: boolean;
  children: React.ReactNode;
}> = ({ checked = true, children }) => (
  <div className="flex items-start space-x-3 mb-3">
    <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${
      checked ? 'bg-green-500' : 'bg-gray-300'
    }`}>
      {checked ? '✓' : '○'}
    </div>
    <div className="flex-1">{children}</div>
  </div>
);

export const ProgressBar: React.FC<{
  label: string;
  percentage: number;
  color?: string;
}> = ({ label, percentage, color = 'blue' }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1">
      <span className="font-medium text-gray-700">{label}</span>
      <span className="text-gray-500">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full bg-${color}-600`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

export const authors = {
  'mbafor-joshua': {
    id: 'mbafor-joshua',
    name: 'Mbafor Joshua',
    email: 'mbafor.joshua@quickcv.com',
    avatar: '/images/authors/mbafor-joshua.jpg',
    bio: 'Senior Product Manager and Career Coach with 8+ years of experience helping professionals land their dream jobs. Passionate about modern recruitment trends and CV optimization.',
    title: 'Senior Product Manager & Career Coach',
    social: {
      linkedin: 'https://linkedin.com/in/mbafor-joshua',
      twitter: 'https://twitter.com/mbaforjoshua',
      website: 'https://mbaforjoshua.com'
    },
    verified: true
  },
  'sarah-chen': {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    email: 'sarah.chen@quickcv.com',
    avatar: '/images/authors/sarah-chen.jpg',
    bio: 'HR Director at Fortune 500 companies with expertise in talent acquisition and modern recruitment strategies. Helps job seekers understand what recruiters really want.',
    title: 'HR Director & Recruitment Expert',
    social: {
      linkedin: 'https://linkedin.com/in/sarah-chen-hr'
    },
    verified: true
  }
};

export const categories = {
  'cv-tips': {
    id: 'cv-tips',
    name: 'CV Tips',
    slug: 'cv-tips',
    description: 'Expert advice on creating standout CVs that get noticed by recruiters',
    color: '#3B82F6',
  },
  'career-advice': {
    id: 'career-advice',
    name: 'Career Advice',
    slug: 'career-advice',
    description: 'Professional guidance for advancing your career and landing your dream job',
    color: '#10B981',

  },
  'industry-insights': {
    id: 'industry-insights',
    name: 'Industry Insights',
    slug: 'industry-insights',
    description: 'Latest trends and insights from the recruitment and hiring industry',
    color: '#8B5CF6',
  },
  'templates': {
    id: 'templates',
    name: 'Templates',
    slug: 'templates',
    description: 'Modern CV templates and design inspiration for different industries',
    color: '#F59E0B',
  }
};