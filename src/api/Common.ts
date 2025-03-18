/* eslint-disable @typescript-eslint/no-explicit-any */
// api/CommonApi.ts
import request from "@/utils/request";
import { Comments, Post } from "@/types/post";
import { ApiListResponse, ApiResponse, optionsType } from "./type";
// types/api.ts
export interface PostParams {
  content: string;
}

const CommonApi = {
  upload(formData: FormData): Promise<ApiResponse<{ filePath: string }>> {
    return request.post(`/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  // 创建文章
  createPost(data: PostParams): Promise<ApiResponse<null>> {
    return request.post("/posts", data);
  },
  // 删除
  DeletePost(id: number): Promise<ApiResponse<null>> {
    return request.delete(`/posts/${id}`);
  },

  // 获取文章列表（支持分页）
  getPostList(
    params?: {
      page?: number;
      page_size?: number;
    },
    headers = {}
  ): Promise<ApiListResponse<Post[]>> {
    return request.get("/posts", { params, headers });
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
  PostReaction(data: {
    post_id: number;
    reaction_type: number;
    user_id: number;
  }): Promise<ApiResponse<null>> {
    return request.post(`/posts/reaction`, data);
  },
  //
  GetCommentsByID(id: string): Promise<ApiListResponse<Comments[]>> {
    return request.get(`/comments/post/${id}`);
  },
};

export default CommonApi;
