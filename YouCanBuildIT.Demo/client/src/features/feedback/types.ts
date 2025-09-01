export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  rating: number;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFeedbackData {
  rating: number;
  comment: string;
}

export interface UpdateFeedbackData {
  rating: number;
  comment: string;
}