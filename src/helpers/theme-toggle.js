import { getTheme, toggleTheme, subscribeTheme, THEMES } from './theme';

export function initThemeToggle(button) {
    if (!button) return;

    const sync = (theme) => {
        button.setAttribute('aria-pressed', String(theme === THEMES.DARK));
        button.dataset.theme = theme;
    };

    sync(getTheme());
    subscribeTheme(sync);

    button.addEventListener('click', toggleTheme);
}
