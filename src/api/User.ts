// api/CommonApi.ts
import request from "@/utils/request";
import { Post } from "@/types/post";
import { ApiResponse } from "./type";
// types/api.ts
export interface LoginInterface {
  [key: string]: string;
  username: string;
  password: string;
}
const UserApi = {
  // 创建文章
  register(data: Post): Promise<ApiResponse<null>> {
    return request.post("/register", data);
  },
  // 删除
  login(data: LoginInterface): Promise<ApiResponse<null>> {
    return request.post(`/login`, data);
  },
  userinfo(): Promise<ApiResponse<null>> {
    return request.get(`/userinfo`);
  },
};

export default UserApi;
