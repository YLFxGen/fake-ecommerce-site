import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AppDispatch, useAppDispatch } from '@/redux/store';
import { addToCart } from '@/redux/slices/cart-slice';
import { Product } from '@/types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const dispatch: AppDispatch = useAppDispatch();

    const onAddClick = (product:Product)=>{
        dispatch(addToCart(product));
    }

    return (
        <div
            className='flex flex-col justify-between relative group h-full'
        >
            <div>
                {/* Product category */}
                <Badge
                    color='red'
                    className='absolute start-4 top-4 z-10 border'
                >
                    {product.category}
                </Badge>
                {/* Product image */}
                <img
                    src={product.image}
                    alt=''
                    className='h-[350px] w-full object-cover sm:h-[450px]'
                />
                {/* Product details */}
                <div className='mt-3 flex justify-between text-sm'>
                    <div>
                        <h3 className='group-hover:underline group-hover:underline-offset-4 line-clamp-1'>
                            {product.title}
                        </h3>

                        <p className='mt-1.5 max-w-[45ch] text-xs text-muted-foreground line-clamp-3'>
                            {product.description}
                        </p>
                    </div>

                    <p>{product.price}</p>
                </div>
            </div>

            <Button className='w-full mt-3' onClick={()=>onAddClick(product)}>Add to Cart</Button>
        </div>
    );
}