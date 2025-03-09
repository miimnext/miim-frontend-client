export interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    nickname: string;
    username: string;
  };
  categories: number[]; // 传分类 ID 数组
  tags: number[]; // 传标签 ID 数组
  image?: string;
  created_at?: string;
  updated_at?: string;
}
