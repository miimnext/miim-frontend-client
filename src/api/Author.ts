/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "@/utils/request";
import { ApiListResponse, ApiResponse } from "./type";
import { Post } from "@/types/post";
import { User } from "@/types/user";

const AuthorApi = {
  getAuthorInfo(id: string): Promise<ApiResponse<User>> {
    return request.get(`/author/${id}`);
  },
  getAuthorPosts(
    id: string,
    params: {
      page?: number;
      page_size?: number;
    },
    headers?: any
  ): Promise<ApiListResponse<Post[]>> {
    return request.get(`/postsByUser/${id}`, { params, headers });
  },
};

export default AuthorApi;
