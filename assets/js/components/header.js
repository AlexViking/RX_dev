/* ── Header Component ── */
import { LANGUAGES } from '../i18n/i18n.js';

export function renderHeader(currentPage = '') {
	const pages = [
		{ href: 'index.html',    key: 'nav.home',     id: 'home'     },
		{ href: 'about.html',    key: 'nav.about',    id: 'about'    },
		{ href: 'services.html', key: 'nav.services', id: 'services' },
		{ href: 'projects.html', key: 'nav.projects', id: 'projects' },
		{ href: 'contact.html',  key: 'nav.contact',  id: 'contact'  },
	];

	/* Fallback English labels used as visible text before i18n applies */
	const fallback = { home: 'Home', about: 'About', services: 'Services', projects: 'Projects', contact: 'Contact' };

	const navLinks = pages.map(p => {
		const isActive = currentPage === p.id ? 'active' : '';
		return `<a href="${p.href}" class="nav-link ${isActive}" data-i18n="${p.key}">${fallback[p.id]}</a>`;
	}).join('');

	const mobileLinks = pages.map(p => {
		const isActive = currentPage === p.id ? 'active' : '';
		return `<a href="${p.href}" class="nav-mobile-link ${isActive}" data-i18n="${p.key}">${fallback[p.id]}</a>`;
	}).join('');

	/* Language switcher buttons — rendered for each language in LANGUAGES */
	const langBtns = Object.entries(LANGUAGES).map(([code, meta]) =>
		`<button class="lang-btn" data-lang-btn="${code}" aria-pressed="false">${meta.label}</button>`
	).join('');

	return `
		<div class="header-inner">
			<!-- Logo -->
			<a href="index.html" class="logo">
				<span class="logo-mark">RX</span>
				<span class="logo-text">Renovation<span>.</span></span>
			</a>

			<!-- Desktop Nav -->
			<nav class="nav-desktop" aria-label="Main navigation">
				${navLinks}
			</nav>

			<!-- Actions -->
			<div class="header-actions">
				<a href="tel:+14805550173" class="header-phone" data-i18n="common.phone">+1 (480) 555 0173</a>

				<!-- Language Switcher -->
				<div class="lang-switcher" aria-label="Language switcher">
					${langBtns}
				</div>

				<button class="theme-toggle" id="theme-toggle" data-i18n-aria="nav.toggleDark" aria-label="Toggle dark mode">
					<svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
					</svg>
					<svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="4"/>
						<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
					</svg>
				</button>

				<button class="menu-btn" id="menu-btn" data-i18n-aria="nav.openMenu" aria-label="Open menu" aria-expanded="false">
					<span></span>
					<span></span>
					<span></span>
				</button>
			</div>
		</div>

		<!-- Mobile nav overlay -->
		<nav class="nav-mobile" id="nav-mobile" aria-label="Mobile navigation">
			<div class="nav-mobile-links">
				${mobileLinks}
			</div>

			<!-- Mobile Settings -->
			<div class="nav-mobile-settings">
				<!-- Language Switcher -->
				<div class="nav-mobile-setting-item">
					<span class="setting-label" data-i18n="nav.language">Language</span>
					<div class="lang-switcher">
						${langBtns}
					</div>
				</div>

				<!-- Theme Toggle -->
				<div class="nav-mobile-setting-item">
					<span class="setting-label" data-i18n="nav.theme">Theme</span>
					<button class="theme-toggle theme-toggle-mobile" id="theme-toggle-mobile" data-i18n-aria="nav.toggleDark" aria-label="Toggle dark mode">
						<svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
						</svg>
						<svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="12" cy="12" r="4"/>
							<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
						</svg>
					</button>
				</div>
			</div>

			<div class="nav-mobile-footer">
				<p data-i18n="nav.getInTouch">Get in touch</p>
				<a href="tel:+14805550173" data-i18n="common.phone">+1 (480) 555 0173</a>
			</div>
		</nav>
	`;
}

export function initHeader() {
	const header         = document.getElementById('site-header');
	const menuBtn        = document.getElementById('menu-btn');
	const mobileNav      = document.getElementById('nav-mobile');
	const themeBtn       = document.getElementById('theme-toggle');
	const themeBtnMobile = document.getElementById('theme-toggle-mobile');

	if (!header) return;

	/* ── Scroll behaviour ── */
	const onScroll = () => {
		header.classList.toggle('scrolled', window.scrollY > 20);
	};
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();

	/* ── Mobile menu ── */
	if (menuBtn && mobileNav) {
		menuBtn.addEventListener('click', () => {
			const isOpen = mobileNav.classList.toggle('open');
			menuBtn.classList.toggle('open', isOpen);
			menuBtn.setAttribute('aria-expanded', String(isOpen));
			document.body.style.overflow = isOpen ? 'hidden' : '';
		});

		mobileNav.querySelectorAll('.nav-mobile-link').forEach(link => {
			link.addEventListener('click', () => {
				mobileNav.classList.remove('open');
				menuBtn.classList.remove('open');
				menuBtn.setAttribute('aria-expanded', 'false');
				document.body.style.overflow = '';
			});
		});
	}

	/* ── Theme toggle ── */
	const toggleTheme = () => {
		const current = document.documentElement.getAttribute('data-theme');
		const next    = current === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', next);
		localStorage.setItem('rx-theme', next);
	};

	const saved = localStorage.getItem('rx-theme') || 'light';
	document.documentElement.setAttribute('data-theme', saved);

	if (themeBtn) {
		themeBtn.addEventListener('click', toggleTheme);
	}

	if (themeBtnMobile) {
		themeBtnMobile.addEventListener('click', toggleTheme);
	}
}
