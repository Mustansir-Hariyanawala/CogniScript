import axios from 'axios';
import { BASE_URL } from './config.mjs';

// Get all chats with basic information
export const getAllChats = async () => {
  return axios.get(`${BASE_URL}/api/chats`);
};

// Get all chats for a specific user
export const getUserChats = async (userId) => {
  return axios.get(`${BASE_URL}/api/users/${encodeURIComponent(userId)}/chats`);
};

// Get specific chat data by chatId with complete information
export const getChatById = async (chatId) => {
  return axios.get(`${BASE_URL}/api/chats/${chatId}`);
};

// Create a new chat for a user
export const createNewChat = async (userId) => {
  let data = {
    userId: userId,
  };

  return axios.post(`${BASE_URL}/api/chats`, data, {
    headers: { 
      'Content-Type': 'application/json'
    }
  });
};

// Add a prompt to a chat, including a document upload
export const addPromptToChat = async (chatId, text, doc) => {
  return axios.post(`${BASE_URL}/api/chats/${chatId}/prompt`, {
    prompt: text,
    userId: sessionStorage.getItem('user_id'),
  }, {
    headers: { 'Content-Type': 'application/json' }
  });
};

// Upload a document to the chat's vector database.
export const uploadDocumentToChat = async (chatId, file) => {
  const data = new FormData();
  data.append('file', file, file.name);

  return axios.post(`${BASE_URL}/api/chats/${chatId}/upload`, data);
};

// Update the response in the last history item of a chat
export const appendResponseToChat = async (chatId, response) => {
  let data = {
    response: response
  };

  return axios.put(`${BASE_URL}/api/chats/${chatId}/response`, data, {
    headers: { 
      'Content-Type': 'application/json'
    }
  });
};

// Get the latest history item from a chat
export const getLatestHistoryItem = async (chatId) => {
  return axios.get(`${BASE_URL}/api/chats/${chatId}/latest`);
};

// Delete a specific chat by chatId
export const deleteChatById = async (chatId) => {
  return axios.delete(`${BASE_URL}/api/chats/${chatId}`);
};

// Update the title of a specific chat by chatId
export const updateChatTitle = async (chatId, newTitle) => {
  let data = {
    title: newTitle
  };

  return axios.put(`${BASE_URL}/api/chats/${chatId}/title`, data, {
    headers: { 
      'Content-Type': 'application/json'
    }
  });
};

const CHAT_APIS = {
  addPromptToChat,
  uploadDocumentToChat,
  getAllChats,
  getUserChats,
  getChatById,
  createNewChat,
  appendResponseToChat,
  getLatestHistoryItem,
  deleteChatById
};

export default CHAT_APIS;
