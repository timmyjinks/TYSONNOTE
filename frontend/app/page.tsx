"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Home() {
  async function handle(formData: FormData) {
    const response = await fetch("https://api2.tysonjenkins.codes/get_note", {
      method: "POST",
      body: formData,
    });

    const data = await response.blob();
    const url = window.URL.createObjectURL(data);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "note.txt");
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }

  return (
    <div>
      <header className="flex justify-between border-b ecoration-white">
        <div className="text-xl m-5">
          <Link href="/">BITCH</Link>
        </div>
        <div>
          <Link href="/login">
            <Button className="m-5">Login</Button>
          </Link>
          <Link href="/sign_up">
            <Button className="m-5">Sign Up</Button>
          </Link>
        </div>
      </header>
      <div className="h-screen flex justify-center items-center">
        <div className="m-5 w-[80%]">
          <form className="flex flex-col" action={handle} method="POST">
            <div className="flex w-1/2 m-auto">
              <Input type="file" name="image" accept=".jpg, .png, .jpeg" />
              <Button type="submit">Send</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
