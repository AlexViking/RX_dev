/* =============================================
   RX RENOVATION — i18n Engine
   Usage:
	 data-i18n="home.hero.cta"           → sets textContent
	 data-i18n-placeholder="..."         → sets placeholder attr
	 data-i18n-aria="..."                → sets aria-label attr
	 data-i18n-html="..."                → sets innerHTML (use sparingly)

   To add a new language:
	 1. Create assets/js/i18n/XX.json (same keys as en.json)
	 2. Add it to LANGUAGES below
   ============================================= */

export const LANGUAGES = {
	en: { label: 'EN', name: 'English' },
	ge: { label: 'GE', name: 'Georgina' },
	// Add your second language here, e.g.:
	// es: { label: 'ES', name: 'Español' },
};

const DEFAULT_LANG = 'en';
const STORAGE_KEY = 'rx-lang';
const cache = {};          // { 'en': { ...translationObject } }

/* ── Resolve a dot-notation key against an object ── */
function resolve(obj, key) {
	return key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj);
}

/* ── Fetch + cache a language JSON file ── */
async function load(lang) {
	if (cache[lang]) return cache[lang];
	try {
		// Works both on file:// (when opened locally) and https://
		const base = import.meta.url.replace(/\/i18n\/i18n\.js$/, '/i18n/');
		const res = await fetch(`${base}${lang}.json`);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		cache[lang] = await res.json();
		return cache[lang];
	} catch (err) {
		console.warn(`[i18n] Failed to load "${lang}", falling back to "${DEFAULT_LANG}".`, err);
		if (lang !== DEFAULT_LANG) return load(DEFAULT_LANG);
		return {};
	}
}

/* ── Apply translations to the whole document ── */
function applyTranslations(translations) {
	/* textContent */
	document.querySelectorAll('[data-i18n]').forEach(el => {
		const val = resolve(translations, el.dataset.i18n);
		if (val !== null) el.textContent = val;
	});

	/* innerHTML (use only for formatted text) */
	document.querySelectorAll('[data-i18n-html]').forEach(el => {
		const val = resolve(translations, el.dataset.i18nHtml);
		if (val !== null) el.innerHTML = val;
	});

	/* placeholder attribute */
	document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
		const val = resolve(translations, el.dataset.i18nPlaceholder);
		if (val !== null) el.setAttribute('placeholder', val);
	});

	/* aria-label attribute */
	document.querySelectorAll('[data-i18n-aria]').forEach(el => {
		const val = resolve(translations, el.dataset.i18nAria);
		if (val !== null) el.setAttribute('aria-label', val);
	});

	/* <option> elements — value attribute used as key */
	document.querySelectorAll('option[data-i18n]').forEach(el => {
		const val = resolve(translations, el.dataset.i18n);
		if (val !== null) el.textContent = val;
	});

	/* Update <html lang=""> */
	document.documentElement.lang = getCurrentLang();

	/* Fire a custom event so other scripts can react */
	document.dispatchEvent(new CustomEvent('rx:langchange', {
		detail: { lang: getCurrentLang(), translations }
	}));
}

/* ── Public API ── */

export function getCurrentLang() {
	return localStorage.getItem(STORAGE_KEY)
		|| navigator.language?.slice(0, 2)
		|| DEFAULT_LANG;
}

export async function setLang(lang) {
	if (!LANGUAGES[lang]) {
		console.warn(`[i18n] Unknown language "${lang}". Available:`, Object.keys(LANGUAGES));
		return;
	}
	localStorage.setItem(STORAGE_KEY, lang);
	const translations = await load(lang);
	applyTranslations(translations);
	updateSwitcherUI(lang);
}

/* Re-apply current language (call after dynamic HTML is injected) */
export async function applyCurrentLang() {
	const lang = getCurrentLang();
	const translations = await load(lang);
	applyTranslations(translations);
	updateSwitcherUI(lang);
}

/* ── Switcher UI ── */
function updateSwitcherUI(activeLang) {
	document.querySelectorAll('[data-lang-btn]').forEach(btn => {
		const isActive = btn.dataset.langBtn === activeLang;
		btn.classList.toggle('active', isActive);
		btn.setAttribute('aria-pressed', String(isActive));
	});
}

/* ── Wire up switcher buttons ── */
export function initLangSwitcher() {
	document.addEventListener('click', e => {
		const btn = e.target.closest('[data-lang-btn]');
		if (btn) setLang(btn.dataset.langBtn);
	});
}

/* ── Init (called once from main.js) ── */
export async function initI18n() {
	initLangSwitcher();
	await applyCurrentLang();
}
