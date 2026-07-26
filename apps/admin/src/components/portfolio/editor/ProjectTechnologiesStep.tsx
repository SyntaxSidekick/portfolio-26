import { useMemo, useState } from "react";
import { ExternalLink, GripVertical, Plus, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import type { TechnologyCategory, TechnologyReference } from "../../../types/admin";
import type { ProjectFormValues } from "../ProjectForm";
import { TechnologyIcon } from "../../../lib/technologyIcons";
import { categoryLabels, moveItem, normalizedText, searchFields, sortByRegistry } from "./ProjectTechnologiesStep.utils";

export function ProjectTechnologiesStep({
  values,
  technologies,
  onChange,
}: {
  values: ProjectFormValues;
  technologies: TechnologyReference[];
  onChange: (values: ProjectFormValues) => void;
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<TechnologyCategory | "all">("all");

  const technologyMap = useMemo(() => new Map(technologies.map((technology) => [technology.id, technology])), [technologies]);

  const selectedTechnologyItems = useMemo(
    () => values.technologies.map((id) => technologyMap.get(id)).filter((item): item is TechnologyReference => Boolean(item)),
    [technologyMap, values.technologies],
  );

  const availableTechnologies = useMemo(() => {
    const selectedIds = new Set(values.technologies);
    const query = normalizedText(search);

    return technologies
      .filter((technology) => technology.active)
      .filter((technology) => !selectedIds.has(technology.id))
      .filter((technology) => category === "all" || technology.category === category)
      .filter((technology) => {
        if (!query) {
          return true;
        }
        return searchFields(technology).some((field) => field.includes(query));
      })
      .sort(sortByRegistry);
  }, [category, search, technologies, values.technologies]);

  const categoryOptions = useMemo(() => {
    const used = new Set(technologies.map((technology) => technology.category));
    return (["all", ...Object.keys(categoryLabels).filter((item) => item !== "all")] as Array<TechnologyCategory | "all">)
      .filter((item) => item === "all" || used.has(item as TechnologyCategory));
  }, [technologies]);

  function updateSelected(nextSelected: string[]) {
    onChange({ ...values, technologies: nextSelected });
  }

  function addTechnology(technologyId: string) {
    if (values.technologies.includes(technologyId)) {
      return;
    }
    updateSelected([...values.technologies, technologyId]);
  }

  function removeTechnology(technologyId: string) {
    updateSelected(values.technologies.filter((id) => id !== technologyId));
  }

  function moveTechnology(index: number, direction: -1 | 1) {
    updateSelected(moveItem(values.technologies, index, direction));
  }

  return (
    <section className="step-panel technologies-step-panel" aria-labelledby="technologies-step-heading">
      <header className="step-panel-header technologies-header">
        <div>
          <h2 id="technologies-step-heading">Technologies Used</h2>
          <p>Select and organize the technologies, tools, and platforms used in this project.</p>
        </div>
      </header>

      <div className="technologies-controls" role="search">
        <label className="field-block technologies-search-field" htmlFor="project-technologies-search">
          <span className="sr-only">Search technologies</span>
          <Search aria-hidden="true" focusable="false" />
          <input
            id="project-technologies-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search technologies..."
          />
        </label>

        <label className="field-block" htmlFor="project-technologies-category">
          <span className="sr-only">Browse technologies by category</span>
          <select
            id="project-technologies-category"
            value={category}
            onChange={(event) => setCategory(event.target.value as TechnologyCategory | "all")}
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {categoryLabels[option]}
              </option>
            ))}
          </select>
        </label>

        <Link className="button button-secondary technologies-manage-link" to="/technologies">
          Add Custom Tech
          <ExternalLink aria-hidden="true" focusable="false" />
        </Link>
      </div>

      <section className="technologies-selected-panel" aria-labelledby="selected-technologies-heading">
        <div className="technologies-selected-header">
          <div>
            <h3 id="selected-technologies-heading">Selected Technologies ({selectedTechnologyItems.length})</h3>
            <p>These will appear on your project card and case study.</p>
          </div>
        </div>

        {selectedTechnologyItems.length > 0 ? (
          <ul className="selected-technologies-list" aria-label="Selected technologies">
            {selectedTechnologyItems.map((technology, index) => (
              <li key={technology.id} className="selected-technology-item">
                <span className="selected-technology-grip" aria-hidden="true"><GripVertical /></span>
                <TechnologyIcon iconKey={technology.iconKey} name={technology.name} brandColor={technology.brandColor} size={18} />
                <span>{technology.name}</span>
                <div className="selected-technology-actions">
                  <button
                    type="button"
                    onClick={() => moveTechnology(index, -1)}
                    disabled={index === 0}
                    aria-label={`Move ${technology.name} left`}
                  >
                    Left
                  </button>
                  <button
                    type="button"
                    onClick={() => moveTechnology(index, 1)}
                    disabled={index === selectedTechnologyItems.length - 1}
                    aria-label={`Move ${technology.name} right`}
                  >
                    Right
                  </button>
                  <button
                    type="button"
                    onClick={() => removeTechnology(technology.id)}
                    aria-label={`Remove ${technology.name}`}
                  >
                    <X aria-hidden="true" focusable="false" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-copy">No technologies selected yet. Add a few relevant technologies to continue.</p>
        )}
      </section>

      <section className="technologies-catalog-panel" aria-labelledby="add-technologies-heading">
        <h3 id="add-technologies-heading">Add Technologies</h3>

        <ul className="technologies-category-pills" aria-label="Technology categories">
          {categoryOptions.map((option) => (
            <li key={option}>
              <button
                type="button"
                className={category === option ? "is-active" : ""}
                onClick={() => setCategory(option)}
                aria-pressed={category === option}
              >
                {categoryLabels[option]}
              </button>
            </li>
          ))}
        </ul>

        {availableTechnologies.length > 0 ? (
          <ul className="technology-card-grid" aria-label="Available technologies">
            {availableTechnologies.map((technology) => (
              <li key={technology.id} className="technology-card-item">
                <div className="technology-card-copy">
                  <TechnologyIcon iconKey={technology.iconKey} name={technology.name} brandColor={technology.brandColor} size={20} />
                  <span>{technology.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => addTechnology(technology.id)}
                  aria-label={`Add ${technology.name}`}
                >
                  <Plus aria-hidden="true" focusable="false" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-copy">No technologies match your current filters.</p>
        )}
      </section>
    </section>
  );
}
