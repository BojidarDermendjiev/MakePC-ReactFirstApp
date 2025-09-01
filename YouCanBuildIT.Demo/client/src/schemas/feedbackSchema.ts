import * as Yup from "yup";

export const feedbackSchema = Yup.object({
  comment: Yup.string()
    .min(10, "Comment must be at least 10 characters")
    .max(500, "Comment must not exceed 500 characters")
    .required("Comment is required"),
  rating: Yup.number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5")
    .required("Rating is required"),
});

export const editFeedbackSchema = feedbackSchema;