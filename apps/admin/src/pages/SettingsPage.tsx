import { FormPanel } from "../components/shared/FormPanel";
import { PageHeading } from "../components/shared/PageHeading";

export function SettingsPage() {
  return (
    <>
      <PageHeading title="Settings" description="Private admin preferences for the standalone Vite application." />
      <FormPanel title="Dashboard settings" fields={["Site title", "Admin email", "Default project status", "Default gallery layout"]} />
    </>
  );
}
