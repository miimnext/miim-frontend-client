"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store"; // Adjust this import to match your store configuration
import Image from "next/image";

const Profile = () => {
  const { user, isLogin } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Loading state while fetching user data
  }

  if (!user || !isLogin) {
    return <div>You need to be logged in to view this page.</div>; // Redirect or message if no user data
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-semibold text-center">Profile</h1>
      <div className="flex items-center justify-center mt-6">
        <Image
          src={user.avatar || "/images/default-avatar.jpg"}
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-xl font-medium">{user.nickname}</h2>
        <p className="text-gray-500">{user.username}</p>
      </div>

      <div className="mt-8">
        <div className="space-y-4">
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Joined:</strong>
            {user.created_at}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
