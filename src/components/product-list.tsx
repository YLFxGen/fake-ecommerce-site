import { cn } from '@/lib/utils';
import React, { useMemo, useState } from 'react';
import { useGetProductsByCategoryQuery } from '@/redux/slices/api-slice';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CategoryFilter from '@/components/category-filter';
import ProductCard from '@/components/product-card';
import Pagination from '@/components/pagination';
import { RefreshCw } from 'lucide-react';


export default function ProductList({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    // Selected category
    const [currentCategory, setCurrentCategory] = useState('all');
    // Pagniation page
    const [currentPage, setCurrentPage] = useState(1);
    // Product number per page
    const [pageSize, setPageSize] = useState(5);

    // Fetch products by category name
    const {
        data: products,
        isLoading: isProductsLoading,
        isSuccess: isProductsSuccess,
        isError: isProductsError,
        isFetching: isProductsFetching,
    } = useGetProductsByCategoryQuery(currentCategory);

    // Update displaying products when pagination changes
    const currentPageProducts = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return products?.slice(firstPageIndex, lastPageIndex) || [];
    }, [currentPage, products, pageSize]);

    // Display different content based on rtk query results
    let content;

    if (isProductsLoading) {
        // Replace with skeleton if have time
        content = <div>is loading</div>;
    } else if (isProductsFetching) {
        // Loading animation
        content = (
            <div className='flex h-[450px] shrink-0 items-center justify-center rounded-md border-2 border-dashed mt-4'>
                <div className='mx-auto flex max-w-[300px] flex-col items-center justify-center text-center'>
                    <h2 className='text-3xl font-semibold '>Loading...</h2>
                    <p className='text-muted-foreground mt-3'>
                        Let's embark on a thrilling adventure of shopping and
                        discover the wonders together!
                    </p>
                    <RefreshCw className='animate-spin h-16 w-16 text-muted-foreground mt-5' />
                </div>
            </div>
        );
    } else if (isProductsError) {
        // Replace with fetch error page if have time
        content = <div>error</div>;
    } else if (isProductsSuccess) {
        content = (
            <>
                {/* Product list */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 '>
                    {currentPageProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                {/* Pagination */}
                <Pagination
                    className='mt-4 sm:mt-6 md:mt-10'
                    onPageChange={setCurrentPage}
                    totalNumber={products.length}
                    pageSize={pageSize}
                    siblingNumber={0}
                    currentPage={currentPage}
                />
            </>
        );
    }

    return (
        <section
            id='product-list'
            className={cn(className, 'container relative')}
        >
            {/* Section header */}
            <header className='flex flex-col'>
                <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight'>
                    Trending Products 🛍️
                </h1>
                <span className='mt-2 md:mt-3 font-normal block text-base sm:text-xl text-muted-foreground max-w-3xl mb-8 md:mb-10'>
                    Shop with us now! Perfect comfort and luxury.
                </span>
                {/* Product list toolbar */}
                <div className='flex flex-col sm:flex-row items-center justify-between'>
                    {/* Filter bar */}
                    <CategoryFilter
                        currentCategory={currentCategory}
                        onCategoryChange={setCurrentCategory}
                    />
                    {/* Page size selection */}
                    <div className='flex items-center ps-8 mt-4 sm:mt-0 space-x-2'>
                        <p className='text-sm font-medium whitespace-nowrap'>Products per page</p>
                        <Select value={`${pageSize}`} onValueChange={(value:string)=>setPageSize(Number(value))}>
                            <SelectTrigger className='h-8 w-[70px]'>
                                <SelectValue placeholder={`${pageSize}`}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        [5, 10].map((productPerPage)=>(
                                            <SelectItem key={productPerPage} value={`${productPerPage}`}>
                                                {productPerPage}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </header>
            {/* Products */}
            {content}
        </section>
    );
}
