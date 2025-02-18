import type { Route } from "../+types/home";
import  LoginTemplate  from "../../components/templete/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "Login", content: "Welcome To Vsay Portal" },
  ];
}

export default function Home() {
  return <LoginTemplate />;
}
