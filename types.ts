export interface User {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  isBot?: boolean;
}

export interface Message {
  id: string;
  content: string;
  authorId: string;
  timestamp: number;
  attachments?: string[];
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  categoryId?: string;
}

export interface ChannelCategory {
  id: string;
  name: string;
  channelIds: string[];
}

export interface Server {
  id: string;
  name: string;
  icon: string;
  channels: Channel[];
  categories: ChannelCategory[];
  users: string[]; // User IDs
}

export interface AppSettings {
  micBoost: number; // 0 to 5000
  region: 'US' | 'RU' | 'UA';
  themeColor: string;
}

export interface CallState {
  isActive: boolean;
  channelId: string | null;
  participants: User[];
  isScreenSharing: boolean;
  youtubeVideoId: string | null;
}

export interface AppState {
  isAuthenticated: boolean;
  currentUser: User;
  users: Record<string, User>;
  servers: Server[];
  activeServerId: string; // 'home' or serverId
  activeChannelId: string;
  messages: Record<string, Message[]>;
  isMobileMenuOpen: boolean;
  isSettingsOpen: boolean;
  settings: AppSettings;
  callState: CallState;
}