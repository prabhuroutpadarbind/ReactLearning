import { Link as RouterLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Badge, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { logout } from "../features/authSlice";
import { selectCartCount } from "../features/cartSlice";

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const count = useSelector(selectCartCount);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/products");
  };

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component={RouterLink} to="/products" color="inherit" sx={{ textDecoration: "none", flexGrow: 1 }}>
            Deskware
          </Typography>
          {user && <Typography sx={{ mr: 2 }}>Hi, {user}</Typography>}
          <IconButton color="inherit" component={RouterLink} to="/cart" aria-label="Cart">
            <Badge badgeContent={count} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {user ? (
            <Button color="inherit" onClick={handleLogout}>Log out</Button>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">Log in</Button>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
}
