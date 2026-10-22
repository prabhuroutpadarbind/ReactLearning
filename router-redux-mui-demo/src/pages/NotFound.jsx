import { Link as RouterLink } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Stack spacing={2} alignItems="flex-start">
      <Typography variant="h4">Page not found</Typography>
      <Button variant="contained" component={RouterLink} to="/products">Back to products</Button>
    </Stack>
  );
}
