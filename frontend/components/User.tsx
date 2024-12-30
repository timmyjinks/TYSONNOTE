"use client";
import { handinsert } from "@/lib/dal";
import { Notes } from "@/components/Notes";
import { usePathname } from "next/navigation";
import { LogoutForm } from "@/components/Auth";

export function User({ user_name }: { user_name: string }) {
  const pathname = usePathname().split("/")[1];

  if (user_name != pathname) {
    return (
      <>
        <div>Welcome back! {user_name} / john pork (same thing)</div>
        <Notes user_name={user_name} />
      </>
    );
  }
  return (
    <>
      <div>Welcome back! {user_name} / john pork (same thing)</div>
      <LogoutForm />
      <div>
        <form action={handinsert}>
          <input type="file" name="image" />
          <input type="hidden" name="user_name" value={user_name} />
          <button type="submit">Send</button>
        </form>
      </div>
      <Notes user_name={user_name} />
    </>
  );
}
