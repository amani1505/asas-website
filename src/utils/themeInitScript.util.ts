export const THEME_STORAGE_KEY = 'asas-theme';

/**
 * Runs before first paint: applies the stored theme, or the OS theme when the
 * visitor hasn't chosen one, so the page never flashes the wrong theme.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}var r=document.documentElement;r.classList.remove("light","dark");r.classList.add(t)}catch(e){}})()`;
