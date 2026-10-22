import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { login } from "../features/authSlice";

export default function Login() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/products";

  const handleLogin = () => {
    dispatch(login(name.trim()));
    navigate(from, { replace: true });
  };

  return (
    <Stack spacing={2} sx={{ maxWidth: 320 }}>
      <Typography variant="h4">Log in</Typography>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Button variant="contained" disabled={!name.trim()} onClick={handleLogin}>Log in</Button>
    </Stack>
  );
}
