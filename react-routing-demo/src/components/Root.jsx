import { Outlet } from "react-router-dom";
import { AuthProvider } from "../auth";

export default function Root() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
