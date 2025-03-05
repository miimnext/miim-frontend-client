// api/CommonApi.ts
import request from "@/utils/request";
import { Post } from "@/types/post";
import { ApiListResponse, ApiResponse, optionsType } from "./type";
// types/api.ts
export interface PostParams {
  content: string;
}

const CommonApi = {
  // 创建文章
  createPost(data: PostParams): Promise<ApiResponse<null>> {
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
  // 通过 ID 获取文章
  GetTags(): Promise<ApiResponse<optionsType[]>> {
    return request.get(`/tags`);
  },
  GetCategorys(): Promise<ApiResponse<optionsType[]>> {
    return request.get(`/categorys`);
  },
};

export default CommonApi;
