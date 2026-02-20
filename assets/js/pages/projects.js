/* ── Projects Page JS — Filter functionality ── */
document.addEventListener('DOMContentLoaded', () => {
	const filterBtns = document.querySelectorAll('.filter-btn');
	const cards      = document.querySelectorAll('.project-card');

	filterBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			const filter = btn.dataset.filter;

			// Update active state
			filterBtns.forEach(b => b.classList.remove('active'));
			btn.classList.add('active');

			// Show/hide cards
			cards.forEach(card => {
				if (filter === 'all' || card.dataset.category === filter) {
					card.classList.remove('filtered-out');
				} else {
					card.classList.add('filtered-out');
				}
			});

			// Re-apply featured class on visible cards: first visible gets featured
			cards.forEach(card => card.classList.remove('project-card--featured'));
			const visible = [...cards].filter(c => !c.classList.contains('filtered-out'));
			if (visible.length > 0) visible[0].classList.add('project-card--featured');
			if (visible.length > 3) visible[3].classList.add('project-card--featured');
		});
	});
});
