# Redux Toolkit Shopping Cart

A small React project demonstrating Redux Toolkit state management without a UI framework or styling.

## Features

- Add products to the cart
- Increase or decrease item quantities
- Remove individual items
- Clear the cart
- Calculate total item count and price with selectors
- Persist cart data in `localStorage`

## Tech stack

- React
- Redux Toolkit
- React Redux
- Vite

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Project structure

```text
src/
├── app/
│   └── store.js
├── features/
│   └── cart/
│       └── cartSlice.js
├── App.jsx
└── main.jsx
```

## Redux Toolkit concepts demonstrated

- `configureStore()` configures the Redux store.
- `createSlice()` defines cart reducers and generates action creators.
- `useDispatch()` dispatches cart actions from React components.
- `useSelector()` reads state and derived values from the store.
- Selectors calculate item count and total price.
- A store subscription synchronizes cart updates to browser `localStorage`.

## Notes

This is a learning project, not a production checkout system. Product prices are hardcoded for demonstration. A production app should validate prices on the server and should not trust client-side totals for payments.

## Possible extensions

- Fetch products from an API with `createAsyncThunk`
- Add unit tests for cart reducers and selectors
- Add TypeScript
- Add inventory and checkout validation
