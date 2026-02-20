/* =============================================
   RX RENOVATION — main.js
   Injects header/footer, inits i18n, scroll reveal.
   ============================================= */

import { renderHeader, initHeader } from './components/header.js';
import { renderFooter }             from './components/footer.js';
import { initI18n, applyCurrentLang } from './i18n/i18n.js';

/* ── Detect current page ── */
function getCurrentPage() {
	const path = window.location.pathname;
	const file = path.split('/').pop() || 'index.html';
	if (file === '' || file === 'index.html') return 'home';
	return file.replace('.html', '');
}

/* ── Inject header ── */
function mountHeader() {
	const el = document.getElementById('site-header');
	if (!el) return;
	el.innerHTML = renderHeader(getCurrentPage());
	initHeader();
}

/* ── Inject footer ── */
function mountFooter() {
	const el = document.getElementById('site-footer');
	if (!el) return;
	el.innerHTML = renderFooter();
}

/* ── Restore theme before paint ── */
function restoreTheme() {
	const saved = localStorage.getItem('rx-theme') || 'light';
	document.documentElement.setAttribute('data-theme', saved);
}

/* ── Scroll reveal observer ── */
function initScrollReveal() {
	const targets = document.querySelectorAll('.reveal');
	if (!targets.length) return;

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const delay = entry.target.dataset.delay || 0;
				setTimeout(() => {
					entry.target.classList.add('visible');
				}, Number(delay));
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });

	targets.forEach(el => observer.observe(el));
}

/* ── Loading bar ── */
function initLoadingBar() {
	const bar = document.querySelector('.loading-bar');
	if (!bar) return;
	bar.style.width = '100%';
	setTimeout(() => { bar.style.opacity = '0'; }, 400);
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', async () => {
	restoreTheme();
	mountHeader();
	mountFooter();

	/* i18n: init wires lang-btn click handlers + applies current lang to ALL
	   elements including those just injected by mountHeader / mountFooter */
	await initI18n();

	initScrollReveal();
	initLoadingBar();
});
