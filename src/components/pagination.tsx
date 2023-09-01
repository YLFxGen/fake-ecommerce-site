import { DOTS, usePagination } from '@/hooks/use-pagination';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HTMLAttributes, useEffect } from 'react'
import { Button } from '@/components/ui/button';

interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
    onPageChange: (_: number) => void,
    totalNumber: number,
    pageSize: number
    siblingNumber?: number,
    currentPage: number,
}

export default function Pagination({
    onPageChange, totalNumber, pageSize, siblingNumber = 1, currentPage, className
}: PaginationProps) {
    // Values to ve displayed in pagination
    const paginationRange = usePagination({
        totalNumber,
        pageSize,
        siblingNumber,
        currentPage,
    });

    useEffect(() => {
        const totalPageNumber = Math.ceil(totalNumber / pageSize);
        if (currentPage > totalPageNumber) {
            onPageChange(totalPageNumber);
        }
    }, [totalNumber, pageSize, currentPage, onPageChange]);

    // Hide pagination when not needed
    if (currentPage <= 0 || paginationRange.length < 2) {
        return null;
    }

    const lastPage = paginationRange[paginationRange.length - 1];
    
    const onNextPage = () => {
        if (currentPage < lastPage) {
            onPageChange(currentPage + 1);
        }
    };

    const onPrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };



    return (
        <div className={cn(className, "flex justify-center gap-1 text-xs font-medium")}>
            {/* Prev button */}
            <Button size="icon" onClick={onPrevPage} variant="outline" disabled={currentPage === 1}>
                <span className="sr-only">Prev Page</span>
                <ChevronLeft className="h-3 w-3" />
            </Button>
            {/* Pages */}
            <div className='flex sm:space-x-2'>
                {paginationRange.map((pageNumber, idx) => {
                    if (pageNumber === DOTS) {
                        return <Button key={`${pageNumber}-${idx}`} size="icon" variant="outline">
                            &#8230;
                        </Button>
                    } else {
                        return <Button onClick={() => onPageChange(pageNumber)} key={`${pageNumber}-${idx}`} size="icon" variant={currentPage === pageNumber ? "default" : "outline"}>
                            {pageNumber}
                        </Button>
                    }
                })}
            </div>
            {/* Next button */}
            <Button size="icon" onClick={onNextPage} variant="outline" disabled={currentPage === lastPage}>
                <span className="sr-only">Next Page</span>
                <ChevronRight className="h-3 w-3" />
            </Button>
        </div>
    )
}