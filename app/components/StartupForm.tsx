"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";

import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createStartup } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        content,
      };

      await formSchema.parseAsync(formValues);

      const result = await createStartup(formData, content);

      if (result.status === "SUCCESS") {
        router.push(`/startup/${result._doc._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      return {
        ...prevState,
        error: "An unexpected error occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form
      action={formAction}
      className="space-y-6 max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg"
    >
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          Title
        </label>
        <Input
          id="title"
          name="title"
          required
          placeholder="Startup Title"
          className="mt-2"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          required
          placeholder="Brief startup description"
          className="mt-2"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          Category
        </label>
        <Input
          id="category"
          name="category"
          required
          placeholder="Tech, Health, Education..."
          className="mt-2"
        />
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>

      {/* Image URL */}
      <div>
        <label
          htmlFor="link"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          required
          placeholder="https://example.com/image.jpg"
          className="mt-2"
        />
        {errors.link && (
          <p className="text-red-500 text-sm mt-1">{errors.link}</p>
        )}
      </div>

      {/* Content (Markdown Editor) */}
      <div data-color-mode="light">
        <label
          htmlFor="content"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          Content
        </label>
        <MDEditor
          value={content}
          onChange={(value) => setContent(value as string)}
          id="content"
          preview="edit"
          height={300}
          className="mt-2 border rounded-lg overflow-hidden"
          textareaProps={{
            placeholder: "Write your detailed pitch here...",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-5" />
      </button>
    </form>
  );
};

export default StartupForm;
