import { Form, useNavigate, useActionData, useLoaderData } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { User02Icon, ArrowLeft02Icon, Pen } from "@hugeicons/core-free-icons";
import type { User } from "../types";
import { useState, useEffect } from "react";
import type { FormValidationError } from "../types";
import { FieldErrors } from "../components/FieldErrors";

const CurrentUserEditPage = () => {
  const navigate = useNavigate();
  const user: User = useLoaderData();
  const errors: FormValidationError[] | undefined = useActionData();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const { username, avatar, about } = user;

  const userAvatar = avatar ? (
    <img
      src={avatar}
      alt={`${username}'s profile picture`}
      className="size-full object-cover rounded-full"
    />
  ) : (
    <div className="flex size-full items-center justify-center">
      <HugeiconsIcon
        icon={User02Icon}
        color="white"
        strokeWidth={0.5}
        className="size-24 opacity-90"
      />
    </div>
  );

  return (
    <div className="flex-1 overflow-hidden rounded-2xl border dark:border-slate-800 dark:bg-slate-900/90 overflow-y-auto">
      <header className="relative flex items-center justify-center border-b border-slate-800 px-4 py-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 inline-flex items-center justify-center rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
          aria-label="Go back"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} strokeWidth={2.5} />
        </button>

        <h1 className="font-semibold text-white">Edit Profile</h1>
      </header>

      <Form
        className="px-4 py-6 max-w-md mx-auto flex flex-col gap-4 "
        action="/users/me/edit"
        encType="multipart/form-data"
        method="patch"
      >
        <div className="relative mx-auto size-40 rounded-full border border-slate-700 bg-slate-950/40 shadow-xl">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="size-full object-cover rounded-full"
            />
          ) : (
            userAvatar
          )}

          <label
            htmlFor="avatar"
            className="absolute bottom-0 right-2 flex items-center justify-center bg-blue-600 p-2 rounded-full"
          >
            <HugeiconsIcon icon={Pen} />
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            className="opacity-0 size-0"
            onChange={handleFileChange}
          />

          <FieldErrors fieldName="avatar" validationErrors={errors} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="username">
            Username<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            required
            placeholder="johndoe123"
            className="border dark:border-slate-700 dark:bg-slate-800  rounded-xl focus:outline-2 focus:outline-blue-600 px-3 py-2.5"
            maxLength={10}
            minLength={3}
            defaultValue={username}
          />

          <FieldErrors fieldName="username" validationErrors={errors} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="about">About</label>
          <textarea
            name="about"
            id="about"
            placeholder="Write your about here..."
            className="border dark:border-slate-700 dark:bg-slate-800  rounded-xl focus:outline-2 focus:outline-blue-600 px-3 py-2.5 resize-none"
            maxLength={50}
            defaultValue={about}
            rows={3}
          />

          <FieldErrors fieldName="about" validationErrors={errors} />
        </div>

        <div className="flex font-semibold gap-2">
          <button
            type="submit"
            className="bg-blue-600 flex-1 rounded-lg py-1.5"
          >
            Submit
          </button>
          <button
            onClick={() => navigate("/users/me")}
            type="button"
            className="bg-slate-600 flex-1 rounded-lg py-1.5"
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CurrentUserEditPage;
