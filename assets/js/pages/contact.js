/* ── Contact Page JS ── */
document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('contact-form');
	if (!form) return;

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const btn = form.querySelector('button[type="submit"]');
		btn.textContent = 'Sending…';
		btn.disabled = true;

		// Simulate submission (replace with actual endpoint)
		setTimeout(() => {
			btn.textContent = 'Message Sent!';
			form.reset();
			setTimeout(() => {
				btn.textContent = 'Send Message';
				btn.disabled = false;
			}, 3000);
		}, 1200);
	});
});
