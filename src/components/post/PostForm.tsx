import React, { type ChangeEvent, useState, type FormEvent } from "react";

export interface Post {
  title: string;
  content: string;
}

type Props = {
  data?: Post;
  onSave: (data: Post) => void;
};

const PostForm = ({ data, onSave }: Props) => {
  const [form, setForm] = useState(data || { title: "", content: "" });
  const [error, setError] = useState({
    title: "",
    content: "",
  });
  const { title, content } = form;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setError({ title: "", content: "" });
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    Object.entries(form).forEach(([key, value]: string[]) => {
      if (value?.trim().length === 0)
        setError((err) => ({ ...err, [key as string]: true }));
      return;
    });

    if (Object.values(form).some((item) => !item)) return;

    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col space-y-2">
      <div>
        <label
          className={`${
            error.title
              ? "text-red-500 dark:text-red-500"
              : "text-gray-700 dark:text-white"
          } text-md  mb-1 block font-semibold`}
          htmlFor="title"
        >
          Title
        </label>
        <input
          value={title}
          name="title"
          className={` mb-1 w-full appearance-none rounded border bg-inherit px-3 py-2 text-lg leading-tight  text-gray-700 focus:outline-blue-500 dark:text-white dark:focus:outline-blue-500 ${
            error.title && "border-red-500"
          }`}
          id="title"
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          className={`${
            error.content
              ? "text-red-500 dark:text-red-500"
              : "text-gray-700 dark:text-white"
          } text-md  mb-1 block font-semibold`}
          htmlFor="title"
        >
          Content
        </label>
        <textarea
          value={content}
          name="content"
          rows={6}
          className={` mb-1 w-full appearance-none rounded border bg-inherit px-3 py-2 text-lg leading-tight text-gray-700 focus:outline-blue-500 dark:text-white dark:focus:outline-blue-500 ${
            error.content && "border-red-500"
          }`}
          id="content"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="rounded bg-green-500 px-4 py-2 text-sm font-bold text-white hover:bg-green-700 "
      >
        Save
      </button>
    </form>
  );
};

export default PostForm;
