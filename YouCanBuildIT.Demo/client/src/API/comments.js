import { serverUrl, serverEndpoints } from "../common/generic";

export const createComment = async (user, data) => {
  try {
    const res = await fetch(`${serverUrl}${serverEndpoints.createComment}`, {
      method: "POST",
      body: JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        comment: data.comment,
        review: data.review,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataJson = await res.json();
    return { message: "Comment created successfully" };
  } catch (error) {
    return { error: "Something went wrong..." };
  }
};

export const deleteComment = async (reviewId) => {
  try {
    const res = await fetch(
      `${serverUrl}${serverEndpoints.createComment}/${reviewId}`,
      {
        method: "DELETE",
      }
    );
    return { message: "Comment successfully deleted" };
  } catch (error) {
    return { error: "Something went wrong..." };
  }
};

export const editComment = async (reviewId, values) => {
  try {
    const res = await fetch(
      `${serverUrl}${serverEndpoints.createComment}/${reviewId}`,
      {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return { message: "Successfully edited comment" };
  } catch (e) {
    return { error: "Something went wrong..." };
  }
};

export const getCommentById = async (reviewId) => {
  try {
    const res = await fetch(
      `${serverUrl}${serverEndpoints.createComment}/${reviewId}`
    );
    const dataJson = await res.json();
    return dataJson;
  } catch (error) {
    return { error: "Something went wrong..." };
  }
};
