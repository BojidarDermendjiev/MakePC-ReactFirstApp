import { serverUrl, serverEndpoints } from "../common/generic";
import { get, post, put, del } from "./requester";

export const createComment = async (userId, data) => {
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
};

export const deleteComment = async (commentId) => {
  try {
    const response = await del(
      `${serverUrl}${serverEndpoints.deleteFeedback(commentId)}`
    );
    return response;
  } catch (error) {
    return { error: "Something went wrong..." };
  }
};

export const editComment = async (commentId, userId, data) => {
  const updatePayload = {
    id: commentId,
    userId,
    rating: data.rating,
    comment: data.comment,
  };
  await put(
    `${serverUrl}${serverEndpoints.updateFeedback(commentId)}`,
    updatePayload
  );
};

export const getCommentById = async (commentId) => {
  try {
    const response = await get(
      `${serverUrl}${serverEndpoints.getFeedbackById(commentId)}`
    );
    return response;
  } catch (error) {
    return { error: "Something went wrong..." };
  }
};
