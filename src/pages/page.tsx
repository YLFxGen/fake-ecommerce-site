import HeroSection from "@/components/hero-section";
import ProductList from "@/components/product-list";

export default function IndexPage() {
    return (
        <>
            <HeroSection className='pt-16 lg:pt-28' />
            <ProductList className='pt-16 lg:py-28'/>
        </>
    );
}
