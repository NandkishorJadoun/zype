import { createFileRoute, useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router'
import { FieldErrors } from '../../components/FieldErrors';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons';
import { UserAvatar } from '../../components/UserAvatar';
import { useEffect, useRef, useState } from 'react';
import type { FormValidationError, User } from '../../types';
import { useQuery, useMutation } from '@tanstack/react-query';
import { meQueryOptions, updateProfile } from '../../utils/me-query';
import { ValidationError } from '../../utils/validation-error';
import { FormField } from '../../components/FormField';

export const Route = createFileRoute('/_authenticated/users/me_/edit')({
  loader: async ({ context }) => {
    const { user, queryClient } = context
    const { token } = user
    await queryClient.ensureQueryData(meQueryOptions(token))
    return { token, queryClient }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const router = useRouter()
  const canGoBack = useCanGoBack()
  const { token, queryClient } = Route.useLoaderData();
  const { data } = useQuery(meQueryOptions(token))
  const { username, avatar, about }: User = data.user;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [validationErrors, setValidationErrors] = useState<FormValidationError[] | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      navigate({ to: "/users/me" });
    },
    onError: (err) => {
      if (err instanceof ValidationError) {
        setValidationErrors((err.errors))
      }
    }
  });

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const formData = new FormData(target);

    const avatarFile = formData.get("avatar") as File
    if (!avatarFile.size || !avatarFile.name.length) {
      formData.delete("avatar")
    }

    mutate({ token, formData })
  };

  const displayUrl = previewUrl || avatar;

  return (
    <div className="flex-1 flex flex-col bg-surface-primary rounded-xl overflow-hidden">
      <header className="bg-surface-elevated/80 glass border-b border-separator h-[52px] flex items-center justify-center px-4 flex-shrink-0 relative rounded-t-xl">
        <button
          onClick={() => router.history.back()}
          disabled={!canGoBack}
          className="absolute left-3 inline-flex items-center justify-center size-[32px] rounded-full text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-all duration-150 disabled:opacity-30"
          aria-label="Go back"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} size={18} strokeWidth={2.5} />
        </button>

        <h1 className="text-[0.9375rem] font-semibold text-text-primary">Edit Profile</h1>
      </header>

      <form
        className="flex-1 overflow-y-auto px-4 py-8"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto flex max-w-sm flex-col gap-6">
          <div className="flex flex-col items-center gap-3">
            <div
              className="size-32 rounded-full bg-surface-secondary overflow-hidden shadow-lg cursor-pointer relative group"
              onClick={() => fileInputRef.current?.click()}
            >
              {displayUrl ? (
                <img
                  src={displayUrl}
                  alt="Profile"
                  className="size-full object-cover"
                />
              ) : (
                <UserAvatar avatar={undefined} username={username} />
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-full flex items-center justify-center">
                <span className="text-white text-[0.8125rem] font-medium">Change</span>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              name="avatar"
              id="avatar"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <FieldErrors fieldName="avatar" validationErrors={validationErrors} />
          </div>

          <FormField name="username" label="Username" type="text" required minLength={3} maxLength={10} placeholder="johndoe123" defaultValue={username} validationErrors={validationErrors} />
          <FormField name="about" label="About" type="textarea" placeholder="Write something about yourself\u2026" maxLength={50} rows={3} defaultValue={about} validationErrors={validationErrors} />

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-accent text-white text-[0.9375rem] font-semibold py-3 rounded-full active:scale-[0.97] transition-all duration-150 disabled:opacity-50"
            >
              {isPending ? "Saving\u2026" : "Save"}
            </button>
            <button
              onClick={() => navigate({ to: "/users/me" })}
              type="button"
              className="w-full text-text-secondary text-[0.9375rem] font-medium py-3 rounded-full hover:bg-surface-secondary transition-colors duration-150"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
