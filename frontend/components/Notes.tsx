import { useState, useEffect } from "react";
import { handleUpdate, handleDelete } from "@/lib/dal";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StateData {
  _id: string;
  note: string;
}

export function Notes({ user_name }: { user_name: string }) {
  const pathname = usePathname().split("/")[1];
  const [data, setData] = useState<StateData[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState("");

  function handleState(_id: string, edit: string) {
    const state = data.map((item) => {
      if (item._id === _id) {
        return { ...data, _id: _id, note: edit };
      }
      return item;
    });
    setData(state);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:8000/notes/${user_name}`,
        );
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.log(err);
        setError("Failed to Load Notes...");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (user_name != pathname) {
    return (
      <>
        <div>
          {error ? (
            <p>{error}</p>
          ) : loading ? (
            <p>Loading...</p>
          ) : (
            data.map((item) => (
              <div key={item._id}>
                <p>{item.note}</p>
              </div>
            ))
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-5 gap-5">
        {error ? (
          <p>error</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          data.map((item) => (
            <div className="flex" key={item._id}>
              <Card className="flex w-full flex-col">
                <div>
                  <CardHeader className="flex-row justify-between items-center">
                    <CardTitle>{user_name}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button style={{ margin: "0" }} variant="outline">
                          ...
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => {
                              handleDelete(item._id);
                              setData(
                                data.filter((prev) => prev._id !== item._id),
                              );
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              handleUpdate(item._id, edit);
                              handleState(item._id, edit);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <input
                            onChange={(e) => setEdit(e.target.value)}
                            value={edit}
                            placeholder="edit"
                          />
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent>
                    <p>{item.note}</p>
                  </CardContent>
                  <CardFooter></CardFooter>
                </div>
              </Card>
            </div>
          ))
        )}
      </div>
    </>
  );
}
