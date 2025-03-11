import request from "@/utils/request";
import { ApiListResponse, ApiResponse } from "./type";
import { Post } from "@/types/post";
import { User } from "@/types/user";

const AuthorApi = {
  getAuthorInfo(id: string): Promise<ApiResponse<User>> {
    return request.get(`/author/${id}`);
  },
  getAuthorPosts(id: string): Promise<ApiListResponse<Post[]>> {
    return request.get(`/postsByUser/${id}`);
  },
};

export default AuthorApi;
