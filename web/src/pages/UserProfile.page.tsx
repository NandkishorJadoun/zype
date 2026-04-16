import { useLoaderData, Link, useNavigate } from "react-router";
import type { User } from "../types";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const user: User = useLoaderData();

  return (
    <>
      <header>
        <header className="border-b flex justify-center p-2 items-center relative">
          <Link
            to={"#"}
            onClick={() => navigate(-1)}
            className="absolute right-[90%]"
          >
            Back
          </Link>
          <div className="flex items-center gap-2">About</div>
        </header>
      </header>
      <div>
        <p>Username: {user.username}</p>
      </div>
    </>
  );
};

export default UserProfilePage;
