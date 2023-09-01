import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '@/components/ui/button';
import ecommerceIllustration from '@/assets/Person with laptop using online app for ordering food.png';

export default function HeroSection({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <section className={cn('container relative', className)}>
            <div className='relative flex flex-col lg:flex-row items-center'>
                <div className='flex-shrink-0 mb-14 lg:mb-0 lg:me-10 lg:w-2/5'>
                    <h2 className='font-bold text-4xl'>
                        Discover Excitement 🎉
                    </h2>
                    <span className='block mt-6 text-muted-foreground text-lg leading-8'>
                        Embark on a journey of elegance and style with our
                        curated collection. Experience the perfect blend of
                        comfort and luxury that speaks to your unique taste.
                        Your satisfaction is our priority.
                    </span>
                    <a href='#product-list'>
                        <Button size='xl' className='mt-5'>
                            Start Exploring
                        </Button>
                    </a>
                </div>
                <div className='flex-grow'>
                    <img
                        alt='e-commerce illustration'
                        sizes='(max-width: 768px) 100vw, 50vw'
                        src={ecommerceIllustration}
                    />
                </div>
            </div>
        </section>
    );
}
