import { Product, Profile } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
    endpoints: (builder) => ({
        // Get product list by category name.
        getProductsByCategory: builder.query<Product[], string>({
            query: (category) => {
                if (category === 'all') {
                    return '/products';
                } else {
                    return `/products/category/${category}`;
                }
            },
        }),
        // Get all the category names.
        getCategories: builder.query<string[], void>({
            query: ()=>"/products/categories"
        }),
        // Get profile information for a single user by userId. Omit username and password for security concerns.
        getProfileByUserId: builder.query<Omit<Profile, "username" | "password">, number>({
            query: (userId)=>`/users/${userId}`,
            transformResponse: (response: Profile)=>{
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {username, password, ...rest} = response;
                return rest;
            }
        }),
        /* 
            Update profile information for a single user by userId. 
            Will not have any effect since the backend is not modified. 
            Should invalidate fetching endpoints to sync the data in real world application (Skipped here).
        */
        updateProfileByUserId: builder.mutation<Partial<Profile>, {userId: number, profile: Partial<Profile>}>({
            query: ({userId, profile})=>({
                url: `/users/${userId}`,
                method: "PUT",
                body: profile,
            })
        })
    }),
});

export const { useGetProductsByCategoryQuery, useGetCategoriesQuery, useGetProfileByUserIdQuery, useUpdateProfileByUserIdMutation } = apiSlice;
