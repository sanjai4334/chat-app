import { ChatMessage, User } from "../types/chat";

export const onlineUsers: Record<string, User> = {};
export const offlineMessageQueue: Record<string, ChatMessage[]> = {};
export const offlineMessageUpdatesQueue: Record<string, ChatMessage[]> = {};
