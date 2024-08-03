import { serverUrl, serverEndpoints } from "../common/generic";

export const createComment = async (user, data) => {
    const res = await fetch(`${serverUrl}${serverEndpoints.createComment}`, {
        method: "POST",
        body: JSON.stringify({
            userId: user._id,
            name: user.name,
            email: user.email,
            comment: data.comment,
            review: data.comment
        })
    })
    const dataJson = await res.json()
    console.log(dataJson)
    return {message: "Успешно създадохте коментар"}
};
