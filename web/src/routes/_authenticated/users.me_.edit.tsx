import { createFileRoute, useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router'
import { FieldErrors } from '../../components/FieldErrors';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft02Icon, Pen } from '@hugeicons/core-free-icons';
import { UserAvatar } from '../../components/UserAvatar';
import { useEffect, useState } from 'react';
import type { FormValidationError, User } from '../../types';

export const Route = createFileRoute('/_authenticated/users/me_/edit')({
  loader: async ({ context }) => {
    const { token } = context.user
    const BASE_URL = import.meta.env.VITE_API_URL;
    const options = { headers: { Authorization: `Bearer ${token}` } }

    const res = await fetch(`${BASE_URL}/users/me`, options)

    if (!res.ok) {
      throw new Error("Fail to load profile")
    }

    const user = await res.json()
    return user;
  },
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const router = useRouter()
  const canGoBack = useCanGoBack()

  const user: User = Route.useLoaderData();
  const errors: FormValidationError[] | undefined = [] // useActionData();

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

  return (
    <div className="flex-1 overflow-hidden rounded-2xl border dark:border-slate-800 dark:bg-slate-900/90 overflow-y-auto">
      <header className="relative flex items-center justify-center border-b border-slate-800 px-4 py-4">
        <button
          onClick={() => router.history.back()}
          disabled={!canGoBack}
          className="absolute left-4 inline-flex items-center justify-center rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
          aria-label="Go back"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} strokeWidth={2.5} />
        </button>

        <h1 className="font-semibold text-white">Edit Profile</h1>
      </header>

      <form
        className="px-4 py-6 max-w-md mx-auto flex flex-col gap-4 "
        action="/users/me/edit"
        encType="multipart/form-data"
        method="patch"
      >
        <div className="text-center text-nowrap relative mx-auto size-40 rounded-full border border-slate-700 bg-slate-950/40 shadow-xl">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="size-full object-cover rounded-full"
            />
          ) : (
            <UserAvatar avatar={avatar} username={username} />
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
            accept="image/*"
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
            onClick={() => navigate({ to: "/users/me" })}
            type="button"
            className="bg-slate-600 flex-1 rounded-lg py-1.5"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
