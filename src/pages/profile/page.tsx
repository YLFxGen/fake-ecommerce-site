import EditProfileForm from '@/components/edit-profile-form';

export default function ProfilePage() {
    return (
        <section className='container relative'>
            {/* Section header */}
            <header className='flex justify-center items-center pt-8 flex-col'>
                <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight'>
                    User Profile 👤
                </h1>
                <span className='mt-2 md:mt-3 font-normal block text-base sm:text-xl text-muted-foreground max-w-3xl mb-8 md:mb-10'>
                    Update your profile with the latest information.
                </span>
            </header>
            <EditProfileForm className='pb-8' />
        </section>
    );
}
