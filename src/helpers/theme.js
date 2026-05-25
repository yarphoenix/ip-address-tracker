const STORAGE_KEY = 'ip-tracker-theme';
const THEMES = { LIGHT: 'light', DARK: 'dark' };

const listeners = new Set();
let current = THEMES.LIGHT;

function readStored() {
    try {
        const value = localStorage.getItem(STORAGE_KEY);
        if (value === THEMES.LIGHT || value === THEMES.DARK) return value;
    } catch {/* ignore — private mode, etc. */}
    return null;
}

function writeStored(theme) {
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch {/* ignore */}
}

function preferredTheme() {
    if (typeof matchMedia !== 'function') return THEMES.LIGHT;
    return matchMedia('(prefers-color-scheme: dark)').matches
        ? THEMES.DARK
        : THEMES.LIGHT;
}

function apply(theme) {
    document.documentElement.dataset.theme = theme;
}

export function initTheme() {
    current = readStored() ?? preferredTheme();
    apply(current);
    return current;
}

export function getTheme() {
    return current;
}

export function setTheme(theme) {
    if (theme !== THEMES.LIGHT && theme !== THEMES.DARK) return;
    if (theme === current) return;
    current = theme;
    apply(current);
    writeStored(current);
    listeners.forEach((cb) => cb(current));
}

export function toggleTheme() {
    setTheme(current === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
}

export function subscribeTheme(cb) {
    listeners.add(cb);
    return () => listeners.delete(cb);
}

export { THEMES };
