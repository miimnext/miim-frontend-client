export interface Post {
  id?: number;
  title: string;
  content: string;
  author_id: number;
  categories: number[]; // 传分类 ID 数组
  tags: number[]; // 传标签 ID 数组
  image: string;
}
