import { createCategory, deleteCategory, listCategories, updateCategory } from "../api/categories";
import { TaxonomyManager } from "../components/portfolio/TaxonomyManager";
import { PageHeading } from "../components/shared/PageHeading";

export function PortfolioCategoriesPage() {
  return (
    <>
      <PageHeading title="Project Categories" description="Create, edit, and delete project categories used by portfolio projects." />
      <TaxonomyManager title="Categories" load={listCategories} create={createCategory} update={updateCategory} remove={deleteCategory} />
    </>
  );
}
