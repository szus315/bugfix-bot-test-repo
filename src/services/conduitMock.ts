import { Err, Ok, Result } from '@hqoss/monads';
import {
  Article,
  ArticleForEditor,
  ArticlesFilters,
  FeedFilters,
  MultipleArticles,
} from '../types/article';
import { Comment } from '../types/comment';
import { GenericErrors } from '../types/error';
import { Profile } from '../types/profile';
import { User, UserForRegistration, UserSettings } from '../types/user';
import {
  delay,
  mockArticles,
  mockComments,
  mockErrors,
  mockFeedArticles,
  mockMultipleArticles,
  mockProfiles,
  mockTags,
  mockUsers,
  shouldSimulateError,
} from './mockData';

// Моковые функции для всех API вызовов

export async function getArticles(filters: ArticlesFilters = {}): Promise<MultipleArticles> {
  await delay(300);
  
  let filteredArticles = [...mockArticles];
  
  // Применяем фильтры
  if (filters.tag) {
    filteredArticles = filteredArticles.filter(article => 
      article.tagList.includes(filters.tag!)
    );
  }
  
  if (filters.author) {
    filteredArticles = filteredArticles.filter(article => 
      article.author.username === filters.author
    );
  }
  
  if (filters.favorited) {
    filteredArticles = filteredArticles.filter(article => 
      article.favorited
    );
  }
  
  // Применяем пагинацию
  const limit = filters.limit || 10;
  const offset = filters.offset || 0;
  const paginatedArticles = filteredArticles.slice(offset, offset + limit);
  
  return {
    articles: paginatedArticles,
    articlesCount: filteredArticles.length
  };
}

export async function getTags(): Promise<{ tags: string[] }> {
  await delay(200);
  return { tags: mockTags };
}

export async function login(email: string, password: string): Promise<Result<User, GenericErrors>> {
  await delay(400);
  
  if (shouldSimulateError(0.2)) {
    return Err(mockErrors.login);
  }
  
  const user = mockUsers.find(u => u.email === email && password === 'password123');
  
  if (!user) {
    return Err({
      'email': ['неверный email или пароль']
    });
  }
  
  return Ok(user);
}

export async function getUser(): Promise<User> {
  await delay(300);
  return mockUsers[0]; // Возвращаем первого пользователя как текущего
}

export async function favoriteArticle(slug: string): Promise<Article> {
  await delay(250);
  
  const article = mockArticles.find(a => a.slug === slug);
  if (!article) {
    throw new Error('Статья не найдена');
  }
  
  return {
    ...article,
    favorited: true,
    favoritesCount: article.favoritesCount + 1
  };
}

export async function unfavoriteArticle(slug: string): Promise<Article> {
  await delay(250);
  
  const article = mockArticles.find(a => a.slug === slug);
  if (!article) {
    throw new Error('Статья не найдена');
  }
  
  return {
    ...article,
    favorited: false,
    favoritesCount: Math.max(0, article.favoritesCount - 1)
  };
}

export async function updateSettings(user: UserSettings): Promise<Result<User, GenericErrors>> {
  await delay(400);
  
  if (shouldSimulateError(0.15)) {
    return Err(mockErrors.settings);
  }
  
  const updatedUser: User = {
    ...mockUsers[0],
    username: user.username,
    email: user.email,
    bio: user.bio,
    image: user.image
  };
  
  return Ok(updatedUser);
}

export async function signUp(user: UserForRegistration): Promise<Result<User, GenericErrors>> {
  await delay(500);
  
  if (shouldSimulateError(0.2)) {
    return Err(mockErrors.registration);
  }
  
  // Проверяем, не существует ли уже пользователь с таким email или username
  const existingUser = mockUsers.find(u => 
    u.email === user.email || u.username === user.username
  );
  
  if (existingUser) {
    return Err({
      'email': existingUser.email === user.email ? ['уже используется'] : [],
      'username': existingUser.username === user.username ? ['уже занят'] : []
    });
  }
  
  const newUser: User = {
    username: user.username,
    email: user.email,
    token: `mock_token_${Date.now()}`,
    bio: null,
    image: null
  };
  
  return Ok(newUser);
}

export async function createArticle(article: ArticleForEditor): Promise<Result<Article, GenericErrors>> {
  await delay(600);
  
  if (shouldSimulateError(0.1)) {
    return Err(mockErrors.article);
  }
  
  const slug = article.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
  
  const newArticle: Article = {
    slug,
    title: article.title,
    description: article.description,
    body: article.body,
    tagList: article.tagList,
    createdAt: new Date(),
    updatedAt: new Date(),
    favorited: false,
    favoritesCount: 0,
    author: mockProfiles[0] // Текущий пользователь
  };
  
  return Ok(newArticle);
}

export async function getArticle(slug: string): Promise<Article> {
  await delay(300);
  
  const article = mockArticles.find(a => a.slug === slug);
  if (!article) {
    throw new Error('Статья не найдена');
  }
  
  return article;
}

export async function updateArticle(slug: string, article: ArticleForEditor): Promise<Result<Article, GenericErrors>> {
  await delay(500);
  
  if (shouldSimulateError(0.1)) {
    return Err(mockErrors.article);
  }
  
  const existingArticle = mockArticles.find(a => a.slug === slug);
  if (!existingArticle) {
    throw new Error('Статья не найдена');
  }
  
  const updatedArticle: Article = {
    ...existingArticle,
    title: article.title,
    description: article.description,
    body: article.body,
    tagList: article.tagList,
    updatedAt: new Date()
  };
  
  return Ok(updatedArticle);
}

export async function getProfile(username: string): Promise<Profile> {
  await delay(300);
  
  const profile = mockProfiles.find(p => p.username === username);
  if (!profile) {
    throw new Error('Профиль не найден');
  }
  
  return profile;
}

export async function followUser(username: string): Promise<Profile> {
  await delay(400);
  
  const profile = mockProfiles.find(p => p.username === username);
  if (!profile) {
    throw new Error('Пользователь не найден');
  }
  
  return {
    ...profile,
    following: true
  };
}

export async function unfollowUser(username: string): Promise<Profile> {
  await delay(400);
  
  const profile = mockProfiles.find(p => p.username === username);
  if (!profile) {
    throw new Error('Пользователь не найден');
  }
  
  return {
    ...profile,
    following: false
  };
}

export async function getFeed(filters: FeedFilters = {}): Promise<MultipleArticles> {
  await delay(350);
  
  const limit = filters.limit || 10;
  const offset = filters.offset || 0;
  const paginatedArticles = mockFeedArticles.articles.slice(offset, offset + limit);
  
  return {
    articles: paginatedArticles,
    articlesCount: mockFeedArticles.articlesCount
  };
}

export async function getArticleComments(slug: string): Promise<Comment[]> {
  await delay(300);
  
  // Проверяем, существует ли статья
  const article = mockArticles.find(a => a.slug === slug);
  if (!article) {
    throw new Error('Статья не найдена');
  }
  
  return mockComments;
}

export async function deleteComment(slug: string, commentId: number): Promise<void> {
  await delay(300);
  
  // Проверяем, существует ли статья
  const article = mockArticles.find(a => a.slug === slug);
  if (!article) {
    throw new Error('Статья не найдена');
  }
  
  // Проверяем, существует ли комментарий
  const comment = mockComments.find(c => c.id === commentId);
  if (!comment) {
    throw new Error('Комментарий не найден');
  }
  
  // В реальном приложении здесь был бы удален комментарий
  console.log(`Комментарий ${commentId} удален из статьи ${slug}`);
}

export async function createComment(slug: string, body: string): Promise<Comment> {
  await delay(400);
  
  // Проверяем, существует ли статья
  const article = mockArticles.find(a => a.slug === slug);
  if (!article) {
    throw new Error('Статья не найдена');
  }
  
  const newComment: Comment = {
    id: Date.now(), // Простой способ генерации ID
    createdAt: new Date(),
    updatedAt: new Date(),
    body,
    author: mockProfiles[0] // Текущий пользователь
  };
  
  return newComment;
}

export async function deleteArticle(slug: string): Promise<void> {
  await delay(400);
  
  const article = mockArticles.find(a => a.slug === slug);
  if (!article) {
    throw new Error('Статья не найдена');
  }
  
  // В реальном приложении здесь была бы удалена статья
  console.log(`Статья ${slug} удалена`);
}
