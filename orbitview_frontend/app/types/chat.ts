export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: string;
}

export interface ChatState {
    messages: Message[];
    isLoading: boolean;
}