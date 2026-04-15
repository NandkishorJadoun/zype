type PasswordFieldPropType<T extends { password: string }> = {
  label: string;
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
};

export const PasswordFormField = <T extends { password: string }>({
  label,
  formData,
  setFormData,
}: PasswordFieldPropType<T>) => {
  return (
    <>
      <label htmlFor="password">
        {label}
        <span className="text-red-500">*</span>
      </label>
      <input
        type="password"
        name="password"
        required
        minLength={8}
        maxLength={20}
        placeholder="••••••••"
        className="border dark:border-slate-700 dark:bg-slate-800  rounded-xl focus:outline-2 focus:outline-blue-600 px-3 py-2.5"
        value={formData.password}
        onChange={(e) => {
          setFormData({
            ...formData,
            password: e.target.value,
          });
        }}
      />
    </>
  );
};
