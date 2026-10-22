import { Link as RouterLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Chip, Stack, Typography } from "@mui/material";
import products from "../data/products";
import { addToCart } from "../features/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <Typography variant="h5">Product not found</Typography>;
  }

  return (
    <Stack spacing={2} alignItems="flex-start">
      <Chip label={product.category} size="small" />
      <Typography variant="h4">{product.name}</Typography>
      <Typography>{product.description}</Typography>
      <Typography variant="h6">${product.price}</Typography>
      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={() => dispatch(addToCart(product.id))}>Add to cart</Button>
        <Button component={RouterLink} to="/products">Back to products</Button>
      </Stack>
    </Stack>
  );
}
