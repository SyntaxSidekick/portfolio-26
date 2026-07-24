import { FormPanel } from "../components/shared/FormPanel";
import { PageHeading } from "../components/shared/PageHeading";
import { galleries } from "../data/mockData";

export function GalleriesPage() {
  return (
    <>
      <PageHeading title="Galleries" description="Prepare image ordering, featured image selection, captions, alt text, and layout choices." />
      <section className="dashboard-grid secondary-grid">
        {galleries.map((gallery) => (
          <article className="panel gallery-panel" key={gallery.id}>
            <div className="panel-header">
              <h2>{gallery.title}</h2>
              <span className="tag green-tag">{gallery.status}</span>
            </div>
            <div className="gallery-preview">
              {gallery.images.map((image) => (
                <div className="gallery-tile" key={image.id}>
                  <span>{image.order}</span>
                  <strong>{image.title}</strong>
                  <small>{image.caption}</small>
                </div>
              ))}
            </div>
            <div className="upload-drop">Multiple image upload area</div>
          </article>
        ))}
        <FormPanel title="Gallery settings" fields={["Layout", "Draft or published state", "Alt text", "Caption"]} />
      </section>
    </>
  );
}
