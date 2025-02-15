/* eslint-disable @typescript-eslint/no-explicit-any */
// api/CommonApi.ts
import request from "@/utils/request";
import { ApiResponse } from "./type";
import { User } from "@/types/user";
// types/api.ts
export interface LoginInterface {
  [key: string]: string;
  username: string;
  password: string;
}
export interface CreateConversationInterface {
  user_id: string;
  receiver_id: string;
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
  CreateConversation(
    data: CreateConversationInterface
  ): Promise<ApiResponse<any>> {
    return request.post(`/createConversation`, data);
  },
};

export default UserApi;
