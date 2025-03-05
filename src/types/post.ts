export interface Post {
  id: number;
  title: string;
  content: string;
  author_id: number;
  category_ids: number[]; // 传分类 ID 数组
  tag_ids: number[]; // 传标签 ID 数组
  image?: string;
  created_at?: string;
}
