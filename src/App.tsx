import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import IndexLayout from '@/pages/layout';
import IndexPage from '@/pages/page';

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
            <RouterProvider router={router} />
        </>
    );
}

export default App;
