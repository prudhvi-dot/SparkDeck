import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title cannot exceed 100 characters" }),
    
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" })
    .max(500, { message: "Description cannot exceed 500 characters" }),
    
  category: z
    .string()
    .min(3, { message: "Category must be at least 3 characters" })
    .max(20, { message: "Category cannot exceed 20 characters" }),
    
  link: z
    .string()
    .url({ message: "Link must be a valid URL" })
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");
        return contentType?.startsWith("image/");
      } catch (error) {
        return false;
      }
    }, { message: "" }),
    
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long" }),
});
