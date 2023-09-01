import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { useGetCategoriesQuery } from '@/redux/slices/api-slice';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps extends HTMLAttributes<HTMLDivElement> {
    onCategoryChange: (_: string) => void;
    currentCategory: string
}

export default function CategoryFilter({
    className,
    onCategoryChange,
    currentCategory
}: CategoryFilterProps) {

    // Fetch all the category names
    const {
        data: categories,
        isLoading,
        isSuccess,
    } = useGetCategoriesQuery();

    if(isLoading){
        return null;
    }

    return (
        isSuccess && 
        <div className={cn('flex overflow-x-auto space-x-2 w-full', className)}>
            {/* Display a list of available categories */}
            <Button
                onClick={() => onCategoryChange('all')}
                size='lg'
                variant={currentCategory === 'all' ? 'greyscale' : 'ghost'}
                className='flex-shrink-0'
            >
                All
            </Button>
            {categories?.map((category) => (
                <Button
                    onClick={() => onCategoryChange(category)}
                    key={category}
                    size='lg'
                    variant={
                        currentCategory === category ? 'greyscale' : 'ghost'
                    }
                    className='flex-shrink-0'
                >
                    {category}
                </Button>
            ))}
        </div>
    );
}
