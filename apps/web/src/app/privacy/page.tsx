import type { Metadata } from "next";
import "@/styles/pages/legal/index.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Riad Kilani",
  description: "Riad Kilani portfolio page."
};

function PrivacyPageContent() {
  return (
    <main id="main-content"><h1>Privacy Policy</h1><p>This portfolio does not intentionally collect personal information beyond information voluntarily submitted through direct contact.</p></main>
  );
}

export default function Page() {
  return <PrivacyPageContent />;
}
