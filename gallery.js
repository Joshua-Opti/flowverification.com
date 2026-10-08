// Deployment filters
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.filters button');
    const items = document.querySelectorAll('.deployment');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            buttons.forEach((b) => b.classList.toggle('is-active', b === button));
            const filter = button.dataset.filter;
            items.forEach((item) => {
                item.hidden = filter !== 'all' && !item.dataset.category.split(' ').includes(filter);
            });
        });
    });
});
