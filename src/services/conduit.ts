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

// Импортируем моковые функции
import {
  getArticles as mockGetArticles,
  getTags as mockGetTags,
  login as mockLogin,
  getUser as mockGetUser,
  favoriteArticle as mockFavoriteArticle,
  unfavoriteArticle as mockUnfavoriteArticle,
  updateSettings as mockUpdateSettings,
  signUp as mockSignUp,
  createArticle as mockCreateArticle,
  getArticle as mockGetArticle,
  updateArticle as mockUpdateArticle,
  getProfile as mockGetProfile,
  followUser as mockFollowUser,
  unfollowUser as mockUnfollowUser,
  getFeed as mockGetFeed,
  getArticleComments as mockGetArticleComments,
  deleteComment as mockDeleteComment,
  createComment as mockCreateComment,
  deleteArticle as mockDeleteArticle,
} from './conduitMock';

export async function getArticles(filters: ArticlesFilters = {}): Promise<MultipleArticles> {
  return mockGetArticles(filters);
}

export async function getTags(): Promise<{ tags: string[] }> {
  return mockGetTags();
}

export async function login(email: string, password: string): Promise<Result<User, GenericErrors>> {
  return mockLogin(email, password);
}

export async function getUser(): Promise<User> {
  return mockGetUser();
}

export async function favoriteArticle(slug: string): Promise<Article> {
  return mockFavoriteArticle(slug);
}

export async function unfavoriteArticle(slug: string): Promise<Article> {
  return mockUnfavoriteArticle(slug);
}

export async function updateSettings(user: UserSettings): Promise<Result<User, GenericErrors>> {
  return mockUpdateSettings(user);
}

export async function signUp(user: UserForRegistration): Promise<Result<User, GenericErrors>> {
  return mockSignUp(user);
}

export async function createArticle(article: ArticleForEditor): Promise<Result<Article, GenericErrors>> {
  return mockCreateArticle(article);
}

export async function getArticle(slug: string): Promise<Article> {
  return mockGetArticle(slug);
}

export async function updateArticle(slug: string, article: ArticleForEditor): Promise<Result<Article, GenericErrors>> {
  return mockUpdateArticle(slug, article);
}

export async function getProfile(username: string): Promise<Profile> {
  return mockGetProfile(username);
}

export async function followUser(username: string): Promise<Profile> {
  return mockFollowUser(username);
}

export async function unfollowUser(username: string): Promise<Profile> {
  return mockUnfollowUser(username);
}

export async function getFeed(filters: FeedFilters = {}): Promise<MultipleArticles> {
  return mockGetFeed(filters);
}

export async function getArticleComments(slug: string): Promise<Comment[]> {
  return mockGetArticleComments(slug);
}

export async function deleteComment(slug: string, commentId: number): Promise<void> {
  return mockDeleteComment(slug, commentId);
}

export async function createComment(slug: string, body: string): Promise<Comment> {
  return mockCreateComment(slug, body);
}

export async function deleteArticle(slug: string): Promise<void> {
  return mockDeleteArticle(slug);
}
