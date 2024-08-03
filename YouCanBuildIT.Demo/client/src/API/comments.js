import { serverUrl, serverEndpoints } from "../common/generic";

export const createComment = async (user, data) => {
  const res = await fetch(`${serverUrl}${serverEndpoints.createComment}`, {
    method: "POST",
    body: JSON.stringify({
      userId: user._id,
      name: user.name,
      email: user.email,
      comment: data.comment,
      review: data.review,
    }),
  });
  const dataJson = await res.json();
  console.log(dataJson);
  return { message: "Успешно създадохте коментар" };
};

export const deleteComment = async (reviewId) => {
  await fetch(`${serverUrl}${serverEndpoints.createComment}/${reviewId}`, {
    method: "DELETE",
  });
  return { message: "Успешно премаханте коментар" };
};

export const editComment = async (reviewId, values) => {
  try {
    await fetch(`${serverUrl}${serverEndpoints.createComment}/${reviewId}`, {
      method: "PATCH",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { message: "Успешно премаханте коментар" };
  } catch (e) {
    return { error: "Нещо се обърка..." };
  }
};

export const getCommentById = async (reviewId) => {
  const res = await fetch(
    `${serverUrl}${serverEndpoints.createComment}/${reviewId}`
  );
  return res.json();
};
