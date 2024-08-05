import { serverUrl, serverEndpoints } from "../common/generic";
import { get, post, put, del } from "./requester";

export const createComment = async (user, data) => {
  try {
    const res = await post(`${serverUrl}${serverEndpoints.createComment}`, {
      userId: user._id,
      name: user.name,
      email: user.email,
      comment: data.comment,
      review: data.review,
    });
    return { message: "Comment created successfully" };
  } catch (error) {
    return { error: "Something went wrong..." };
  }
};

export const deleteComment = async (reviewId) => {
  try {
    await del(`${serverUrl}${serverEndpoints.createComment}/${reviewId}`);
    return { message: "Comment successfully deleted" };
  } catch (error) {
    return { error: "Something went wrong..." };
  }
};

export const editComment = async (reviewId, user, values) => {
  try {
    const res = await put(
      `${serverUrl}${serverEndpoints.createComment}/${reviewId}`,
      {
        userId: user._id,
        name: user.name,
        email: user.email,
        comment: values.comment,
        review: values.review,
      }
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
