import { ChatRoom, Message } from "./Chatroom";


export interface AuthState {
    isLogged: boolean;
    user: User | null;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface UIState {
    isLoading: boolean;
  }
  
  export interface UsersState {
    users: User[];
    error: string | null;
  }
  
  export interface ChatState {
    isLoading: boolean | undefined;
    chatRooms: ChatRoom[];
    selectedRoom: ChatRoom | undefined;
    messages: Message[];
    error: string | null;
  }
  
  export interface User {
    id: string;
    username: string;
    online: boolean;
  }