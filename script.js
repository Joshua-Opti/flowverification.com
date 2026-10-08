// Mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav__toggle');
    const links = document.querySelector('.nav__links');

    if (toggle && links) {
        const setOpen = (open) => {
            links.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', String(open));
        };
        toggle.addEventListener('click', () => setOpen(!links.classList.contains('is-open')));
        links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !links.contains(e.target)) setOpen(false);
        });
    }

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Demo request: open a pre-filled email (static site, no backend)
    const form = document.getElementById('demoForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const interests = data.getAll('interest').join(', ') || 'Not specified';
            const body = [
                `Name: ${data.get('name')}`,
                `Company: ${data.get('company')}`,
                `Email: ${data.get('email')}`,
                `Phone: ${data.get('phone') || '-'}`,
                `Operation: ${data.get('operation')}`,
                `Interested in: ${interests}`,
                '',
                data.get('message') || '',
            ].join('\n');
            const subject = `FlowVerification demo request - ${data.get('company')}`;
            window.location.href = `mailto:info@opti-eng.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            if (typeof gtag === 'function') gtag('event', 'generate_lead', { method: 'demo_form' });
        });
    }
});
