import {
    useGetProfileByUserIdQuery,
    useUpdateProfileByUserIdMutation,
} from '@/redux/slices/api-slice';
import { selectCurrentUserId } from '@/redux/slices/auth-slice';
import { useAppSelector } from '@/redux/store';
import { Profile } from '@/types';
import { Field, Form, Formik, FormikHelpers, getIn } from 'formik';
import { HTMLAttributes, useState } from 'react';
import * as Yup from 'yup';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Validation schema
const EditProfileSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    name: Yup.object().shape({
        firstname: Yup.string().required('Required'),
        lastname: Yup.string().required('Required'),
    }),
    address: Yup.object().shape({
        city: Yup.string().required('Required'),
        street: Yup.string().required('Required'),
        number: Yup.number().required('Required'),
        zipcode: Yup.string().required('Required'),
        geolocation: Yup.object().shape({
            lat: Yup.string().required('Required'),
            long: Yup.string().required('Required'),
        }),
    }),
    // Could use regex for further validation.
    phone: Yup.string().required('Required'),
});

export default function EditProfileForm({
    className,
}: HTMLAttributes<HTMLDivElement>) {
    // Form success/error message
    const [message, setMessage] = useState('');
    // Current userId
    const currentUserId = useAppSelector(selectCurrentUserId);
    // Fetch profile by userId
    const {
        data: profile,
        isLoading,
        isSuccess,
        isError,
        isFetching,
    } = useGetProfileByUserIdQuery(currentUserId);
    // Update profile on form submission (No effect as the backend is not modified)
    const [updateProfile] = useUpdateProfileByUserIdMutation();

    let content;

    const onUpdateProfile = async (profile: Partial<Profile>) => {
        try {
            await updateProfile({
                userId: currentUserId,
                profile: profile,
            }).unwrap();
            console.log();
        } catch (err) {
            console.error('Failed to update the profile: ', err);
        }
    };

    if (isLoading) {
        content = <div>IsLoading</div>;
    } else if (isSuccess) {
        content = (
            <Formik
                // Use fetched data for initial data assignment
                initialValues={{
                    email: profile.email,
                    name: {
                        firstname: profile.name.firstname,
                        lastname: profile.name.lastname,
                    },
                    address: {
                        city: profile.address.city,
                        street: profile.address.street,
                        number: profile.address.number,
                        zipcode: profile.address.zipcode,
                        geolocation: {
                            lat: profile.address.geolocation.lat,
                            long: profile.address.geolocation.long,
                        },
                    },
                    phone: profile.phone,
                }}
                validationSchema={EditProfileSchema}
                onSubmit={(
                    values: Partial<Profile>,
                    { setSubmitting }: FormikHelpers<Partial<Profile>>
                ) => {
                    onUpdateProfile(values);
                    setSubmitting(false);
                    setMessage('Profile updated');
                }}
            >
                {({ errors, touched }) => (
                    <Form
                        className={cn(
                            className,
                            'flex flex-col items-center justify-center space-y-2'
                        )}
                    >
                        {/* Email */}
                        <div className='grid w-full max-w-sm items-center gap-1.5'>
                            <Label htmlFor='email'>Email</Label>
                            <Field
                                as={Input}
                                id='email'
                                name='email'
                                placeholder='email'
                                className='mt-2'
                            />
                            {errors.email && touched.email ? (
                                <div className='text-destructive text-xs'>
                                    {errors.email}
                                </div>
                            ) : null}
                        </div>
                        {/* Firstname */}
                        <div className='grid w-full max-w-sm items-center gap-1.5'>
                            <Label htmlFor='firstname'>First Name</Label>
                            <Field
                                as={Input}
                                id='firstname'
                                name='name.firstname'
                                placeholder='firstName'
                            />

                            {getIn(errors, 'name.firstname') &&
                            getIn(touched, 'name.firstname') ? (
                                <div className='text-destructive text-xs'>
                                    {getIn(errors, 'name.firstname')}
                                </div>
                            ) : null}
                        </div>
                        {/* Lastname */}
                        <div className='grid w-full max-w-sm items-center gap-1.5'>
                            <Label htmlFor='lastname'>Last Name</Label>
                            <Field
                                as={Input}
                                id='lastname'
                                name='name.lastname'
                                placeholder='lastname'
                            />

                            {getIn(errors, 'name.lastname') &&
                            getIn(touched, 'name.lastname') ? (
                                <div className='text-destructive text-sm mt-0.5'>
                                    {getIn(errors, 'name.lastname')}
                                </div>
                            ) : null}
                        </div>
                        {/* City */}
                        <div className='grid w-full max-w-sm items-center gap-1.5'>
                            <Label htmlFor='city'>City</Label>
                            <Field
                                as={Input}
                                id='city'
                                name='address.city'
                                placeholder='city'
                            />

                            {getIn(errors, 'address.city') &&
                            getIn(touched, 'address.city') ? (
                                <div className='text-destructive text-sm mt-0.5'>
                                    {getIn(errors, 'address.city')}
                                </div>
                            ) : null}
                        </div>
                        {/* Street */}
                        <div className='grid w-full max-w-sm items-center gap-1.5'>
                            <Label htmlFor='street'>Street</Label>
                            <Field
                                as={Input}
                                id='street'
                                name='address.street'
                                placeholder='street'
                            />

                            {getIn(errors, 'address.street') &&
                            getIn(touched, 'address.street') ? (
                                <div className='text-destructive text-sm mt-0.5'>
                                    {getIn(errors, 'address.street')}
                                </div>
                            ) : null}
                        </div>
                        {/* Number */}
                        <div className='grid w-full max-w-sm items-center gap-1.5'>
                            <Label htmlFor='number'>Number</Label>
                            <Field
                                as={Input}
                                id='number'
                                name='address.number'
                                placeholder='number'
                            />

                            {getIn(errors, 'address.number') &&
                            getIn(touched, 'address.number') ? (
                                <div className='text-destructive text-sm mt-0.5'>
                                    {getIn(errors, 'address.number')}
                                </div>
                            ) : null}
                        </div>
                        {/* Zipcode */}
                        <div className='grid w-full max-w-sm items-center gap-1.5'>
                            <Label htmlFor='zipcode'>Zipcode</Label>
                            <Field
                                as={Input}
                                id='zipcode'
                                name='address.zipcode'
                                placeholder='zipcode'
                            />

                            {getIn(errors, 'address.zipcode') &&
                            getIn(touched, 'address.zipcode') ? (
                                <div className='text-destructive text-sm mt-0.5'>
                                    {getIn(errors, 'address.zipcode')}
                                </div>
                            ) : null}
                        </div>
                        {/* Phone */}
                        <div className='grid w-full max-w-sm items-center gap-1.5'>
                            <Label htmlFor='phone'>Phone</Label>
                            <Field
                                as={Input}
                                id='phone'
                                name='phone'
                                placeholder='phone'
                            />

                            {errors.phone && touched.phone ? (
                                <div className='text-destructive text-xs'>
                                    {errors.phone}
                                </div>
                            ) : null}
                        </div>
                        {/* Edit submission button */}
                        <span style={{ color: 'green' }}>{message}</span>
                        <div>
                            <Button className='w-full' type='submit'>
                                Update Profile
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    } else if (isError) {
        // Replace with proper error screen
        content = <div>error fetching</div>;
    } else if (isFetching) {
        // Replace with proper fetching animation
        content = <div>is fetching...</div>;
    }

    return <>{content}</>;
}
