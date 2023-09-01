import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import IndexLayout from '@/pages/layout';
import IndexPage from '@/pages/page';
import { ThemeProvider } from 'next-themes';

const router = createBrowserRouter([
    {
        path: '/',
        element: <IndexLayout />,
        children: [
            {
                path: '',
                element: <IndexPage />,
            },
        ],
    },
]);

function App() {
    return (
        <>
            <ThemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
                disableTransitionOnChange
            >
                <RouterProvider router={router} />
            </ThemeProvider>
        </>
    );
}

export default App;
