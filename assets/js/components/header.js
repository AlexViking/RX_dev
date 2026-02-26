/* ── Header Component ── */
import { LANGUAGES } from '../i18n/i18n.js';

export function renderHeader(currentPage = '') {
	const pages = [
		{ href: 'index.html',    key: 'nav.home',     id: 'home'     },
		{ href: 'services.html', key: 'nav.services', id: 'services' },
		{ href: 'projects.html', key: 'nav.projects', id: 'projects' },
		{ href: 'contact.html',  key: 'nav.contact',  id: 'contact'  },
	];

	/* Fallback English labels used as visible text before i18n applies */
	const fallback = { home: 'Home', services: 'Services', projects: 'Projects', contact: 'Contact' };

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

				<!-- Settings Dropdown -->
				<div class="settings-dropdown">
					<button class="settings-toggle" id="settings-toggle" aria-label="Settings" aria-expanded="false">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="12" cy="12" r="3"/>
							<path d="M12 1v6m0 6v10M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h10M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
						</svg>
					</button>
					<div class="settings-menu" id="settings-menu">
						<!-- Language -->
						<div class="settings-section">
							<span class="settings-label" data-i18n="nav.language">Language</span>
							<div class="lang-switcher">
								${langBtns}
							</div>
						</div>
						<!-- Theme -->
						<div class="settings-section">
							<span class="settings-label" data-i18n="nav.theme">Theme</span>
							<div class="theme-toggle" id="theme-toggle">
								<button class="theme-btn" data-theme-btn="light" aria-pressed="false">
									<svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<circle cx="12" cy="12" r="4"/>
										<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
									</svg>
									<span class="theme-label">Light</span>
								</button>
								<button class="theme-btn" data-theme-btn="dark" aria-pressed="false">
									<svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
									</svg>
									<span class="theme-label">Dark</span>
								</button>
							</div>
						</div>
					</div>
				</div>

				<button class="menu-btn" id="menu-btn" data-i18n-aria="nav.openMenu" aria-label="Open menu" aria-expanded="false">
					<span></span>
					<span></span>
					<span></span>
				</button>
			</div>
		</div>

		<!-- Mobile nav overlay -->
		<nav class="nav-mobile" id="nav-mobile" aria-label="Mobile navigation">
			<!-- Close button -->
			<button class="nav-mobile-close" id="nav-mobile-close" aria-label="Close menu">
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>

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
					<div class="theme-toggle theme-toggle-mobile" id="theme-toggle-mobile">
						<button class="theme-btn" data-theme-btn-mobile="light" aria-pressed="false">
							<svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="12" cy="12" r="4"/>
								<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
							</svg>
							<span class="theme-label">Light</span>
						</button>
						<button class="theme-btn" data-theme-btn-mobile="dark" aria-pressed="false">
							<svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
							</svg>
							<span class="theme-label">Dark</span>
						</button>
					</div>
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
	const header          = document.getElementById('site-header');
	const menuBtn         = document.getElementById('menu-btn');
	const mobileNav       = document.getElementById('nav-mobile');
	const themeToggle     = document.getElementById('theme-toggle');
	const themeBtnMobile  = document.getElementById('theme-toggle-mobile');
	const settingsToggle  = document.getElementById('settings-toggle');
	const settingsMenu    = document.getElementById('settings-menu');

	if (!header) return;

	/* ── Scroll behaviour ── */
	const onScroll = () => {
		header.classList.toggle('scrolled', window.scrollY > 20);
	};
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();

	/* ── Settings dropdown ── */
	if (settingsToggle && settingsMenu) {
		settingsToggle.addEventListener('click', (e) => {
			e.stopPropagation();
			const isOpen = settingsMenu.classList.toggle('open');
			settingsToggle.setAttribute('aria-expanded', String(isOpen));
		});

		// Close when clicking outside
		document.addEventListener('click', (e) => {
			if (!settingsMenu.contains(e.target) && e.target !== settingsToggle) {
				settingsMenu.classList.remove('open');
				settingsToggle.setAttribute('aria-expanded', 'false');
			}
		});
	}

	/* ── Mobile menu ── */
	const closeMobileMenu = () => {
		if (mobileNav && menuBtn) {
			mobileNav.classList.remove('open');
			menuBtn.classList.remove('open');
			menuBtn.setAttribute('aria-expanded', 'false');
			document.body.style.overflow = '';
		}
	};

	if (menuBtn && mobileNav) {
		menuBtn.addEventListener('click', () => {
			const isOpen = mobileNav.classList.toggle('open');
			menuBtn.classList.toggle('open', isOpen);
			menuBtn.setAttribute('aria-expanded', String(isOpen));
			document.body.style.overflow = isOpen ? 'hidden' : '';

			// Close settings dropdown when opening mobile menu
			if (isOpen && settingsMenu) {
				settingsMenu.classList.remove('open');
				settingsToggle?.setAttribute('aria-expanded', 'false');
			}
		});

		// Close button in mobile menu
		const mobileCloseBtn = document.getElementById('nav-mobile-close');
		if (mobileCloseBtn) {
			mobileCloseBtn.addEventListener('click', closeMobileMenu);
		}

		// Close when clicking nav links
		mobileNav.querySelectorAll('.nav-mobile-link').forEach(link => {
			link.addEventListener('click', closeMobileMenu);
		});
	}

	/* ── Theme toggle ── */
	const setTheme = (theme) => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('rx-theme', theme);
		updateThemeButtons(theme);
	};

	const updateThemeButtons = (theme) => {
		// Update desktop theme buttons
		document.querySelectorAll('[data-theme-btn]').forEach(btn => {
			const btnTheme = btn.getAttribute('data-theme-btn');
			const isActive = btnTheme === theme;
			btn.classList.toggle('active', isActive);
			btn.setAttribute('aria-pressed', String(isActive));
		});

		// Update mobile theme buttons
		document.querySelectorAll('[data-theme-btn-mobile]').forEach(btn => {
			const btnTheme = btn.getAttribute('data-theme-btn-mobile');
			const isActive = btnTheme === theme;
			btn.classList.toggle('active', isActive);
			btn.setAttribute('aria-pressed', String(isActive));
		});
	};

	// Initialize theme
	const saved = localStorage.getItem('rx-theme') || 'light';
	document.documentElement.setAttribute('data-theme', saved);
	updateThemeButtons(saved);

	// Add click handlers to desktop theme buttons
	if (themeToggle) {
		themeToggle.querySelectorAll('[data-theme-btn]').forEach(btn => {
			btn.addEventListener('click', () => {
				const theme = btn.getAttribute('data-theme-btn');
				setTheme(theme);
			});
		});
	}

	// Add click handlers to mobile theme buttons
	if (themeBtnMobile) {
		themeBtnMobile.querySelectorAll('[data-theme-btn-mobile]').forEach(btn => {
			btn.addEventListener('click', () => {
				const theme = btn.getAttribute('data-theme-btn-mobile');
				setTheme(theme);
			});
		});
	}
}
