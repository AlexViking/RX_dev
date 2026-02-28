/* ── Home Page JS ── */

/* Counter animation for stats */
function animateCounters() {
	document.querySelectorAll('[data-count]').forEach(el => {
		const target = parseInt(el.dataset.count, 10);
		const duration = 1800;
		const start = performance.now();

		const update = (now) => {
			const elapsed  = now - start;
			const progress = Math.min(elapsed / duration, 1);
			// Ease out cubic
			const eased    = 1 - Math.pow(1 - progress, 3);
			el.textContent = Math.round(eased * target);
			if (progress < 1) requestAnimationFrame(update);
		};

		// Trigger only when visible
		const observer = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				requestAnimationFrame(update);
				observer.disconnect();
			}
		}, { threshold: 0.5 });
		observer.observe(el);
	});
}

/* ── Sponsors carousel auto-scroll ── */
function initSponsorsCarousel() {
	const carousel = document.querySelector('.sponsors-carousel');
	if (!carousel) return;

	const track = carousel.querySelector('.sponsors-track');
	const items = track.querySelectorAll('.sponsor-item');

	// Only activate carousel if there are enough items
	// Calculate if items overflow the container
	const carouselWidth = carousel.offsetWidth;
	const trackWidth = track.scrollWidth;

	if (trackWidth > carouselWidth) {
		// Duplicate items for seamless loop
		items.forEach(item => {
			const clone = item.cloneNode(true);
			track.appendChild(clone);
		});

		// Add animation class
		track.classList.add('animate');
	} else {
		// Center items if they don't overflow
		track.style.justifyContent = 'center';
	}
}

document.addEventListener('DOMContentLoaded', () => {
	animateCounters();
	initSponsorsCarousel();
});
