import { Link } from "react-router";

export const ChatHeader = ({
  username,
  backUrl,
}: {
  username: string;
  backUrl: string;
}) => {
  const profile = username[0].toUpperCase();

  return (
    <header className="border-b flex justify-center p-2 items-center relative">
      <Link to={backUrl} className="absolute right-[90%]">
        Back
      </Link>
      <div className="flex items-center gap-2">
        <div className="border w-8 h-8 rounded-[50%] flex items-center justify-center">
          {profile}
        </div>
        <p className="font-semibold">{username}</p>
      </div>
    </header>
  );
};
