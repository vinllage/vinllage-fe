import type { Board } from '@/app/admin/board/_types.ts'

export interface BoardData {
  seq: number;
  bid: string;
  gid: string;
  subject: string;
  content: string;
  poster: string;
  notice: boolean;
  secret: boolean;
  guest: boolean;
  createdAt: string;
  viewCount: number;
  member?: any;
  board: Board;
}

export interface PostForm {
  mode: 'register' | 'update';
  seq?: number;
  bid: string;
  gid: string;
  subject: string;
  content: string;
  poster: string;
  notice: boolean;
  secret: boolean;
  guest: boolean;
  password?: string;
}

export interface BoardSearch {
  page: number;
  limit: number;
  keyword?: string;
  category?: string;
}