import * as React from 'react';

import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    color: string;
}

function Badge({ className, color, ...props }: BadgeProps) {
    const getBadgeColor = (color: string) => {
        switch (color) {
            case 'red':
                return 'border-transparent bg-red-100 text-red-800 hover:bg-red-800 hover:text-white';
            default:
                return 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80';
        }
    };
    return (
        <div
            className={cn(
                getBadgeColor(color),
                className,
                'inline-flex items-center rounded-full border px-2.5 md:px-3.5 py-1 text-xs md:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
            )}
            {...props}
        />
    );
}

export { Badge };
