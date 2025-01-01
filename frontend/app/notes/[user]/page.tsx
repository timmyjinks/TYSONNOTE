import React from "react";
import { cookies } from "next/headers";
import { User } from "@/components/User";
import { redirect } from "next/navigation";

export default async function UserPage() {
  const cookie = await cookies();
  const user_name = cookie.get("user_name")?.value;

  if (user_name == undefined) {
    redirect("/");
  }

  return <User user_name={user_name} />;
}
