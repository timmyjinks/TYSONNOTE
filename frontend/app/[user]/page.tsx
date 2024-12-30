import React from "react";
import { cookies } from "next/headers";
import { User } from "@/components/User";
import { redirect } from "next/navigation";

export default async function UserPage() {
  const cookie = await cookies();
  const auth = cookie.get("authenticated")?.value;
  const user_name = cookie.get("user_name")?.value;

  if (auth != "true" || user_name == undefined) {
    redirect("/");
  }

  return <User user_name={user_name} />;
}
