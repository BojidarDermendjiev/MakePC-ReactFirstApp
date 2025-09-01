import { serverUrl, serverEndpoints } from "../../common/generic";
import { get, post, put, del } from "../requester";

export const feedbackApi = {
  createComment: async (userId: string, data: { rating: number; comment: string }) => {
    try {
      const feedbackPayload = {
        userId,
        rating: data.rating,
        comment: data.comment,
      };
      const response = await post(
        `${serverUrl}${serverEndpoints.createFeedback}`,
        feedbackPayload
      );
      return response;
    } catch (error) {
      return { error: "Something went wrong..." };
    }
  },

  deleteComment: async (commentId: string) => {
    try {
      const response = await del(
        `${serverUrl}${serverEndpoints.deleteFeedback(commentId)}`
      );
      return response;
    } catch (error) {
      return { error: "Something went wrong..." };
    }
  },

  updateComment: async (commentId: string, data: { rating: number; comment: string }) => {
    try {
      const response = await put(
        `${serverUrl}${serverEndpoints.updateFeedback(commentId)}`,
        data
      );
      return response;
    } catch (error) {
      return { error: "Something went wrong..." };
    }
  },

  getAllFeedbacks: async () => {
    try {
      const response = await get(`${serverUrl}${serverEndpoints.getAllFeedbacks}`);
      return response;
    } catch (error) {
      return { error: "Something went wrong..." };
    }
  },

  getFeedbackById: async (feedbackId: string) => {
    try {
      const response = await get(`${serverUrl}${serverEndpoints.getFeedbackById(feedbackId)}`);
      return response;
    } catch (error) {
      return { error: "Something went wrong..." };
    }
  }
};