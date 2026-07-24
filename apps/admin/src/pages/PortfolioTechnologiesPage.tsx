import { TechnologiesManager } from "../components/portfolio/TechnologiesManager";
import { PageHeading } from "../components/shared/PageHeading";

export function PortfolioTechnologiesPage() {
  return (
    <>
      <PageHeading title="Technologies" description="Create, edit, and delete technology references used by portfolio projects." />
      <TechnologiesManager />
    </>
  );
}
