import type { Route } from "../+types/home";
import  LoginTemplate  from "../../components/templete/login";
import AdminNavigation from "~/components/molecule/sidebar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "Login", content: "Welcome To Vsay Portal" },
  ];
}

export default function Dashboard() {
  return (
  <>
  <AdminNavigation>
  <div>
    <h1 className="text-red-900">Hello World</h1>
  </div>
  </AdminNavigation>
  </>
);
}