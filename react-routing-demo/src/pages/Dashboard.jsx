import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <nav>
        <NavLink to="/dashboard" end>Overview</NavLink> |{" "}
        <NavLink to="/dashboard/profile">Profile</NavLink> |{" "}
        <NavLink to="/dashboard/settings">Settings</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
