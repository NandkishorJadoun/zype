type EmailFieldPropType<T extends { email: string }> = {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
};

export const EmailFormField = <T extends { email: string }>({
  formData,
  setFormData,
}: EmailFieldPropType<T>) => {
  return (
    <>
      <label htmlFor="email">
        Email Address<span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        name="email"
        id="email"
        required
        placeholder="johndoe@example.com"
        className="border dark:border-slate-700 dark:bg-slate-800  rounded-xl focus:outline-2 focus:outline-blue-600 px-3 py-2.5"
        value={formData.email}
        onChange={(e) => {
          setFormData({
            ...formData,
            email: e.target.value,
          });
        }}
      />
    </>
  );
};
