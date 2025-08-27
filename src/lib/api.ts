export function getApiUrl(path: string): string {
  const trimmedPath = path.startsWith("/") ? path : `/${path}`;
  const base = import.meta.env.VITE_API_BASE?.toString().replace(/\/$/, "");
  if (base && /^https?:\/\//i.test(base)) {
    return `${base}${trimmedPath}`;
  }
  return `/api${trimmedPath}`;
}


