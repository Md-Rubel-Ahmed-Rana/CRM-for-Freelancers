/* eslint-disable react-hooks/exhaustive-deps */
import { IUser } from "../auth/types";
import { useGetLoggedInUserQuery } from "../auth/api";
import { useEffect } from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileHeader from "./ProfileHeader";
import Sessions from "../sessions";

type Props = {
  setName: (name: string) => void;
};

const Profile = ({ setName }: Props) => {
  const { data, isLoading } = useGetLoggedInUserQuery({});
  const user: IUser = data?.data?.user || { name: "" };

  useEffect(() => {
    if (user && user.name) {
      setName(user?.name);
    }
  }, [user]);

  return (
    <div>
      <div className="rounded-xl  bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <ProfileHeader />
        <ProfileInfo user={user} isLoading={isLoading} />
      </div>
      <hr className="my-3 text-gray-600" />
      <Sessions currentSessionId={user.session_id} />
    </div>
  );
};

export default Profile;
