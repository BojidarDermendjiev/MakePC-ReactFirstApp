import { serverUrl, serverEndpoints } from "../common/generic";
import { get, post, put, del } from "./requester";

export const createComment = async (userId, data) => {
  try {
    const newComment = {
      commentId: crypto.randomUUID(),
      comment: data.comment,
      review: data.review,
    };

    const targetUser = await get(
      `${serverUrl}${serverEndpoints.createComment}/${userId}`
    );

    const updatedUser = {
      ...targetUser,
      comments: {
        ...(targetUser.comments || {}),
        [newComment.commentId]: newComment,
      },
    };

    await put(
      `${serverUrl}${serverEndpoints.createComment}/${userId}`,
      updatedUser
    );
    return { message: "Comment created successfully" };
  } catch (error) {
    return { error: "Something went wrong..." };
  }
};

export const deleteComment = async (userId, commentId) => {
  try {
    const targetUser = await get(
      `${serverUrl}${serverEndpoints.createComment}/${userId}`
    );

    const { [commentId]: _, ...remainingComments } = targetUser.comments;

    const updatedUser = {
      ...targetUser,
      comments: remainingComments,
    };

    await put(
      `${serverUrl}${serverEndpoints.createComment}/${userId}`,
      updatedUser
    );

    return { message: "Comment successfully deleted" };
  } catch (error) {
    return { error: "Something went wrong..." };
  }
};

export const editComment = async (commentId, user, values) => {
  try {
    const targetUser = await get(
      `${serverUrl}${serverEndpoints.createComment}/${user._id}`
    );

    const updatedComments = {
      ...targetUser.comments,
      [commentId]: {
        ...targetUser.comments[commentId],
        comment: values.comment,
        review: values.review,
      },
    };

    const updatedUser = {
      ...targetUser,
      comments: updatedComments,
    };

    await put(
      `${serverUrl}${serverEndpoints.createComment}/${user._id}`,
      updatedUser
    );
    return { message: "Successfully edited comment" };
  } catch (e) {
    return { error: "Something went wrong..." };
  }
};
export const getCommentById = async (reviewId) => {
  try {
    const dataJson = await get(
      `${serverUrl}${serverEndpoints.createComment}/${reviewId}`
    );
    return dataJson;
  } catch (error) {
    return { error: "Something went wrong..." };
  }
};
