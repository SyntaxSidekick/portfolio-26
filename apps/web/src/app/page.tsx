import type { Metadata } from "next";
import "./home.css";
import { CapabilitiesSection } from "@/components/home/capabilities-section";
import { ContactSection } from "@/components/home/contact-section";
import { FeaturedWorkSection } from "@/components/home/featured-work-section";
import { HeroSection } from "@/components/home/hero-section";
import { LatestPostsSection } from "@/components/home/latest-posts-section";

export const metadata: Metadata = {
  title: "Riad Kilani | Senior Front-End Engineer & UX Engineer",
  description:
    "Accessible, high-performance front-end engineering, UX engineering, design systems, and digital product work.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Riad Kilani | Senior Front-End Engineer & UX Engineer",
    description:
      "Accessible, high-performance front-end engineering, UX engineering, design systems, and digital product work.",
    url: "/",
    images: [
      {
        url: "/assets/images/riad-kilani-main-profile-pic.png",
        alt: "Riad Kilani"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Riad Kilani | Senior Front-End Engineer & UX Engineer",
    description:
      "Accessible, high-performance front-end engineering, UX engineering, design systems, and digital product work.",
    images: ["/assets/images/riad-kilani-main-profile-pic.png"]
  }
};

export default function HomePage() {
  return (
    <main className="home-main" id="main-content">
      <HeroSection />
      <CapabilitiesSection />
      <FeaturedWorkSection />
      <LatestPostsSection />
      <ContactSection />
    </main>
  );
}
