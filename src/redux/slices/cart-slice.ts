import { Product, ProductInCart } from '@/types';
import {
    PayloadAction,
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

const productsInCartAdapter = createEntityAdapter<ProductInCart>({
    selectId: (productInCart) => productInCart.product.id,
    sortComparer: (a, b) => a.product.title.localeCompare(b.product.title),
});

// Illustration purpose. Nothing is updated in the backend.
export const uploadCartForCheckout = createAsyncThunk<
    void,
    {
        userId: number;
        date: Date;
        products: ProductInCart[];
    },
    { rejectValue: string }
>(
    'carts/uploadCartForCheckout',
    async ({ userId, date, products }, thunkAPI) => {
        try {
            await fetch('https://fakestoreapi.com/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    date,
                    products: products.map((product) => ({
                        productId: product.product.id,
                        quantity: product.quantity,
                    })),
                }),
            })
                .then((res) => res.json())
                .then((json) => console.log(json));
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to upload cart.');
        }
    }
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState: productsInCartAdapter.getInitialState(),
    reducers: {
        // Add product to cart
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingProductInCart = state.entities[action.payload.id];
            // Increment quantity if existing
            if (existingProductInCart) {
                existingProductInCart.quantity++;
            } else {
                productsInCartAdapter.addOne(state, {
                    product: action.payload,
                    quantity: 1,
                });
            }
        },
        // Increment product quantity by 1
        incrementQuantity: (state, action: PayloadAction<number>) => {
            const existingProductInCart = state.entities[action.payload];
            existingProductInCart && existingProductInCart.quantity++;
        },
        // Decrement product quantity by 1
        decrementQuantity: (state, action: PayloadAction<number>) => {
            const existingProductInCart = state.entities[action.payload];
            if(existingProductInCart && existingProductInCart.quantity > 1){
                existingProductInCart.quantity--;
            }
        },
        // Remove product from the cart
        removeFromCart: (state, action: PayloadAction<number>) => {
            productsInCartAdapter.removeOne(state,action.payload);
        }
    },
    extraReducers(builder){
        // After checkout, clear the current cart
        builder.addCase(uploadCartForCheckout.fulfilled, productsInCartAdapter.removeAll);
    }
});

export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
} = cartSlice.actions;

export const {selectAll: selectAllProductsInCart} = productsInCartAdapter.getSelectors((state: RootState)=>state.cart);
export default cartSlice.reducer;
