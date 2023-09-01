import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export default function ModeToggler() {
    const { setTheme, theme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState('light');

    // Delay rendering any theme toggling UI until mounted on the client to be hydration safe
    useEffect(() => {
        if (theme) setCurrentTheme(theme);
    }, [theme]);

    const toggleTheme = () => {
        if (currentTheme === 'light') {
            setTheme('dark');
        } else  {
            setTheme('light');
        }
    };

    return (
        <Button variant='ghost' size='icon' onClick={toggleTheme}>
            {currentTheme === 'light' ? (
                <Sun className='w-6 h-6' aria-hidden />
            ) : (
                <Moon className='w-6 h-6' aria-hidden />
            )}
            <span className='sr-only'>Toggle dark theme</span>
        </Button>
    );
}
