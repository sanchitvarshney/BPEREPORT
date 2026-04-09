const RETURN_TO_KEY = 'returnTo';
const AUTH_PAGES = ['/login', '/register', '/forgot-password'];
export const DEFAULT_POST_LOGIN_ROUTE = '/dashboard';

const hasExternalPattern = (value) => value.includes('://') || value.startsWith('//') || value.includes('\\');

export const isSafeReturnToPath = (value) => {
  if (!value || typeof value !== 'string') return false;
  const trimmedValue = value.trim();
  if (!trimmedValue.startsWith('/')) return false;
  if (hasExternalPattern(trimmedValue)) return false;
  return true;
};

export const shouldSkipReturnTo = (value) => {
  if (!isSafeReturnToPath(value)) return true;
  return AUTH_PAGES.some((authPath) => value === authPath || value.startsWith(`${authPath}?`));
};

export const storeReturnTo = (candidatePath) => {
  const pathToStore = candidatePath || `${globalThis.location.pathname}${globalThis.location.search}`;
  if (shouldSkipReturnTo(pathToStore)) return;
  sessionStorage.setItem(RETURN_TO_KEY, pathToStore);
};

export const readReturnTo = () => sessionStorage.getItem(RETURN_TO_KEY);

export const consumeReturnTo = () => {
  const storedPath = readReturnTo();
  sessionStorage.removeItem(RETURN_TO_KEY);
  if (!isSafeReturnToPath(storedPath)) return DEFAULT_POST_LOGIN_ROUTE;
  return storedPath;
};
