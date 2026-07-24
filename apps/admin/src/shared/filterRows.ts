export function filterRows<T extends object>(rows: T[], query: string, fields: (keyof T)[]) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return rows;
  return rows.filter((row) => fields.some((field) => String(row[field]).toLowerCase().includes(normalized)));
}
