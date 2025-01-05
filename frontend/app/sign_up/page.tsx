"use client";
import { signUp } from "@/lib/auth";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const [userError, setUserError] = useState(" ");
  const [passwordError, setPasswordError] = useState(" ");
  const [confirmPasswordError, setConfirmPasswordError] = useState(" ");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div>
      <header className="p-5">
        <Link className="text-xl m-5" href="/">
          TYSONNOTE
        </Link>
      </header>
      <div className="flex justify-center items-center h-screen">
        <Card className="flex flex-col p-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const userNameRegex = /^.[a-zA-Z]*$/;
              const passwordRegex = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/;
              let validUserName = false;
              let validPassword = false;
              let validConfirmPassword = false;

              validUserName = userNameRegex.test(userName);
              if (!validUserName) {
                setUserError("Inalid username");
              } else {
                setUserError(" ");
              }

              validPassword = passwordRegex.test(password);
              if (!validPassword) {
                setPasswordError("Inalid password");
              } else {
                setPasswordError(" ");
              }

              validConfirmPassword = password === confirmPassword;
              if (!validConfirmPassword) {
                setConfirmPasswordError("Password does not match");
              } else {
                setConfirmPasswordError(" ");
              }

              console.log(validUserName);
              console.log("password: " + password);
              console.log(validPassword);
              console.log("confirm password: " + confirmPassword);
              console.log(validConfirmPassword);
              if (!validUserName || !validPassword || !validConfirmPassword) {
                return;
              }

              const formData = new FormData(e.currentTarget);
              signUp(formData);
            }}
          >
            <CardHeader>Sign Up</CardHeader>
            <CardContent className="flex flex-col m-5 text-black">
              <input
                className="py-3 pr-[10px] outline outline-1 outline-black"
                type="text"
                placeholder="Username"
                name="user_name"
                onChange={(e) => {
                  setUserName(e.currentTarget.value);
                }}
              />
              <p className="text-red-500">{userError}</p>
              <input
                className="mt-5 py-3 pr-[500px] outline outline-1 outline-black"
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
              />
              <p className="text-red-500">{passwordError}</p>
              <input
                className="mt-5 py-3 pr-[500px] outline outline-1 outline-black"
                type="password"
                placeholder="Confirm Password"
                name="test"
                onChange={(e) => {
                  setConfirmPassword(e.currentTarget.value);
                }}
              />
              <p className="text-red-500">{confirmPasswordError}</p>
              <Button className="mt-5" type="submit">
                Sign Up
              </Button>
            </CardContent>
            <CardFooter className="flex justify-end items-center">
              <Link href="/login">Already have an account?</Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
