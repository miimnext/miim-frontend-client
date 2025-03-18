/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "@/utils/request";
import { ApiResponse } from "./type";
import { User } from "@/types/user";
// types/api.ts
export interface LoginInterface {
  [key: string]: string;
  username: string;
  password: string;
}
const UserApi = {
  register(data: LoginInterface): Promise<ApiResponse<{ token: string }>> {
    return request.post("/register", data);
  },
  login(data: LoginInterface): Promise<ApiResponse<{ token: string }>> {
    return request.post(`/login`, data);
  },
  userinfo(): Promise<ApiResponse<User>> {
    return request.get(`/userinfo`);
  },
  UpdateUserInfo(data: any): Promise<ApiResponse<User>> {
    return request.post(`/UpdateUserInfo`, data);
  },
};

export default UserApi;
