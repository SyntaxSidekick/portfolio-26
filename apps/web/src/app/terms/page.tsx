import type { Metadata } from "next";
import "./legal.css";

export const metadata: Metadata = {
  title: "Terms of Use | Riad Kilani",
  description: "Riad Kilani portfolio page."
};

function TermsPageContent() {
  return (
    <main id="main-content"><h1>Terms of Use</h1><p>The content and project materials on this portfolio are provided for informational and professional evaluation purposes.</p></main>
  );
}

export default function Page() {
  return <TermsPageContent />;
}
