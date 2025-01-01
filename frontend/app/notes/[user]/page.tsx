import React from "react";
import { cookies } from "next/headers";
import { User } from "@/components/User";
import { redirect } from "next/navigation";
import { decrypt } from "@/lib/auth";

export default async function UserPage() {
  const cookie = await cookies();
  const session = cookie.get("session")?.value;
  const session_d = await decrypt(session);

  if (session_d === undefined) {
    redirect("/");
  }

  const user_name = String(session_d.user_name);

  if (user_name == undefined) {
    redirect("/");
  }

  return <User user_name={user_name} />;
}
