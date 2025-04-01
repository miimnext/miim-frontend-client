/* eslint-disable @typescript-eslint/no-explicit-any */
// api/CommonApi.ts
import request from "@/utils/request";
import { ApiResponse } from "./type";
export interface CreateConversationInterface {
  user_id: string;
  receiver_id: string;
}
const ConversationsApi = {
  getConversations(): Promise<ApiResponse<any>> {
    return request.get(`/conversation`);
  },
  GetConversationByID(id: string): Promise<ApiResponse<any>> {
    return request.get(`/conversation/${id}`);
  },
  CreateConversation(
    data: CreateConversationInterface
  ): Promise<ApiResponse<any>> {
    return request.post(`/createConversation`, data);
  },
};

export default ConversationsApi;
