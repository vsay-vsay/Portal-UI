import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/login/login.tsx"),
    route("inventory","./routes/dashboard/dashboard.tsx"),
    // Add more routes as needed...
] satisfies RouteConfig;
