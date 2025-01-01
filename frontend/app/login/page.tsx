"use client";
import { login } from "@/lib/auth";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
  return (
    <div>
      <header className="p-5">
        <Link className="text-xl m-5" href="/">
          BITCH
        </Link>
      </header>
      <div className="flex justify-center items-center h-screen">
        <Card className="flex flex-col p-10">
          <form
            action={login}
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              login(formData);
            }}
          >
            <CardHeader>Login</CardHeader>
            <CardContent className="flex flex-col m-5">
              <input
                className="text-black mb-5 py-3 pr-[10px] outline outline-1 outline-black"
                type="text"
                placeholder="Username"
                name="user_name"
              />
              <input
                className="text-black mb-5 py-3 pr-[500px] outline outline-1 outline-black"
                type="password"
                placeholder="Password"
                name="password"
              />
              <Button type="submit">Login</Button>
            </CardContent>
            <CardFooter className="flex justify-end items-center">
              <Link href="/sign_up">Don$apost have an account?</Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
