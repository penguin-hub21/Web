import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { Footer } from "@/components/layout/footer";
import { getFeaturedPlans } from "@/lib/products";

export default async function Home() {
  const plans = await getFeaturedPlans();
  
  return (
    <main className="min-h-screen bg-black overflow-x-hidden selection:bg-purple-500/30">
      <Navbar />
      <Hero />
      <Features />
      <Pricing plans={plans} />
      <Testimonials /> 
      <Footer />
    </main>
  );
}
