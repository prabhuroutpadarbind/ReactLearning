import { Link as RouterLink, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Alert, Button, Card, CardActions, CardContent, Chip, Grid, TextField, Typography } from "@mui/material";
import products from "../data/products";
import { addToCart } from "../features/cartSlice";

export default function Products() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {location.state?.ordered && <Alert severity="success" sx={{ mb: 3 }}>Order placed</Alert>}
      <Typography variant="h4" gutterBottom>Products</Typography>
      <TextField
        label="Search"
        fullWidth
        value={query}
        onChange={(e) => setSearchParams(e.target.value ? { q: e.target.value } : {})}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={2}>
        {filtered.map((p) => (
          <Grid item xs={12} sm={6} key={p.id}>
            <Card variant="outlined">
              <CardContent>
                <Chip label={p.category} size="small" sx={{ mb: 1 }} />
                <Typography variant="h6">{p.name}</Typography>
                <Typography color="text.secondary">${p.price}</Typography>
              </CardContent>
              <CardActions>
                <Button component={RouterLink} to={`/products/${p.id}`}>Details</Button>
                <Button variant="contained" onClick={() => dispatch(addToCart(p.id))}>Add to cart</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
