export interface ApiListResponse<T> {
  status: number;
  message: string;
  data: {
    list: T;
  };
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface optionsType {
  id: number;
  name: string;
}

export interface createPostParams {
  content: string;
  title: string;
  category_ids: number[];
  tag_ids: number[];
  author_id: number;
}
