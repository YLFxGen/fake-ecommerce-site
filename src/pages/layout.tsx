import { Outlet } from 'react-router-dom';

export default function IndexLayout() {
    return (
        <div className='relative flex min-h-screen flex-col'>
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    );
}
