import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/login/login.tsx"),
    //  Add routes for Emp
    route("emp","./routes/emp/dashboard/dashbard.tsx"),
    route("inventory/users","./routes/users/users.tsx"),
    route("emp/usermanagement", "./routes/emp/usermanagement/usermanagement.tsx"),
    route("/emp/usermanagement/:id", "./components/templete/emp/usermanagement/userdetail.tsx"),

    // Add routes for Imp
    route("imp","./routes/imp/dashboard/dashboard.tsx"),
    route("imp/usermanagement","./routes/imp/usermanagement/usermanagement.tsx"),
    route("/imp/usermanagement/:id", "./components/templete/imp/usermanagement/userdetail.tsx"),
] satisfies RouteConfig;
