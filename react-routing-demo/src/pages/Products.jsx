import { Link, useSearchParams } from "react-router-dom";
import products from "../data/products";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>Products Page</h1>
      <input
        aria-label="Search"
        value={query}
        onChange={(e) => setSearchParams(e.target.value ? { q: e.target.value } : {})}
      />
      <ul>
        {filtered.map((p) => (
          <li key={p.id}>
            <Link to={`/products/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
