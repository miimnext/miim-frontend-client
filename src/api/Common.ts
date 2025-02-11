// api/CommonApi.ts
import request from "@/utils/request";
import { Post } from "@/types/post";
import { ApiListResponse, ApiResponse } from "./type";
// types/api.ts

const CommonApi = {
  // 创建文章
  createPost(data: Post): Promise<ApiResponse<null>> {
    return request.post("/posts", data);
  },
  // 删除
  DeletePost(id: number): Promise<ApiResponse<null>> {
    return request.delete(`/posts/${id}`);
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
