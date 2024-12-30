import { login, logout } from "@/lib/auth";

export function LoginForm() {
  return (
    <div>
      <form action={login}>
        <input type="text" placeholder="Username" name="user_name" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export function LogoutForm() {
  return (
    <div>
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}
