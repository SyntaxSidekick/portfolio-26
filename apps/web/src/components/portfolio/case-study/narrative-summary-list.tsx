function normalizeItem(item: string) {
  return item.replace(/^[-•*]\s*/, "").trim();
}

export function getNarrativeSummaryItems(content: string) {
  const lineItems = content
    .split(/\n+/)
    .map(normalizeItem)
    .filter(Boolean);

  if (lineItems.length > 1) {
    return lineItems;
  }

  return content
    .split(/,|;|\band\b/)
    .map(normalizeItem)
    .filter((item) => item.length > 18)
    .slice(0, 5);
}

export function NarrativeSummaryList({
  content,
  label,
}: {
  content: string;
  label: string;
}) {
  const items = getNarrativeSummaryItems(content);

  if (items.length < 2) {
    return null;
  }

  return (
    <aside className="project-summary-list" aria-label={label}>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
