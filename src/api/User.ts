// api/CommonApi.ts
import request from "@/utils/request";
import { Post } from "@/types/post";
import { ApiResponse } from "./type";
import { User } from "@/types/user";
// types/api.ts
export interface LoginInterface {
  [key: string]: string;
  username: string;
  password: string;
}
const UserApi = {
  // 创建文章
  register(data: LoginInterface): Promise<ApiResponse<{ token: string }>> {
    return request.post("/register", data);
  },
  // 删除
  login(data: LoginInterface): Promise<ApiResponse<{ token: string }>> {
    return request.post(`/login`, data);
  },
  userinfo(): Promise<ApiResponse<User>> {
    return request.get(`/userinfo`);
  },
};

export default UserApi;
