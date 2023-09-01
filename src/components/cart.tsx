import { selectCurrentUserId } from '@/redux/slices/auth-slice';
import {
    decrementQuantity,
    incrementQuantity,
    removeFromCart,
    selectAllProductsInCart,
    uploadCartForCheckout,
} from '@/redux/slices/cart-slice';
import { AppDispatch, useAppDispatch, useAppSelector } from '@/redux/store';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart, Trash } from 'lucide-react';

export default function Cart() {
    // Products added to the cart
    const products = useAppSelector(selectAllProductsInCart);
    // Current userId
    const currentUserId = useAppSelector(selectCurrentUserId);

    const dispatch: AppDispatch = useAppDispatch();

    const onIncrementQuantity = (productId: number) => {
        dispatch(incrementQuantity(productId));
    };

    const onDecrementQuantity = (productId: number) => {
        dispatch(decrementQuantity(productId));
    };

    const onRemoveProduct = (productId: number) => {
        dispatch(removeFromCart(productId));
    };

    const onCheckout = () => {
        dispatch(
            uploadCartForCheckout({
                userId: currentUserId,
                date: new Date(),
                products,
            })
        );
        alert('Should proceed with payment. Clear the cart for now');
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='ghost' size='icon'>
                    <ShoppingCart className='h-6 w-6' />
                    <span className='sr-only'>Shoppong cart</span>
                </Button>
            </SheetTrigger>
            <SheetContent className='w-full sm:w-[540px]'>
                <SheetHeader>
                    <SheetTitle>Cart</SheetTitle>
                    <SheetDescription>
                        Review and manage your selections.
                    </SheetDescription>
                </SheetHeader>
                <div className='grid gap-4 py-4 h-[300px] overflow-auto'>
                    {/* List of products in cart */}
                    <ul className='space-y-4'>
                        {products.length ? (
                            products.map((product) => (
                                <li
                                    key={product.product.id}
                                    className='flex items-center gap-4'
                                >
                                    {/* Product image */}
                                    <img
                                        src={product.product.image}
                                        alt={product.product.title}
                                        className='h-16 w-16 rounded object-cover'
                                    />
                                    {/* Product details */}
                                    <div>
                                        <h3 className='max-w-[150px] text-sm line-clamp-2'>
                                            {product.product.title}
                                        </h3>
                                        <dl className='mt-0.5 space-y-px text-xs text-muted-foreground'>
                                            <div>
                                                <dt className='inline'>
                                                    Price:
                                                </dt>
                                                <dt className='inline'>
                                                    {product.product.price}
                                                </dt>
                                            </div>
                                            <div>
                                                <dt className='inline'>
                                                    Quantity:
                                                </dt>
                                                <dt className='inline'>
                                                    {product.quantity}
                                                </dt>
                                            </div>
                                        </dl>
                                    </div>
                                    {/* Actions */}
                                    <div className='flex flex-1 items-center justify-end gap-2'>
                                        {/* Increment product quantity by 1 */}
                                        <Button
                                            onClick={() => {
                                                onIncrementQuantity(
                                                    product.product.id
                                                );
                                            }}
                                            variant='ghost'
                                            size='xs'
                                            className='hover:bg-primary hover:text-primary-foreground'
                                        >
                                            <span className='sr-only'>
                                                Increment Quantity
                                            </span>
                                            <Plus className='h-4 w-4' />
                                        </Button>
                                        {/* Decrement product quantity by 1 */}
                                        <Button
                                            onClick={() => {
                                                onDecrementQuantity(
                                                    product.product.id
                                                );
                                            }}
                                            variant='ghost'
                                            size='xs'
                                            className='hover:bg-secondary hover:text-secondary-foreground'
                                        >
                                            <span className='sr-only'>
                                                Decrement Quantity
                                            </span>
                                            <Minus className='h-4 w-4' />
                                        </Button>
                                        {/* Remove product from the cart */}
                                        <Button
                                            onClick={() => {
                                                onRemoveProduct(
                                                    product.product.id
                                                );
                                            }}
                                            variant='ghost'
                                            size='xs'
                                            className='hover:bg-destructive hover:text-destructive-foreground'
                                        >
                                            <span className='sr-only'>
                                                Remove Product
                                            </span>
                                            <Trash className='h-4 w-4' />
                                        </Button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>
                                Your cart is empty. Add a product to checkout.
                            </p>
                        )}
                    </ul>
                </div>
                {/* Total price */}
                <div className='flex flex-col border-t'>
                    <div className='my-4 flex justify-between'>
                        <dt>Total</dt>
                        <dd>
                            {/* Avoid decimal point issue when dealing with numbers */}
                            {products.reduce(
                                (sum, product) =>
                                    sum +
                                    Math.round(product.product.price * 100) *
                                        product.quantity,
                                0
                            ) / 100}
                        </dd>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button
                            disabled={products.length === 0}
                            onClick={onCheckout}
                            className='w-full'
                        >
                            Check Out
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
