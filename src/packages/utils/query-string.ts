/**
 * query-string.ts
 * --------------------------------------------------------------
 * The Products page keeps every filter (category, price, brands, rating,
 * sort, page) in the URL rather than in React state — shareable/
 * bookmarkable filtered views, and the back button works the way people
 * expect. This is the one helper every filter control (CategoryTabs,
 * FilterSidebar, SortDropdown, Pagination) uses to build the next URL
 * from the current one.
 */
export function withParams(
  current: URLSearchParams,
  updates: Record<string, string | string[] | null | undefined>,
): string {
  const next = new URLSearchParams(current);

  for (const [key, value] of Object.entries(updates)) {
    if (value === null || value === undefined || value === "") {
      next.delete(key);
    } else if (Array.isArray(value)) {
      if (value.length === 0) next.delete(key);
      else next.set(key, value.join(","));
    } else {
      next.set(key, value);
    }
  }

  // Any filter change invalidates the current page number.
  if (!("page" in updates)) next.delete("page");

  const qs = next.toString();
  return qs ? `?${qs}` : "";
}

export function parseListParam(value: string | undefined): string[] {
  if (!value) return [];
  return value.split(",").filter(Boolean);
}
