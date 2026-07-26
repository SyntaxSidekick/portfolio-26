import { useMemo, useState } from "react";
import { BookOpen, ExternalLink, GitBranch, Link2, Monitor, Palette, PlayCircle, Smartphone } from "lucide-react";
import type { CaseStudySectionKey, CategoryReference, TechnologyReference } from "../../../types/admin";
import { TechnologyIcon } from "../../../lib/technologyIcons";
import type { ProjectFormValues } from "../ProjectForm";
import type { ProjectEditorStepKey } from "./projectEditorConfig";
import { getCaseStudyIcon } from "./caseStudyIconRegistry";
import { coerceMetricType, getMetricPreset, metricAccentClass } from "./metricIconRegistry";
import { buildProjectLinkRows, canonicalLinkTypeForSlot } from "./projectLinksConfig";

function iconForLinkType(type: ReturnType<typeof buildProjectLinkRows>[number]["type"]) {
  if (type === "live-project") return ExternalLink;
  if (type === "github-repository") return GitBranch;
  if (type === "documentation") return BookOpen;
  if (type === "figma-design-file") return Palette;
  if (type === "video") return PlayCircle;
  return Link2;
}

function projectLinkLabel(projectType: ProjectFormValues["projectType"]) {
  if (projectType === "github") return "View Repository";
  if (projectType === "design") return "View Design";
  if (projectType === "codepen") return "View Experiment";
  return "View Case Study";
}

function sectionHeading(values: ProjectFormValues, section: CaseStudySectionKey) {
  if (section === "overview") return values.overviewHeading.trim() || "Overview";
  if (section === "challenge") return values.challengeHeading.trim() || "The Challenge";
  if (section === "solution") return values.solutionHeading.trim() || "The Solution";
  if (section === "key-results") return "Key Results";
  return "Lessons Learned";
}

function sectionExcerpt(values: ProjectFormValues, section: CaseStudySectionKey) {
  if (section === "overview") return values.overviewContent.trim();
  if (section === "challenge") return values.challengeContent.trim();
  if (section === "solution") return values.solutionContent.trim();
  if (section === "lessons-learned") {
    return values.highlights.find((item) => item.text.trim())?.text.trim() || "Add lessons learned for this project.";
  }
  return "";
}

function keyResultRows(values: ProjectFormValues) {
  return values.keyResults
    .filter((item) => item.label.trim() && item.value.trim())
    .sort((a, b) => {
      const left = typeof a.order === "number" ? a.order : typeof a.displayOrder === "number" ? a.displayOrder : 0;
      const right = typeof b.order === "number" ? b.order : typeof b.displayOrder === "number" ? b.displayOrder : 0;
      return left - right;
    })
    .slice(0, 4);
}

function caseStudyRows(values: ProjectFormValues, sectionOrder: CaseStudySectionKey[]) {
  return sectionOrder
    .filter((section) => section !== "overview" && section !== "key-results")
    .map((section) => ({
      key: section,
      heading: sectionHeading(values, section),
      excerpt: sectionExcerpt(values, section),
    }));
}

function previewMetricRows(values: ProjectFormValues) {
  return keyResultRows(values).map((item, index) => ({
    id: item.id,
    type: coerceMetricType(item.type, item.iconKey),
    label: item.label,
    value: item.value,
    order: typeof item.order === "number" ? item.order : typeof item.displayOrder === "number" ? item.displayOrder : index,
  }));
}

export function ProjectLivePreview({
  values,
  categories,
  technologies,
  activeStep,
  caseStudySectionOrder,
}: {
  values: ProjectFormValues;
  categories: CategoryReference[];
  technologies: TechnologyReference[];
  activeStep?: ProjectEditorStepKey;
  caseStudySectionOrder: CaseStudySectionKey[];
}) {
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  const categoryMap = useMemo(() => new Map(categories.map((category) => [category.id, category.name])), [categories]);
  const firstCategory = values.categories.map((id) => categoryMap.get(id)).find((item): item is string => Boolean(item));
  const selectedTechnologies = technologies.filter((technology) => values.technologies.includes(technology.id)).slice(0, 5);
  const previewImage = values.desktopImageUrl || values.cardImageUrl || values.featuredImageUrl || values.mobileImageUrl;

  const rows = useMemo(() => caseStudyRows(values, caseStudySectionOrder), [caseStudySectionOrder, values]);
  const metrics = useMemo(() => previewMetricRows(values), [values]);
  const linkRows = useMemo(
    () => buildProjectLinkRows(values, {
      projectUrl: canonicalLinkTypeForSlot("projectUrl"),
      repositoryUrl: canonicalLinkTypeForSlot("repositoryUrl"),
      codepenUrl: canonicalLinkTypeForSlot("codepenUrl"),
      caseStudyUrl: canonicalLinkTypeForSlot("caseStudyUrl"),
    }).filter((row) => row.visible),
    [values],
  );
  const gallery = useMemo(() => values.gallery.filter((image) => Boolean(image.url?.trim())), [values.gallery]);
  const galleryCover = useMemo(
    () => gallery.find((image) => image.isFeatured) ?? gallery[0],
    [gallery],
  );

  const isCaseStudyPreview = activeStep === "case-study";
  const isGalleryPreview = activeStep === "gallery";
  const isLinksPreview = activeStep === "links";

  return (
    <section className="live-preview panel" aria-labelledby="live-preview-heading">
      <header className="live-preview-header panel-header">
        <div>
          <h2 id="live-preview-heading">{isGalleryPreview ? "Live Gallery Preview" : isCaseStudyPreview ? "Live Case Study Preview" : isLinksPreview ? "Live Links Preview" : "Live Preview"}</h2>
          <p>{isGalleryPreview ? "This is how your gallery appears on the public page." : isCaseStudyPreview ? "This is how your case study appears on the public page." : isLinksPreview ? "This is how project links appear on the public page." : "See how your project looks to visitors."}</p>
        </div>
        <div className="preview-mode-switch" role="group" aria-label="Preview viewport mode">
          <button type="button" className={previewMode === "desktop" ? "is-active" : ""} onClick={() => setPreviewMode("desktop")} aria-pressed={previewMode === "desktop"}>
            <Monitor aria-hidden="true" focusable="false" />
            Desktop
          </button>
          <button type="button" className={previewMode === "mobile" ? "is-active" : ""} onClick={() => setPreviewMode("mobile")} aria-pressed={previewMode === "mobile"}>
            <Smartphone aria-hidden="true" focusable="false" />
            Mobile
          </button>
        </div>
      </header>

      <article className={`preview-card preview-${previewMode}`}>
        <div className="preview-card-media" aria-hidden="true">
          {values.featured ? <span className="tag yellow-tag">Featured</span> : null}
          {previewImage ? <img src={previewImage} alt="" /> : <div className="preview-image-placeholder">Image preview appears here</div>}
        </div>

        <div className="preview-card-body">
          <p className="preview-eyebrow">{values.heroEyebrow.trim() || "Overview"}</p>
          <h3>{values.title.trim() || "Untitled Project"}</h3>
          <p className="preview-card-category">{firstCategory || "No category selected"}</p>
          <p className="preview-card-summary">{values.heroSummary.trim() || "Add a short description to preview project copy."}</p>

          {selectedTechnologies.length > 0 ? (
            <ul className="preview-tech-list" aria-label="Selected technologies">
              {selectedTechnologies.map((technology) => (
                <li key={technology.id}>
                  <TechnologyIcon iconKey={technology.iconKey} name={technology.name} brandColor={technology.brandColor} size={14} />
                  <span>{technology.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="preview-empty">Selected technologies will appear here.</p>
          )}

          {isGalleryPreview ? (
            <div className="gallery-preview-stack">
              <div className="gallery-preview-frame" aria-hidden="true">
                {galleryCover?.url ? (
                  <img src={galleryCover.url} alt="" />
                ) : (
                  <div className="preview-image-placeholder">Gallery cover preview appears here</div>
                )}
              </div>

              {gallery.length > 0 ? (
                <>
                  <div className="gallery-preview-counter">1 / {gallery.length}</div>
                  <ul className="gallery-preview-thumbs" aria-label="Gallery preview thumbnails">
                    {gallery.slice(0, 4).map((image) => (
                      <li key={image.id}>
                        <img src={image.url} alt="" />
                      </li>
                    ))}
                    {gallery.length > 4 ? <li className="gallery-preview-more">+{gallery.length - 4}</li> : null}
                  </ul>
                </>
              ) : (
                <p className="preview-empty">Add gallery images to preview the live gallery experience.</p>
              )}
            </div>
          ) : isLinksPreview ? (
            <div className="links-preview-stack">
              {linkRows.length > 0 ? (
                <div className="links-preview-list">
                  {linkRows.map((row, index) => {
                    const isPrimary = index === 0;
                    const LinkIcon = iconForLinkType(row.type);
                    return (
                      <a
                        key={row.slot}
                        className={isPrimary ? "preview-link" : "preview-link preview-link-secondary"}
                        href={row.url}
                        target={values.openInNewTab ? "_blank" : "_self"}
                        rel={values.openInNewTab ? "noopener noreferrer" : undefined}
                        onClick={(event) => event.preventDefault()}
                      >
                        <LinkIcon aria-hidden="true" focusable="false" />
                        {row.title}
                      </a>
                    );
                  })}
                </div>
              ) : (
                <p className="preview-empty">Add project links to preview call-to-action buttons.</p>
              )}
            </div>
          ) : isCaseStudyPreview ? (
            <div className="case-study-preview">
              {rows.map((row) => {
                const RowIcon = getCaseStudyIcon(row.key);
                return (
                  <section className="preview-section" key={row.key}>
                    <span className="preview-section-icon" aria-hidden="true"><RowIcon /></span>
                    <div>
                      <h4>{row.heading}</h4>
                      <p>{row.excerpt || "Add content for this section."}</p>
                    </div>
                  </section>
                );
              })}

              <section className="preview-section preview-results" key="key-results">
                <span className="preview-section-icon" aria-hidden="true">{(() => {
                  const SectionIcon = getCaseStudyIcon("key-results");
                  return <SectionIcon />;
                })()}</span>
                <div>
                  <h4>Key Results</h4>
                  {metrics.length > 0 ? (
                    <div className="preview-metric-grid">
                      {metrics.map((metric) => {
                        const preset = getMetricPreset(metric.type);
                        const MetricIcon = preset.icon;
                        return (
                          <article className="preview-metric-card" key={metric.id}>
                            <span className={`preview-metric-icon ${metricAccentClass(preset.accent)}`} aria-hidden="true"><MetricIcon /></span>
                            <strong className={metricAccentClass(preset.accent)}>{metric.value}</strong>
                            <small>{metric.label}</small>
                          </article>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="preview-empty">Add key result metrics to populate this grid.</p>
                  )}
                </div>
              </section>
            </div>
          ) : (
            <a className="preview-link" href={values.projectUrl || "#"} onClick={(event) => event.preventDefault()}>{projectLinkLabel(values.projectType)}</a>
          )}
        </div>
      </article>

      <div className="preview-dots" aria-hidden="true"><span className="is-active" /><span /><span /></div>
    </section>
  );
}
