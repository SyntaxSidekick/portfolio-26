import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { isAbortError } from "../../api/client";
import { listCategories } from "../../api/categories";
import { listTechnologies } from "../../api/technologies";
import { MediaPicker } from "../media/MediaPicker";
import { TechnologyIcon } from "../../lib/technologyIcons";
import type { CaseStudySectionKey, CategoryReference, GalleryImage, MetricType, PortfolioProject, ProjectHighlight, ProjectMetric, ProjectResult, ProjectStatus, ProjectType, TechnologyReference } from "../../types/admin";

type MediaField = "featured" | "desktop" | "mobile" | "card";

export interface ProjectFormValues {
  title: string;
  slug: string;
  projectType: ProjectType;
  status: ProjectStatus;
  featured: boolean;
  displayOrder: string;
  categories: string[];
  technologies: string[];
  heroEyebrow: string;
  heroSubtitle: string;
  heroSummary: string;
  heroBadgeText: string;
  featuredImageUrl: string;
  featuredImageId: string;
  featuredImageAlt: string;
  desktopImageUrl: string;
  desktopImageId: string;
  desktopImageAlt: string;
  mobileImageUrl: string;
  mobileImageId: string;
  mobileImageAlt: string;
  cardImageUrl: string;
  cardImageId: string;
  cardImageAlt: string;
  cardThumbnailUrl: string;
  cardThumbnailId: string;
  gallery: GalleryImage[];
  overviewHeading: string;
  overviewContent: string;
  challengeHeading: string;
  challengeContent: string;
  challengeIconKey: string;
  challengeAccentColor: string;
  solutionHeading: string;
  solutionContent: string;
  solutionIconKey: string;
  solutionAccentColor: string;
  overviewIconKey: string;
  caseStudySectionOrder: CaseStudySectionKey[];
  overviewMediaUrl: string;
  overviewMediaId: string;
  overviewMediaAlt: string;
  challengeMediaUrl: string;
  challengeMediaId: string;
  challengeMediaAlt: string;
  solutionMediaUrl: string;
  solutionMediaId: string;
  solutionMediaAlt: string;
  highlightsMediaUrl: string;
  highlightsMediaId: string;
  highlightsMediaAlt: string;
  primaryMetrics: ProjectMetric[];
  keyResults: ProjectResult[];
  highlights: ProjectHighlight[];
  client: string;
  role: string;
  platform: string;
  subtype: string;
  timeline: string;
  launchDate: string;
  year: string;
  teamSize: string;
  statusLabel: string;
  projectUrl: string;
  repositoryUrl: string;
  codepenUrl: string;
  caseStudyUrl: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  openInNewTab: boolean;
}

export const emptyProjectFormValues: ProjectFormValues = {
  title: "",
  slug: "",
  projectType: "case-study",
  status: "draft",
  featured: false,
  displayOrder: "0",
  categories: [],
  technologies: [],
  heroEyebrow: "Featured Project",
  heroSubtitle: "",
  heroSummary: "",
  heroBadgeText: "Featured Project",
  featuredImageUrl: "",
  featuredImageId: "",
  featuredImageAlt: "",
  desktopImageUrl: "",
  desktopImageId: "",
  desktopImageAlt: "",
  mobileImageUrl: "",
  mobileImageId: "",
  mobileImageAlt: "",
  cardImageUrl: "",
  cardImageId: "",
  cardImageAlt: "",
  cardThumbnailUrl: "",
  cardThumbnailId: "",
  gallery: [],
  overviewHeading: "Project Overview",
  overviewContent: "",
  challengeHeading: "The Challenge",
  challengeContent: "",
  challengeIconKey: "",
  challengeAccentColor: "#ff4da3",
  solutionHeading: "The Solution",
  solutionContent: "",
  solutionIconKey: "",
  solutionAccentColor: "#38df7f",
  overviewIconKey: "",
  caseStudySectionOrder: ["overview", "challenge", "solution", "key-results", "lessons-learned"],
  overviewMediaUrl: "",
  overviewMediaId: "",
  overviewMediaAlt: "",
  challengeMediaUrl: "",
  challengeMediaId: "",
  challengeMediaAlt: "",
  solutionMediaUrl: "",
  solutionMediaId: "",
  solutionMediaAlt: "",
  highlightsMediaUrl: "",
  highlightsMediaId: "",
  highlightsMediaAlt: "",
  primaryMetrics: [],
  keyResults: [],
  highlights: [],
  client: "",
  role: "",
  platform: "",
  subtype: "",
  timeline: "",
  launchDate: "",
  year: "",
  teamSize: "",
  statusLabel: "",
  projectUrl: "",
  repositoryUrl: "",
  codepenUrl: "",
  caseStudyUrl: "",
  primaryCtaLabel: "Visit Live Site",
  secondaryCtaLabel: "View Source",
  openInNewTab: true,
};

const technologyCategories = ["frontend", "framework", "language", "styling", "backend", "database", "cms", "design", "testing", "build-tool", "devops", "cloud", "accessibility", "other"] as const;
const resultIcons = ["rocket", "bar-chart", "accessibility", "search", "user", "timer", "shield", "activity"];
const projectCategoryOptions: { value: ProjectType; label: string }[] = [
  { value: "case-study", label: "Case Study" },
  { value: "github", label: "GitHub Project" },
  { value: "design", label: "Design Project" },
  { value: "codepen", label: "CodePen Experiment" },
];

const id = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()));
const ordered = <T extends { displayOrder: number }>(items: T[] = []) => [...items].sort((a, b) => a.displayOrder - b.displayOrder);
const compact = (value: string) => value.trim() || undefined;
const media = (url: string, alt: string, idValue?: string, thumbnailUrl?: string) => compact(url) ? { id: compact(idValue ?? ""), url: url.trim(), alt: alt.trim(), thumbnailUrl: compact(thumbnailUrl ?? "") } : undefined;
const legacyMetricTypeMap: Record<string, MetricType> = {
  users: "users",
  "cloud-download": "downloads",
  "shield-check": "uptime",
  zap: "performance",
  "trending-up": "growth",
  clock: "time",
  award: "completion",
  star: "rating",
  activity: "performance",
  chart: "growth",
  "check-circle": "completion",
  database: "database",
};

function metricTypeFromResult(result: ProjectResult): MetricType {
  if (result.type) {
    return result.type;
  }
  if (result.iconKey && result.iconKey in legacyMetricTypeMap) {
    return legacyMetricTypeMap[result.iconKey];
  }
  return "users";
}

function metricOrderFromResult(result: ProjectResult, index: number) {
  if (typeof result.order === "number") {
    return result.order;
  }
  if (typeof result.displayOrder === "number") {
    return result.displayOrder;
  }
  return index;
}

function normalizeResults(results: ProjectResult[] = []): ProjectResult[] {
  return [...results]
    .map((result, index) => ({
      ...result,
      type: metricTypeFromResult(result),
      order: metricOrderFromResult(result, index),
    }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function selectGallery(mediaGallery?: GalleryImage[], rootGallery?: GalleryImage[]) {
  const fromMedia = (mediaGallery ?? []).filter((image) => Boolean(image.url?.trim()));
  if (fromMedia.length > 0) {
    return fromMedia;
  }
  return (rootGallery ?? []).filter((image) => Boolean(image.url?.trim()));
}

function deriveSectionOrder(project: PortfolioProject): CaseStudySectionKey[] {
  const fromProject = project.caseStudy?.sectionOrder;
  if (fromProject?.length) return fromProject;

  const dynamic: CaseStudySectionKey[] = ["overview", "challenge", "solution"];
  if ((project.keyResults?.length ?? 0) > 0 || (project.primaryMetrics?.length ?? 0) > 0) {
    dynamic.push("key-results");
  }
  if ((project.highlights?.length ?? 0) > 0) {
    dynamic.push("lessons-learned");
  }
  return dynamic;
}

export function projectToFormValues(project: PortfolioProject): ProjectFormValues {
  return {
    ...emptyProjectFormValues,
    title: project.title,
    slug: project.slug,
    projectType: project.projectType,
    status: project.status,
    featured: project.featured,
    displayOrder: String(project.displayOrder),
    categories: project.categories.map((category) => category.id),
    technologies: project.technologies.map((technology) => technology.id),
    heroEyebrow: project.hero?.eyebrow ?? (project.featured ? "Featured Project" : ""),
    heroSubtitle: project.hero?.subtitle ?? project.client ?? "",
    heroSummary: project.hero?.summary ?? project.excerpt ?? "",
    heroBadgeText: project.hero?.badgeText ?? "Featured Project",
    featuredImageUrl: project.media?.featuredImage?.url ?? project.featuredImage?.url ?? "",
    featuredImageId: project.media?.featuredImage?.id ?? project.featuredImage?.id ?? "",
    featuredImageAlt: project.media?.featuredImage?.alt ?? project.featuredImage?.alt ?? "",
    desktopImageUrl: project.media?.desktopImage?.url ?? project.featuredImage?.url ?? "",
    desktopImageId: project.media?.desktopImage?.id ?? "",
    desktopImageAlt: project.media?.desktopImage?.alt ?? project.featuredImage?.alt ?? "",
    mobileImageUrl: project.media?.mobileImage?.url ?? "",
    mobileImageId: project.media?.mobileImage?.id ?? "",
    mobileImageAlt: project.media?.mobileImage?.alt ?? "",
    cardImageUrl: project.media?.cardImage?.url ?? project.featuredImage?.url ?? "",
    cardImageId: project.media?.cardImage?.id ?? "",
    cardImageAlt: project.media?.cardImage?.alt ?? project.featuredImage?.alt ?? "",
    cardThumbnailUrl: project.media?.cardImage?.thumbnailUrl ?? "",
    cardThumbnailId: "",
    gallery: selectGallery(project.media?.gallery, project.gallery),
    overviewHeading: project.overview?.heading ?? "Project Overview",
    overviewContent: project.overview?.content ?? project.description ?? "",
    challengeHeading: project.challenge?.heading ?? "The Challenge",
    challengeContent: project.challenge?.content ?? "",
    challengeIconKey: project.challenge?.iconKey ?? "",
    challengeAccentColor: project.challenge?.accentColor ?? "#ff4da3",
    solutionHeading: project.solution?.heading ?? "The Solution",
    solutionContent: project.solution?.content ?? "",
    solutionIconKey: project.solution?.iconKey ?? "",
    solutionAccentColor: project.solution?.accentColor ?? "#38df7f",
    overviewIconKey: project.overview?.iconKey ?? "",
    caseStudySectionOrder: deriveSectionOrder(project),
    overviewMediaUrl: project.caseStudy?.sectionMedia?.overview?.url ?? project.overview?.media?.url ?? "",
    overviewMediaId: project.caseStudy?.sectionMedia?.overview?.id ?? project.overview?.media?.id ?? "",
    overviewMediaAlt: project.caseStudy?.sectionMedia?.overview?.alt ?? project.overview?.media?.alt ?? "",
    challengeMediaUrl: project.caseStudy?.sectionMedia?.challenge?.url ?? project.challenge?.media?.url ?? "",
    challengeMediaId: project.caseStudy?.sectionMedia?.challenge?.id ?? project.challenge?.media?.id ?? "",
    challengeMediaAlt: project.caseStudy?.sectionMedia?.challenge?.alt ?? project.challenge?.media?.alt ?? "",
    solutionMediaUrl: project.caseStudy?.sectionMedia?.solution?.url ?? project.solution?.media?.url ?? "",
    solutionMediaId: project.caseStudy?.sectionMedia?.solution?.id ?? project.solution?.media?.id ?? "",
    solutionMediaAlt: project.caseStudy?.sectionMedia?.solution?.alt ?? project.solution?.media?.alt ?? "",
    highlightsMediaUrl: project.caseStudy?.sectionMedia?.highlights?.url ?? "",
    highlightsMediaId: project.caseStudy?.sectionMedia?.highlights?.id ?? "",
    highlightsMediaAlt: project.caseStudy?.sectionMedia?.highlights?.alt ?? "",
    primaryMetrics: ordered(project.primaryMetrics?.length ? project.primaryMetrics : project.metrics ?? []),
    keyResults: normalizeResults(project.keyResults ?? []),
    highlights: ordered(project.highlights ?? []),
    client: project.details?.client ?? project.client ?? "",
    role: project.details?.role ?? project.role ?? "",
    platform: project.details?.platform ?? "",
    subtype: project.details?.subtype ?? "",
    timeline: project.details?.timeline ?? "",
    launchDate: project.details?.launchDate ?? "",
    year: project.details?.year ? String(project.details.year) : project.year ? String(project.year) : "",
    teamSize: project.details?.teamSize ?? "",
    statusLabel: project.details?.statusLabel ?? "",
    projectUrl: project.links?.projectUrl ?? project.projectUrl ?? "",
    repositoryUrl: project.links?.repositoryUrl ?? project.repositoryUrl ?? "",
    codepenUrl: project.links?.codepenUrl ?? project.codepenUrl ?? "",
    caseStudyUrl: project.links?.caseStudyUrl ?? "",
    primaryCtaLabel: project.links?.primaryLabel ?? "Visit Live Site",
    secondaryCtaLabel: project.links?.secondaryLabel ?? "View Source",
    openInNewTab: project.links?.openInNewTab ?? true,
  };
}

export function formValuesToProjectPayload(values: ProjectFormValues, categories: CategoryReference[], technologies: TechnologyReference[]) {
  const activeTechnologyIds = new Set(technologies.map((technology) => technology.id));
  const primaryMetrics = cleanMetrics(values.primaryMetrics);
  const keyResults = cleanResults(values.keyResults);
  const highlights = values.highlights.map((item, index) => ({ id: item.id, text: item.text.trim(), displayOrder: index })).filter((item) => item.text);
  const fallbackSummary = values.heroSummary.trim() || values.title.trim();
  const fallbackSubtitle = values.heroSubtitle.trim() || values.client.trim() || values.title.trim();
  const fallbackOverview = values.overviewContent.trim() || fallbackSummary || values.title.trim();

  return {
    title: values.title,
    slug: values.slug,
    projectType: values.projectType,
    status: values.status,
    excerpt: fallbackSummary,
    description: fallbackOverview,
    featured: values.featured,
    displayOrder: Number(values.displayOrder || 0),
    featuredImage: media(values.featuredImageUrl, values.featuredImageAlt, values.featuredImageId),
    gallery: values.gallery,
    hero: { eyebrow: compact(values.heroEyebrow), subtitle: fallbackSubtitle, summary: fallbackSummary, badgeText: compact(values.heroBadgeText) },
    media: { featuredImage: media(values.featuredImageUrl, values.featuredImageAlt, values.featuredImageId), desktopImage: media(values.desktopImageUrl, values.desktopImageAlt, values.desktopImageId), mobileImage: media(values.mobileImageUrl, values.mobileImageAlt, values.mobileImageId), cardImage: media(values.cardImageUrl, values.cardImageAlt, values.cardImageId, values.cardThumbnailUrl), gallery: values.gallery },
    overview: { heading: compact(values.overviewHeading), content: fallbackOverview, media: media(values.overviewMediaUrl, values.overviewMediaAlt, values.overviewMediaId) },
    challenge: { heading: compact(values.challengeHeading), content: values.challengeContent, media: media(values.challengeMediaUrl, values.challengeMediaAlt, values.challengeMediaId) },
    solution: { heading: compact(values.solutionHeading), content: values.solutionContent, media: media(values.solutionMediaUrl, values.solutionMediaAlt, values.solutionMediaId) },
    caseStudy: {
      sectionOrder: values.caseStudySectionOrder,
      sectionMedia: {
        overview: media(values.overviewMediaUrl, values.overviewMediaAlt, values.overviewMediaId),
        challenge: media(values.challengeMediaUrl, values.challengeMediaAlt, values.challengeMediaId),
        solution: media(values.solutionMediaUrl, values.solutionMediaAlt, values.solutionMediaId),
        highlights: media(values.highlightsMediaUrl, values.highlightsMediaAlt, values.highlightsMediaId),
      },
    },
    primaryMetrics,
    metrics: primaryMetrics,
    keyResults,
    highlights,
    details: { client: compact(values.client), role: compact(values.role), platform: compact(values.platform), subtype: compact(values.subtype), timeline: compact(values.timeline), launchDate: compact(values.launchDate), year: values.year ? Number(values.year) : undefined, teamSize: compact(values.teamSize), statusLabel: compact(values.statusLabel) },
    categories: categories.filter((category) => values.categories.includes(category.id)).map(({ id, name, slug }) => ({ id, name, slug })),
    technologyIds: values.technologies.filter((technologyId) => activeTechnologyIds.has(technologyId)),
    links: { projectUrl: compact(values.projectUrl), repositoryUrl: compact(values.repositoryUrl), codepenUrl: compact(values.codepenUrl), caseStudyUrl: compact(values.caseStudyUrl), primaryLabel: compact(values.primaryCtaLabel), secondaryLabel: compact(values.secondaryCtaLabel), openInNewTab: values.openInNewTab },
    projectUrl: values.projectUrl,
    repositoryUrl: values.repositoryUrl,
    codepenUrl: values.codepenUrl,
    client: values.client,
    role: values.role,
    year: values.year ? Number(values.year) : undefined,
  };
}

function cleanMetrics(metrics: ProjectMetric[]) {
  return metrics.map((metric, index) => ({ id: metric.id, label: metric.label.trim(), value: metric.value.trim(), description: metric.description?.trim() || undefined, displayOrder: index })).filter((metric) => metric.label || metric.value || metric.description);
}

function cleanResults(results: ProjectResult[]) {
  return normalizeResults(results)
    .map((result, index) => ({
      id: result.id,
      type: metricTypeFromResult(result),
      value: result.value.trim(),
      label: result.label.trim(),
      order: index,
    }))
    .filter((result) => result.label || result.value);
}

function FormSection({ title, help, children }: { title: string; help?: string; children: ReactNode }) {
  return <article className="panel form-panel editor-section"><div className="panel-header"><div><h2>{title}</h2>{help ? <p>{help}</p> : null}</div></div><div className="form-stack">{children}</div></article>;
}

export function ProjectForm({ values, saving, onChange, onSubmit, onPreview }: { values: ProjectFormValues; saving: boolean; onChange: (values: ProjectFormValues) => void; onSubmit: () => void; onPreview?: () => void }) {
  const [categories, setCategories] = useState<CategoryReference[]>([]);
  const [technologies, setTechnologies] = useState<TechnologyReference[]>([]);
  const [technologySearch, setTechnologySearch] = useState("");
  const [technologyCategory, setTechnologyCategory] = useState("all");

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    Promise.all([listCategories(controller.signal), listTechnologies(controller.signal, { active: true })])
      .then(([nextCategories, nextTechnologies]) => { if (active) { setCategories(nextCategories); setTechnologies(nextTechnologies); } })
      .catch((error: unknown) => { if (!isAbortError(error)) undefined; });
    return () => { active = false; controller.abort(); };
  }, []);

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  const update = <K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) => onChange({ ...values, [key]: value });
  const updateArray = <K extends "primaryMetrics" | "keyResults" | "highlights">(key: K, next: ProjectFormValues[K]) => update(key, next);
  const selectedTechnologySet = new Set(values.technologies);
  const visibleTechnologies = useMemo(() => {
    const query = technologySearch.trim().toLowerCase();
    return technologies
      .filter((technology) => technologyCategory === "all" || technology.category === technologyCategory)
      .filter((technology) => !query || [technology.name, technology.slug, technology.iconKey, technology.category].some((value) => value.toLowerCase().includes(query)))
      .sort((a, b) => Number(selectedTechnologySet.has(b.id)) - Number(selectedTechnologySet.has(a.id)) || a.displayOrder - b.displayOrder || a.name.localeCompare(b.name));
  }, [technologies, technologyCategory, technologySearch, values.technologies]);

  const selectedTechnologies = technologies.filter((technology) => values.technologies.includes(technology.id));
  const toggleTechnology = (technologyId: string) => update("technologies", values.technologies.includes(technologyId) ? values.technologies.filter((id) => id !== technologyId) : [...values.technologies, technologyId]);
  const technologiesSection = (
    <FormSection title={values.projectType === "design" ? "Design Tools" : "Technologies Used"} help="Selected technologies appear first and stay checked while filtering.">
      <div className="technology-selector">
        <div className="technology-selector-header"><span>{values.technologies.length} selected</span><button type="button" onClick={() => update("technologies", [])} disabled={values.technologies.length === 0}>Clear all</button></div>
        {selectedTechnologies.length ? <div className="selected-technologies">{selectedTechnologies.map((technology) => <span className="tag neutral-tag technology-detail-tag" key={technology.id}><TechnologyIcon iconKey={technology.iconKey} name={technology.name} brandColor={technology.brandColor} size={16} />{technology.name}</span>)}</div> : null}
        <div className="technology-selector-controls"><label>Search<input value={technologySearch} onChange={(event) => setTechnologySearch(event.target.value)} /></label><label>Category<select value={technologyCategory} onChange={(event) => setTechnologyCategory(event.target.value)}><option value="all">All categories</option>{technologyCategories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label></div>
        <div className="technology-grid technology-grid-wide">{visibleTechnologies.map((technology) => <label className="technology-option" key={technology.id}><input type="checkbox" checked={values.technologies.includes(technology.id)} onChange={() => toggleTechnology(technology.id)} /><TechnologyIcon iconKey={technology.iconKey} name={technology.name} brandColor={technology.brandColor} size={22} /><span>{technology.name}</span></label>)}</div>
      </div>
    </FormSection>
  );

  return (
    <form className="project-editor" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
      <FormSection title="Project Identity" help="Core project information used for routing, filtering, and publishing.">
        <div className="field-grid compact-fields">
          <label>Project title <span aria-hidden="true">*</span><input required value={values.title} onChange={(event) => update("title", event.target.value)} /></label>
          <label>Slug <span aria-hidden="true">*</span><input required value={values.slug} onChange={(event) => update("slug", event.target.value)} /></label>
          <label>Project Category <span aria-hidden="true">*</span><select required value={values.projectType} onChange={(event) => update("projectType", event.target.value as ProjectType)}><option value="">Select Project Category</option>{projectCategoryOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><span className="field-help">Determines which editor, card template, and public project page is used.</span></label>
          <label>Project Type<input value={values.subtype} onChange={(event) => update("subtype", event.target.value)} /></label>
          <label>Client or organization<input value={values.client} onChange={(event) => update("client", event.target.value)} /></label>
          <label>Portfolio taxonomy<select multiple value={values.categories} onChange={(event) => update("categories", Array.from(event.target.selectedOptions, (option) => option.value))}>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
          <label>Status<select value={values.status} onChange={(event) => update("status", event.target.value as ProjectStatus)}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
          <label>Display order<input type="number" value={values.displayOrder} onChange={(event) => update("displayOrder", event.target.value)} /></label>
          <label className="check-row"><input type="checkbox" checked={values.featured} onChange={(event) => update("featured", event.target.checked)} /> Featured project</label>
        </div>
      </FormSection>

      {values.projectType === "case-study" ? (
        <>
          <FormSection title="Hero Content" help="Maps directly to the top of the public project page.">
            <div className="field-grid compact-fields"><label>Eyebrow label<input value={values.heroEyebrow} onChange={(event) => update("heroEyebrow", event.target.value)} /></label><label>Featured badge text<input value={values.heroBadgeText} onChange={(event) => update("heroBadgeText", event.target.value)} /></label><label>Hero subtitle <span aria-hidden="true">*</span><input required value={values.heroSubtitle} onChange={(event) => update("heroSubtitle", event.target.value)} /></label><label>Primary button label<input value={values.primaryCtaLabel} onChange={(event) => update("primaryCtaLabel", event.target.value)} /></label><label>Secondary button label<input value={values.secondaryCtaLabel} onChange={(event) => update("secondaryCtaLabel", event.target.value)} /></label></div>
            <label>Hero summary <span aria-hidden="true">*</span><textarea required value={values.heroSummary} onChange={(event) => update("heroSummary", event.target.value)} /></label>
          </FormSection>

          <FormSection title="Project Media" help="Use separate images for public hero, mobile preview, cards, and galleries.">
            <div className="media-editor-grid">{(["featured", "desktop", "mobile", "card"] as MediaField[]).map((field) => <MediaEditor key={field} field={field} values={values} onChange={(urlKey, altKey, idKey, media) => onChange({ ...values, [urlKey]: media?.url ?? "", [altKey]: media?.alt ?? "", [idKey]: media?.id ?? "" })} update={update} />)}</div>
          </FormSection>

          <FormSection title="Project Overview"><label>Overview heading<input value={values.overviewHeading} onChange={(event) => update("overviewHeading", event.target.value)} /></label><label>Overview introduction <span aria-hidden="true">*</span><textarea required value={values.overviewContent} onChange={(event) => update("overviewContent", event.target.value)} /></label></FormSection>

          <FormSection title="Challenge and Solution"><div className="field-grid"><ContentBlock title="Challenge" heading={values.challengeHeading} content={values.challengeContent} iconKey={values.challengeIconKey} accentColor={values.challengeAccentColor} onHeading={(value) => update("challengeHeading", value)} onContent={(value) => update("challengeContent", value)} onIcon={(value) => update("challengeIconKey", value)} onAccent={(value) => update("challengeAccentColor", value)} /><ContentBlock title="Solution" heading={values.solutionHeading} content={values.solutionContent} iconKey={values.solutionIconKey} accentColor={values.solutionAccentColor} onHeading={(value) => update("solutionHeading", value)} onContent={(value) => update("solutionContent", value)} onIcon={(value) => update("solutionIconKey", value)} onAccent={(value) => update("solutionAccentColor", value)} /></div></FormSection>

          <FormSection title="Primary Metrics" help="The metric row directly beneath the hero."><MetricEditor items={values.primaryMetrics} addLabel="Add Metric" onChange={(items) => updateArray("primaryMetrics", items)} /></FormSection>
          <FormSection title="Key Results" help="A separate repeatable results row with optional icon and accent color."><ResultEditor items={values.keyResults} onChange={(items) => updateArray("keyResults", items)} /></FormSection>
          <FormSection title="Project Highlights"><HighlightEditor items={values.highlights} onChange={(items) => updateArray("highlights", items)} /></FormSection>

          <FormSection title="Project Details"><div className="field-grid compact-fields">{(["role", "platform", "subtype", "timeline", "launchDate", "year", "teamSize", "statusLabel"] as const).map((key) => <label key={key}>{labelFor(key)}<input type={key === "year" ? "number" : "text"} value={values[key]} onChange={(event) => update(key, event.target.value)} /></label>)}</div></FormSection>
          {technologiesSection}
        </>
      ) : values.projectType === "github" ? (
        <GitHubProjectFields values={values} update={update} updateArray={updateArray} technologiesSection={technologiesSection} />
      ) : values.projectType === "design" ? (
        <DesignProjectFields values={values} update={update} updateArray={updateArray} technologiesSection={technologiesSection} />
      ) : (
        <CodePenProjectFields values={values} update={update} updateArray={updateArray} technologiesSection={technologiesSection} />
      )}

      <FormSection title="Project Links"><div className="field-grid compact-fields"><label>Live Project URL<input type="url" value={values.projectUrl} onChange={(event) => update("projectUrl", event.target.value)} /></label><label>Repository URL<input type="url" value={values.repositoryUrl} onChange={(event) => update("repositoryUrl", event.target.value)} /></label><label>CodePen URL<input type="url" value={values.codepenUrl} onChange={(event) => update("codepenUrl", event.target.value)} /></label><label>Case study URL<input type="url" value={values.caseStudyUrl} onChange={(event) => update("caseStudyUrl", event.target.value)} /></label><label className="check-row"><input type="checkbox" checked={values.openInNewTab} onChange={(event) => update("openInNewTab", event.target.checked)} /> Open links in new tab</label></div></FormSection>

      <FormSection title="Publishing"><div className="field-grid compact-fields"><label>Status<select value={values.status} onChange={(event) => update("status", event.target.value as ProjectStatus)}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label><label className="check-row"><input type="checkbox" checked={values.featured} onChange={(event) => update("featured", event.target.checked)} /> Featured</label><label>Display order<input type="number" value={values.displayOrder} onChange={(event) => update("displayOrder", event.target.value)} /></label></div></FormSection>

      <div className="editor-action-bar"><button className="button button-secondary" type="button" onClick={onPreview} disabled={!onPreview}>Preview</button><button className="button button-primary" type="submit" disabled={saving}>{saving ? "Saving..." : values.status === "published" ? "Update Project" : "Save Project"}</button></div>
    </form>
  );
}

type TemplateFieldsProps = {
  values: ProjectFormValues;
  update: <K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) => void;
  updateArray: <K extends "primaryMetrics" | "keyResults" | "highlights">(key: K, next: ProjectFormValues[K]) => void;
  technologiesSection: ReactNode;
};

function GitHubProjectFields({ values, update, updateArray, technologiesSection }: TemplateFieldsProps) {
  return <>
    <FormSection title="Repository"><div className="field-grid compact-fields"><label>Repository Name<input value={values.platform} onChange={(event) => update("platform", event.target.value)} /></label><label>Repository Owner<input value={values.client} onChange={(event) => update("client", event.target.value)} /></label><label>Repository URL<input type="url" value={values.repositoryUrl} onChange={(event) => update("repositoryUrl", event.target.value)} /></label><label>Primary Language<input value={values.role} onChange={(event) => update("role", event.target.value)} /></label><label>Runtime<input value={values.timeline} onChange={(event) => update("timeline", event.target.value)} /></label><label>License<input value={values.statusLabel} onChange={(event) => update("statusLabel", event.target.value)} /></label></div></FormSection>
    <CardContentFields values={values} update={update} imageLabel="Featured Image" cardLabel="Card Image" />
    <FormSection title="Repository Statistics"><MetricEditor items={values.primaryMetrics} addLabel="Add Statistic" onChange={(items) => updateArray("primaryMetrics", items)} /></FormSection>
    <FormSection title="Project Overview"><label>Overview <span aria-hidden="true">*</span><textarea required value={values.overviewContent} onChange={(event) => update("overviewContent", event.target.value)} /></label><ContentBlock title="Features" heading={values.challengeHeading} content={values.challengeContent} iconKey={values.challengeIconKey} accentColor={values.challengeAccentColor} onHeading={(value) => update("challengeHeading", value)} onContent={(value) => update("challengeContent", value)} onIcon={(value) => update("challengeIconKey", value)} onAccent={(value) => update("challengeAccentColor", value)} /><ContentBlock title="Installation and Usage" heading={values.solutionHeading} content={values.solutionContent} iconKey={values.solutionIconKey} accentColor={values.solutionAccentColor} onHeading={(value) => update("solutionHeading", value)} onContent={(value) => update("solutionContent", value)} onIcon={(value) => update("solutionIconKey", value)} onAccent={(value) => update("solutionAccentColor", value)} /></FormSection>
    <FormSection title="Screenshots"><GalleryEditor items={values.gallery} onChange={(items) => update("gallery", items)} /></FormSection>
    {technologiesSection}
    <FormSection title="Links"><div className="field-grid compact-fields"><label>GitHub Repository<input type="url" value={values.repositoryUrl} onChange={(event) => update("repositoryUrl", event.target.value)} /></label><label>Live Demo<input type="url" value={values.projectUrl} onChange={(event) => update("projectUrl", event.target.value)} /></label><label>Documentation<input type="url" value={values.caseStudyUrl} onChange={(event) => update("caseStudyUrl", event.target.value)} /></label><label>Package (optional)<input type="url" value={values.codepenUrl} onChange={(event) => update("codepenUrl", event.target.value)} /></label></div></FormSection>
  </>;
}

function DesignProjectFields({ values, update, updateArray, technologiesSection }: TemplateFieldsProps) {
  return <>
    <FormSection title="Design Information"><div className="field-grid compact-fields"><label>Project Type<input value={values.subtype} onChange={(event) => update("subtype", event.target.value)} /></label><label>Role<input value={values.role} onChange={(event) => update("role", event.target.value)} /></label><label>Timeline<input value={values.timeline} onChange={(event) => update("timeline", event.target.value)} /></label><label>Client<input value={values.client} onChange={(event) => update("client", event.target.value)} /></label></div></FormSection>
    <CardContentFields values={values} update={update} imageLabel="Featured Image" cardLabel="Card Image" />
    <FormSection title="Design Overview"><label>Overview <span aria-hidden="true">*</span><textarea required value={values.overviewContent} onChange={(event) => update("overviewContent", event.target.value)} /></label><ContentBlock title="Challenge" heading={values.challengeHeading} content={values.challengeContent} iconKey={values.challengeIconKey} accentColor={values.challengeAccentColor} onHeading={(value) => update("challengeHeading", value)} onContent={(value) => update("challengeContent", value)} onIcon={(value) => update("challengeIconKey", value)} onAccent={(value) => update("challengeAccentColor", value)} /><ContentBlock title="Design Process and Outcome" heading={values.solutionHeading} content={values.solutionContent} iconKey={values.solutionIconKey} accentColor={values.solutionAccentColor} onHeading={(value) => update("solutionHeading", value)} onContent={(value) => update("solutionContent", value)} onIcon={(value) => update("solutionIconKey", value)} onAccent={(value) => update("solutionAccentColor", value)} /></FormSection>
    <FormSection title="Deliverables"><HighlightEditor items={values.highlights} onChange={(items) => updateArray("highlights", items)} /></FormSection>
    {technologiesSection}
    <FormSection title="Gallery"><GalleryEditor items={values.gallery} onChange={(items) => update("gallery", items)} /></FormSection>
    <FormSection title="Links"><div className="field-grid compact-fields"><label>Figma<input type="url" value={values.repositoryUrl} onChange={(event) => update("repositoryUrl", event.target.value)} /></label><label>Prototype<input type="url" value={values.codepenUrl} onChange={(event) => update("codepenUrl", event.target.value)} /></label><label>Behance or Dribbble<input type="url" value={values.caseStudyUrl} onChange={(event) => update("caseStudyUrl", event.target.value)} /></label><label>Live Project<input type="url" value={values.projectUrl} onChange={(event) => update("projectUrl", event.target.value)} /></label></div></FormSection>
  </>;
}

function CodePenProjectFields({ values, update, updateArray, technologiesSection }: TemplateFieldsProps) {
  return <>
    <FormSection title="Experiment"><div className="field-grid compact-fields"><label>Project Type<input value={values.subtype} onChange={(event) => update("subtype", event.target.value)} /></label><label>Experiment Category<input value={values.platform} onChange={(event) => update("platform", event.target.value)} /></label><label>CodePen URL<input type="url" value={values.codepenUrl} onChange={(event) => update("codepenUrl", event.target.value)} /></label></div></FormSection>
    <CardContentFields values={values} update={update} imageLabel="Preview Image" cardLabel="Optional Preview Video" />
    <FormSection title="Overview"><label>Overview <span aria-hidden="true">*</span><textarea required value={values.overviewContent} onChange={(event) => update("overviewContent", event.target.value)} /></label><ContentBlock title="Concept" heading={values.challengeHeading} content={values.challengeContent} iconKey={values.challengeIconKey} accentColor={values.challengeAccentColor} onHeading={(value) => update("challengeHeading", value)} onContent={(value) => update("challengeContent", value)} onIcon={(value) => update("challengeIconKey", value)} onAccent={(value) => update("challengeAccentColor", value)} /><ContentBlock title="Implementation Notes" heading={values.solutionHeading} content={values.solutionContent} iconKey={values.solutionIconKey} accentColor={values.solutionAccentColor} onHeading={(value) => update("solutionHeading", value)} onContent={(value) => update("solutionContent", value)} onIcon={(value) => update("solutionIconKey", value)} onAccent={(value) => update("solutionAccentColor", value)} /></FormSection>
    <FormSection title="Features"><HighlightEditor items={values.highlights} onChange={(items) => updateArray("highlights", items)} /></FormSection>
    {technologiesSection}
    <FormSection title="Links"><div className="field-grid compact-fields"><label>CodePen<input type="url" value={values.codepenUrl} onChange={(event) => update("codepenUrl", event.target.value)} /></label><label>Live Demo<input type="url" value={values.projectUrl} onChange={(event) => update("projectUrl", event.target.value)} /></label><label>Source Code<input type="url" value={values.repositoryUrl} onChange={(event) => update("repositoryUrl", event.target.value)} /></label></div></FormSection>
  </>;
}

function CardContentFields({ values, update, imageLabel, cardLabel }: { values: ProjectFormValues; update: <K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) => void; imageLabel: string; cardLabel: string }) {
  const updateMedia = (urlKey: keyof ProjectFormValues, altKey: keyof ProjectFormValues, idKey: keyof ProjectFormValues, media: { id?: string; url: string; alt: string } | null) => {
    update(urlKey, (media?.url ?? "") as never);
    update(altKey, (media?.alt ?? "") as never);
    update(idKey, (media?.id ?? "") as never);
  };
  return <FormSection title="Card Content"><div className="field-grid compact-fields"><label>Project Title <span aria-hidden="true">*</span><input required value={values.title} onChange={(event) => update("title", event.target.value)} /></label><label>Project Type<input value={values.subtype} onChange={(event) => update("subtype", event.target.value)} /></label></div><label>Short Description <span aria-hidden="true">*</span><textarea required value={values.heroSummary} onChange={(event) => update("heroSummary", event.target.value)} /></label><div className="media-editor-grid"><MediaEditor field="featured" values={values} onChange={updateMedia} update={update} /><MediaEditor field="card" values={values} onChange={updateMedia} update={update} /></div><p className="field-help">{imageLabel} and {cardLabel} are used by the public templates.</p></FormSection>;
}

function labelFor(key: string) {
  return ({ role: "Role", platform: "Platform", subtype: "Project Type", timeline: "Timeline", launchDate: "Launch date", year: "Year", teamSize: "Team size", statusLabel: "Project status label" } as Record<string, string>)[key] ?? key;
}

function MediaEditor({ field, values, update, onChange }: { field: MediaField; values: ProjectFormValues; update: <K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) => void; onChange: (urlKey: keyof ProjectFormValues, altKey: keyof ProjectFormValues, idKey: keyof ProjectFormValues, media: { id?: string; url: string; alt: string } | null) => void }) {
  const urlKey = `${field}ImageUrl` as keyof ProjectFormValues;
  const idKey = `${field}ImageId` as keyof ProjectFormValues;
  const altKey = `${field}ImageAlt` as keyof ProjectFormValues;
  const label = `${field[0].toUpperCase()}${field.slice(1)} image`;
  const url = values[urlKey] as string;
  const value = url ? { id: values[idKey] as string, url, alt: values[altKey] as string } : null;
  return <div className="media-editor"><MediaPicker label={label} value={value} requiredAlt onChange={(media) => onChange(urlKey, altKey, idKey, media)} /><label>Alt text{url ? <span aria-hidden="true"> *</span> : null}<input required={Boolean(url)} value={values[altKey] as string} onChange={(event) => update(altKey, event.target.value as never)} /></label></div>;
}

function ContentBlock(props: { title: string; heading: string; content: string; iconKey: string; accentColor: string; onHeading: (value: string) => void; onContent: (value: string) => void; onIcon: (value: string) => void; onAccent: (value: string) => void }) {
  return <div className="content-block-editor"><h3>{props.title}</h3><label>Heading<input value={props.heading} onChange={(event) => props.onHeading(event.target.value)} /></label><label>Content<textarea value={props.content} onChange={(event) => props.onContent(event.target.value)} /></label><label>Icon key<input value={props.iconKey} onChange={(event) => props.onIcon(event.target.value)} /></label><label>Accent color<input value={props.accentColor} onChange={(event) => props.onAccent(event.target.value)} /></label></div>;
}

function move<T extends { displayOrder: number }>(items: T[], index: number, direction: -1 | 1) {
  const next = [...items];
  const target = index + direction;
  if (target < 0 || target >= next.length) return items;
  const [item] = next.splice(index, 1);
  next.splice(target, 0, item);
  return next.map((entry, displayOrder) => ({ ...entry, displayOrder }));
}

function MetricEditor({ items, onChange, addLabel }: { items: ProjectMetric[]; onChange: (items: ProjectMetric[]) => void; addLabel: string }) {
  return <RepeatableShell empty="No metrics added." addLabel={addLabel} onAdd={() => onChange([...items, { id: id(), value: "", label: "", description: "", displayOrder: items.length }])}>{items.map((item, index) => <div className="repeatable-card" key={item.id}><label>Value<input required={Boolean(item.label)} value={item.value} onChange={(event) => onChange(items.map((entry, i) => i === index ? { ...entry, value: event.target.value } : entry))} /></label><label>Label<input required={Boolean(item.value)} value={item.label} onChange={(event) => onChange(items.map((entry, i) => i === index ? { ...entry, label: event.target.value } : entry))} /></label><label>Description<input value={item.description ?? ""} onChange={(event) => onChange(items.map((entry, i) => i === index ? { ...entry, description: event.target.value } : entry))} /></label><RowActions index={index} length={items.length} move={(direction) => onChange(move(items, index, direction))} remove={() => onChange(items.filter((_, i) => i !== index))} /></div>)}</RepeatableShell>;
}

function ResultEditor({ items, onChange }: { items: ProjectResult[]; onChange: (items: ProjectResult[]) => void }) {
  const withDisplayOrder: Array<ProjectResult & { displayOrder: number }> = items.map((entry, index) => ({ ...entry, displayOrder: entry.displayOrder ?? index }));
  return <RepeatableShell empty="No key results added." addLabel="Add Result" onAdd={() => onChange([...items, { id: id(), type: "users", order: items.length, value: "", label: "", description: "", iconKey: "rocket", accentColor: "#1688ff", displayOrder: items.length }])}>{items.map((item, index) => <div className="repeatable-card" key={item.id}><label>Value<input required={Boolean(item.label)} value={item.value} onChange={(event) => onChange(items.map((entry, i) => i === index ? { ...entry, value: event.target.value } : entry))} /></label><label>Label<input required={Boolean(item.value)} value={item.label} onChange={(event) => onChange(items.map((entry, i) => i === index ? { ...entry, label: event.target.value } : entry))} /></label><label>Icon key<select value={item.iconKey ?? ""} onChange={(event) => onChange(items.map((entry, i) => i === index ? { ...entry, iconKey: event.target.value } : entry))}>{resultIcons.map((icon) => <option key={icon} value={icon}>{icon}</option>)}</select></label><label>Accent color<input value={item.accentColor ?? ""} onChange={(event) => onChange(items.map((entry, i) => i === index ? { ...entry, accentColor: event.target.value } : entry))} /></label><RowActions index={index} length={items.length} move={(direction) => onChange(move<ProjectResult & { displayOrder: number }>(withDisplayOrder, index, direction).map((entry, order) => ({ ...entry, order })))} remove={() => onChange(items.filter((_, i) => i !== index))} /></div>)}</RepeatableShell>;
}

function HighlightEditor({ items, onChange }: { items: ProjectHighlight[]; onChange: (items: ProjectHighlight[]) => void }) {
  return <RepeatableShell empty="No highlights added." addLabel="Add Highlight" onAdd={() => onChange([...items, { id: id(), text: "", displayOrder: items.length }])}>{items.map((item, index) => <div className="repeatable-card highlight-row" key={item.id}><label>Highlight text<input value={item.text} onChange={(event) => onChange(items.map((entry, i) => i === index ? { ...entry, text: event.target.value } : entry))} /></label><RowActions index={index} length={items.length} move={(direction) => onChange(move(items, index, direction))} remove={() => onChange(items.filter((_, i) => i !== index))} /></div>)}</RepeatableShell>;
}

function GalleryEditor({ items, onChange }: { items: GalleryImage[]; onChange: (items: GalleryImage[]) => void }) {
  return <RepeatableShell empty="No images added." addLabel="Add Image" onAdd={() => onChange([...items, { id: id(), url: "", alt: "", caption: "", order: items.length, isFeatured: false }])}>{items.map((item, index) => <div className="repeatable-card" key={item.id}><label>Image URL<input type="url" value={item.url ?? ""} onChange={(event) => onChange(items.map((entry, i) => i === index ? { ...entry, url: event.target.value } : entry))} /></label><label>Alt text<input value={item.alt} onChange={(event) => onChange(items.map((entry, i) => i === index ? { ...entry, alt: event.target.value } : entry))} /></label><label>Caption<input value={item.caption} onChange={(event) => onChange(items.map((entry, i) => i === index ? { ...entry, caption: event.target.value } : entry))} /></label><RowActions index={index} length={items.length} move={(direction) => onChange(move(items.map((entry, order) => ({ ...entry, displayOrder: entry.order ?? order })), index, direction).map(({ displayOrder, ...entry }) => ({ ...entry, order: displayOrder })))} remove={() => onChange(items.filter((_, i) => i !== index).map((entry, order) => ({ ...entry, order })))} /></div>)}</RepeatableShell>;
}

function RepeatableShell({ children, empty, addLabel, onAdd }: { children: ReactNode; empty: string; addLabel: string; onAdd: () => void }) {
  return <div className="repeatable-editor"><div className="heading-actions"><button className="button button-secondary" type="button" onClick={onAdd}>{addLabel}</button></div>{children ? <div className="repeatable-grid">{children}</div> : <p className="empty-copy">{empty}</p>}</div>;
}

function RowActions({ index, length, move, remove }: { index: number; length: number; move: (direction: -1 | 1) => void; remove: () => void }) {
  return <div className="metric-actions"><button type="button" onClick={() => move(-1)} disabled={index === 0}>Up</button><button type="button" onClick={() => move(1)} disabled={index === length - 1}>Down</button><button type="button" onClick={remove}>Remove</button></div>;
}
