/* ── Footer Component ── */
export function renderFooter() {
	const year = new Date().getFullYear();
	return `
		<div class="container">
			<div class="footer-grid">
				<!-- Brand -->
				<div class="footer-brand">
					<a href="index.html" class="logo">
						<span class="logo-mark">RX</span>
						<span class="logo-text">Renovation<span>.</span></span>
					</a>
					<p data-i18n="footer.brandDesc">Transforming spaces with craftsmanship, precision, and timeless design. Scottsdale, Arizona.</p>
				</div>

				<!-- Navigate -->
				<div class="footer-col">
					<h4 data-i18n="footer.nav.title">Navigate</h4>
					<ul>
						<li><a href="index.html"    data-i18n="footer.nav.home">Home</a></li>
						<li><a href="about.html"    data-i18n="footer.nav.about">About Us</a></li>
						<li><a href="services.html" data-i18n="footer.nav.services">Services</a></li>
						<li><a href="projects.html" data-i18n="footer.nav.projects">Projects</a></li>
						<li><a href="contact.html"  data-i18n="footer.nav.contact">Contact</a></li>
					</ul>
				</div>

				<!-- Services -->
				<div class="footer-col">
					<h4 data-i18n="footer.services.title">Services</h4>
					<ul>
						<li><a href="services.html" data-i18n="footer.services.kitchen">Kitchen Remodel</a></li>
						<li><a href="services.html" data-i18n="footer.services.bathroom">Bathroom Remodel</a></li>
						<li><a href="services.html" data-i18n="footer.services.fullHome">Full Home Renovation</a></li>
						<li><a href="services.html" data-i18n="footer.services.outdoor">Outdoor & Patio</a></li>
						<li><a href="services.html" data-i18n="footer.services.additions">Custom Additions</a></li>
					</ul>
				</div>

				<!-- Contact -->
				<div class="footer-col">
					<h4 data-i18n="footer.contact.title">Contact</h4>
					<ul>
						<li><a href="tel:+14805550173" data-i18n="common.phone">+1 (480) 555 0173</a></li>
						<li><a href="#" class="copy-email" data-email-copy data-i18n="common.email">hello@rxrenovation.com</a></li>
						<li><a href="contact.html" data-i18n="common.location">Scottsdale, Arizona</a></li>
					</ul>
				</div>
			</div>

			<div class="footer-bottom">
				<p>&copy; ${year} <span data-i18n="footer.copyright">RX Renovation. All rights reserved.</span></p>
				<div class="footer-social">
					<a href="#" data-i18n="footer.social.instagram">Instagram</a>
					<a href="#" data-i18n="footer.social.houzz">Houzz</a>
					<a href="#" data-i18n="footer.social.facebook">Facebook</a>
				</div>
			</div>
		</div>
	`;
}
