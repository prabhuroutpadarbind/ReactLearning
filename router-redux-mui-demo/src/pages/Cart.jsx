import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { addToCart, decrementItem, removeFromCart, selectCartLines, selectCartTotal } from "../features/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const lines = useSelector(selectCartLines);
  const total = useSelector(selectCartTotal);

  if (lines.length === 0) {
    return (
      <Stack spacing={2} alignItems="flex-start">
        <Typography variant="h4">Your cart is empty</Typography>
        <Button variant="contained" component={RouterLink} to="/products">Browse products</Button>
      </Stack>
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>Cart</Typography>
      <List>
        {lines.map((l) => (
          <ListItem key={l.id} divider disableGutters>
            <ListItemText primary={l.name} secondary={`$${l.price} each`} />
            <IconButton aria-label={`Decrease ${l.name}`} onClick={() => dispatch(decrementItem(l.id))}><RemoveIcon /></IconButton>
            <Typography sx={{ minWidth: 24, textAlign: "center" }}>{l.qty}</Typography>
            <IconButton aria-label={`Increase ${l.name}`} onClick={() => dispatch(addToCart(l.id))}><AddIcon /></IconButton>
            <IconButton aria-label={`Remove ${l.name}`} onClick={() => dispatch(removeFromCart(l.id))}><DeleteIcon /></IconButton>
          </ListItem>
        ))}
      </List>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
        <Typography variant="h6">Total: ${total}</Typography>
        <Button variant="contained" component={RouterLink} to="/checkout">Checkout</Button>
      </Stack>
    </>
  );
}
