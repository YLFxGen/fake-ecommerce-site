import { siteConfig } from '@/configs/site-config';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ModeToggler from '@/components/mode-toggler';
import { User } from 'lucide-react';

export default function SiteHeader() {
    return (
        <header className='backdrop-blur sticky top-0 z-50 w-full bg-card border-b'>
            <div className='container h-20 flex items-center justify-between'>
                <NavLink to='/'>
                    <h3 className='font-medium text-xl sm:text-2xl md:text-3xl font-bangers tracking-wider leading-none'>
                        {siteConfig.metaData.title}
                    </h3>
                </NavLink>
                <nav className='flex items-center'>
                    <NavLink to='/profile'>
                        <Button variant='ghost' size='icon'>
                            <User className='h-6 w-6' />
                            <span className='sr-only'>User</span>
                        </Button>
                    </NavLink>
                    <ModeToggler />
                </nav>
            </div>
        </header>
    );
}