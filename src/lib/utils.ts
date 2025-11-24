/**
 * Get the correct asset path with basePath prefix for production builds
 * In development, returns the path as-is
 * In production (GitHub Pages), prepends the basePath from environment or defaults to /PartPulse-1
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' 
    ? (process.env.NEXT_PUBLIC_BASE_PATH || '/PartPulse-1')
    : '';
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
