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

document.addEventListener('DOMContentLoaded', () => {
	animateCounters();
});
