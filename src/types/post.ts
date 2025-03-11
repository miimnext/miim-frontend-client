export interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    nickname: string;
    username: string;
    avatar: string;
  };
  categories: number; // 传分类 ID 数组
  tags: number[]; // 传标签 ID 数组
  image?: string;
  created_at?: string;
  updated_at?: string;
  likes: number;
  dislikes?: number;
  ReactionType: string;
}
