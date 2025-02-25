import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/login/login.tsx"),
    route("emp","./routes/emp/dashboard/dashbard.tsx"),
    route("inventory/users","./routes/users/users.tsx"),
    route("emp/usermanagement", "./routes/emp/usermanagement/usermanagement.tsx"),
    route("/emp/usermanagement/:id", "./components/templete/emp/usermanagement/userdetail.tsx"),
    // Add more routes as needed...
] satisfies RouteConfig;
