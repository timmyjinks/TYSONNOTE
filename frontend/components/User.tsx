"use client";
import { handleinsert } from "@/lib/dal";
import { Notes } from "@/components/Notes";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarGroup,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function User({ user_name }: { user_name: string }) {
  const pathname = usePathname().split("/")[2];

  if (user_name != pathname) {
    return (
      <>
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader className="text-xl text-center m-5">
              Dashboard
            </SidebarHeader>
            <Separator />
            <Separator />
            <SidebarGroup>
              <SidebarContent>
                <Link
                  className="underline hover:bg-gray-500 w-[80%] pr-[15px]"
                  href="/notes/user_name/<note_group>"
                ></Link>
              </SidebarContent>
            </SidebarGroup>
          </Sidebar>
          <main className="w-full">
            <header className="flex justify-between items-center">
              <SidebarTrigger />
              <Button className="m-5" onClick={logout}>
                Logout
              </Button>
            </header>
            <div className="flex flex-col w-full">
              <div className="w-full">
                <h1 className="text-xl text-center w-full p-5">
                  {pathname} / john pork (same thing) notes
                </h1>
                <div className="p-5">
                  <Notes user_name={user_name} />
                </div>
              </div>
            </div>
          </main>
        </SidebarProvider>
      </>
    );
  }
  return (
    <>
      <SidebarProvider>
        <Sidebar className="">
          <SidebarHeader className="text-xl text-center m-5">
            Dashboard
          </SidebarHeader>
          <Separator />
          <Separator />
          <SidebarGroup>
            <SidebarContent>
              <Link
                className="underline hover:bg-gray-500 w-[80%] pr-[15px]"
                href="/notes/user_name/<note_group>"
              ></Link>
            </SidebarContent>
          </SidebarGroup>
        </Sidebar>
        <main className="w-full">
          <header className="flex justify-between items-center">
            <SidebarTrigger />
            <Button className="m-5" onClick={logout}>
              Logout
            </Button>
          </header>
          <div className="flex flex-col w-full">
            <div className="w-full">
              <h1 className="text-center text-xl">
                Welcome back! {user_name} / john pork (same thing)
              </h1>
              <div className="m-5">
                <form className="flex flex-col" action={handleinsert}>
                  <input type="hidden" name="user_name" value={user_name} />
                  <div className="flex w-1/2 m-auto">
                    <Input
                      type="file"
                      name="image"
                      accept=".jpg, .png, .jpeg"
                      required
                    />
                    <Button type="submit">Send</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="p-5">
            <Notes user_name={user_name} />
          </div>
        </main>
      </SidebarProvider>
    </>
  );
}
