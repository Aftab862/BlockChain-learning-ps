"use client";
import { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetUsersListingQuery } from "@/store/slices/admin";
import { useGetConversationQuery } from "@/store/slices/message";
import ChatBox from "@/components/chat";
import { useParams } from "next/navigation";

export default function AdminChatPanel() {
  const { data: usersData } = useGetUsersListingQuery();
  const { id: paramId } = useParams();
  const { data: conversation } = useGetConversationQuery(paramId ? paramId : skipToken);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (paramId && usersData?.users?.length > 0) {
      const user = usersData.users.find((user) => user.id == paramId);
      setSelectedUser(user || null);
    }
  }, [paramId, usersData]);
  console.log("userdata", selectedUser)

  const admin = { id: 1, name: "Admin" };

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-4 bg-white">
        <ChatBox
          user={admin}
          peer={selectedUser}
          conversation={conversation || []}
        />
      </main>
    </div>
  );
}
