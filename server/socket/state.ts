import { MessageDTO, MessageEnvelope, User } from "../types";

export const onlineUsers: Record<User["id"], User> = {};
export const offlineMessageQueue: Record<MessageEnvelope['chatId'], MessageEnvelope[]> = {};
export const offlineMessageUpdatesQueue: Record<MessageEnvelope['chatId'], MessageEnvelope[]> = {};
