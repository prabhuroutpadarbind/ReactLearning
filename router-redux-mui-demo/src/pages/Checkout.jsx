import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Stack, Typography } from "@mui/material";
import { clearCart, selectCartCount, selectCartTotal } from "../features/cartSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);

  if (count === 0) {
    return <Navigate to="/cart" replace />;
  }

  const placeOrder = () => {
    dispatch(clearCart());
    navigate("/products", { state: { ordered: true } });
  };

  return (
    <Stack spacing={2} alignItems="flex-start">
      <Typography variant="h4">Checkout</Typography>
      <Typography>{count} items, total ${total}</Typography>
      <Button variant="contained" onClick={placeOrder}>Place order</Button>
    </Stack>
  );
}
