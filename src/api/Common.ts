// api/CommonApi.ts
import request from "@/utils/request";
import { Post } from "@/types/post";
// types/api.ts
export interface ApiListResponse<T> {
  status: number;
  message: string;
  data: {
    list: T;
  };
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
const CommonApi = {
  // 创建文章
  createPost(data: Post): Promise<ApiResponse<null>> {
    return request.post("/posts", data);
  },

  // 获取文章列表（支持分页）
  getPostList(params?: {
    page?: number;
    page_size?: number;
  }): Promise<ApiListResponse<Post[]>> {
    return request.get("/posts", { params });
  },

  // 通过 ID 获取文章
  getPostByID(id: string): Promise<ApiResponse<Post>> {
    return request.get(`/posts/${id}`);
  },
};

export default CommonApi;
