/* ── Contact Page JS ── */

/* Custom Select Dropdown */
function initCustomSelects() {
	document.querySelectorAll('.custom-select').forEach(select => {
		const trigger = select.querySelector('.custom-select-trigger');
		const options = select.querySelector('.custom-select-options');
		const valueDisplay = select.querySelector('.custom-select-value');
		const hiddenInput = select.parentElement.querySelector('input[type="hidden"]');
		const selectName = select.dataset.name;

		// Toggle dropdown
		trigger.addEventListener('click', (e) => {
			e.stopPropagation();
			// Close other dropdowns
			document.querySelectorAll('.custom-select.open').forEach(other => {
				if (other !== select) other.classList.remove('open');
			});
			select.classList.toggle('open');
		});

		// Select option
		options.querySelectorAll('.custom-select-option').forEach(option => {
			option.addEventListener('click', (e) => {
				e.stopPropagation();
				const value = option.dataset.value;
				const text = option.textContent;

				// Update value
				valueDisplay.textContent = text;
				hiddenInput.value = value;

				// Update selected state
				options.querySelectorAll('.custom-select-option').forEach(opt => {
					opt.classList.remove('selected');
				});
				option.classList.add('selected');

				// Close dropdown
				select.classList.remove('open');
			});
		});
	});

	// Close dropdowns when clicking outside
	document.addEventListener('click', () => {
		document.querySelectorAll('.custom-select.open').forEach(select => {
			select.classList.remove('open');
		});
	});
}

document.addEventListener('DOMContentLoaded', () => {
	initCustomSelects();

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
			// Reset custom select
			const customSelect = form.querySelector('.custom-select');
			if (customSelect) {
				const valueDisplay = customSelect.querySelector('.custom-select-value');
				const firstOption = customSelect.querySelector('.custom-select-option');
				valueDisplay.textContent = firstOption.textContent;
				customSelect.querySelector('input[type="hidden"]').value = '';
				customSelect.querySelectorAll('.custom-select-option').forEach(opt => {
					opt.classList.remove('selected');
				});
			}
			form.reset();
			setTimeout(() => {
				btn.textContent = 'Send Message';
				btn.disabled = false;
			}, 3000);
		}, 1200);
	});
});
