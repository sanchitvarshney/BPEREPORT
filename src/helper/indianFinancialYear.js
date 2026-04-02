import dayjs from 'dayjs';

/** localStorage key for API `session` header (Indian FY label, e.g. 25-26). */
export const SESSION_STORAGE_KEY = 'bpe_financial_session';

/**
 * Calendar year in which the Indian financial year starts (1 Apr).
 * FY 25-26 runs from 2025-04-01 through 2026-03-31.
 */
export function getIndianFinancialYearStartYear(date = dayjs()) {
  const y = date.year();
  const m = date.month(); // 0 = Jan … 3 = Apr
  return m >= 3 ? y : y - 1;
}

export function formatIndianFinancialYearSession(startYear) {
  const yy = startYear % 100;
  const yyNext = (startYear + 1) % 100;
  return `${String(yy).padStart(2, '0')}-${String(yyNext).padStart(2, '0')}`;
}

export function getCurrentIndianFinancialYearSession(date = dayjs()) {
  return formatIndianFinancialYearSession(getIndianFinancialYearStartYear(date));
}

/** Session sent on each API request; defaults to current Indian FY when unset. */
export function getFinancialSessionForRequest() {
  let s = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!s) {
    s = getCurrentIndianFinancialYearSession();
    localStorage.setItem(SESSION_STORAGE_KEY, s);
  }
  return s;
}
