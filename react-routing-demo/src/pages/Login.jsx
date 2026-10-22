import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard";

  const handleLogin = () => {
    login("Demo User");
    navigate(from, { replace: true });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
}
