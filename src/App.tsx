import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import IndexLayout from '@/pages/layout';
import IndexPage from '@/pages/page';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import ProfilePage from '@/pages/profile/page';

const router = createBrowserRouter([
    {
        path: '/',
        element: <IndexLayout />,
        children: [
            {
                path: '',
                element: <IndexPage />,
            },
            {
                path: '/profile',
                element: <ProfilePage />,
            },
        ],
    },
]);

function App() {
    return (
        <>
            <Provider store={store}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                    disableTransitionOnChange
                >
                    <RouterProvider router={router} />
                </ThemeProvider>
            </Provider>
        </>
    );
}

export default App;
