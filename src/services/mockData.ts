import { Article, ArticleForEditor, MultipleArticles } from '../types/article';
import { Comment } from '../types/comment';
import { Profile } from '../types/profile';
import { User, UserForRegistration, UserSettings } from '../types/user';

// Моковые данные для пользователей
export const mockUsers: User[] = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    token: 'mock_token_123',
    bio: 'Любитель программирования и кофе',
    image: 'https://api.realworld.io/images/smiley-cyrus.jpg'
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    token: 'mock_token_456',
    bio: 'Фронтенд разработчик',
    image: 'https://api.realworld.io/images/smiley-cyrus.jpg'
  }
];

// Моковые профили
export const mockProfiles: Profile[] = [
  {
    username: 'john_doe',
    bio: 'Любитель программирования и кофе',
    image: 'https://api.realworld.io/images/smiley-cyrus.jpg',
    following: false
  },
  {
    username: 'jane_smith',
    bio: 'Фронтенд разработчик',
    image: 'https://api.realworld.io/images/smiley-cyrus.jpg',
    following: true
  }
];

// Моковые статьи
export const mockArticles: Article[] = [
  {
    slug: 'how-to-learn-react',
    title: 'Как изучить React',
    description: 'Полное руководство по изучению React с нуля',
    body: 'React - это мощная библиотека для создания пользовательских интерфейсов...',
    tagList: ['react', 'javascript', 'frontend'],
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    favorited: false,
    favoritesCount: 42,
    author: mockProfiles[0]
  },
  {
    slug: 'typescript-best-practices',
    title: 'Лучшие практики TypeScript',
    description: 'Советы и рекомендации по написанию качественного TypeScript кода',
    body: 'TypeScript предоставляет множество возможностей для улучшения качества кода...',
    tagList: ['typescript', 'javascript', 'programming'],
    createdAt: new Date('2024-01-14T15:30:00Z'),
    updatedAt: new Date('2024-01-14T15:30:00Z'),
    favorited: true,
    favoritesCount: 28,
    author: mockProfiles[1]
  },
  {
    slug: 'nodejs-performance',
    title: 'Оптимизация производительности Node.js',
    description: 'Как улучшить производительность ваших Node.js приложений',
    body: 'Node.js может быть очень быстрым, если правильно его настроить...',
    tagList: ['nodejs', 'performance', 'backend'],
    createdAt: new Date('2024-01-13T09:15:00Z'),
    updatedAt: new Date('2024-01-13T09:15:00Z'),
    favorited: false,
    favoritesCount: 15,
    author: mockProfiles[0]
  }
];

// Моковые комментарии
export const mockComments: Comment[] = [
  {
    id: 1,
    createdAt: new Date('2024-01-15T11:00:00Z'),
    updatedAt: new Date('2024-01-15T11:00:00Z'),
    body: 'Отличная статья! Очень полезная информация.',
    author: mockProfiles[1]
  },
  {
    id: 2,
    createdAt: new Date('2024-01-15T12:30:00Z'),
    updatedAt: new Date('2024-01-15T12:30:00Z'),
    body: 'Спасибо за подробное объяснение. Буду применять на практике.',
    author: mockProfiles[0]
  }
];

// Моковые теги
export const mockTags: string[] = [
  'react',
  'javascript',
  'typescript',
  'nodejs',
  'frontend',
  'backend',
  'programming',
  'performance',
  'web-development',
  'tutorial'
];

// Моковые данные для множественных статей
export const mockMultipleArticles: MultipleArticles = {
  articles: mockArticles,
  articlesCount: mockArticles.length
};

// Моковые данные для фида
export const mockFeedArticles: MultipleArticles = {
  articles: mockArticles.slice(0, 2), // Первые две статьи в фиде
  articlesCount: 2
};

// Функция для имитации задержки API
export const delay = (ms = 500): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// Функция для имитации случайных ошибок
export const shouldSimulateError = (errorRate = 0.1): boolean => 
  Math.random() < errorRate;

// Моковые ошибки
export const mockErrors = {
  login: {
    'email': ['не может быть пустым'],
    'password': ['не может быть пустым']
  },
  registration: {
    'username': ['уже занят'],
    'email': ['уже используется']
  },
  article: {
    'title': ['не может быть пустым'],
    'body': ['слишком короткий']
  },
  settings: {
    'email': ['неверный формат']
  }
};
