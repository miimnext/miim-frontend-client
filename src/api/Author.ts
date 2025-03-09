import request from "@/utils/request";
import { ApiListResponse, ApiResponse } from "./type";
import { Post } from "@/types/post";

const AuthorApi = {
  getAuthorInfo<T>(id: string): Promise<ApiResponse<T>> {
    return request.get(`/author/${id}`);
  },
  getAuthorPosts(id: string): Promise<ApiListResponse<Post[]>> {
    return request.get(`/postsByUser/${id}`);
  },
};

export default AuthorApi;
