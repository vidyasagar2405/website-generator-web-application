
document.addEventListener('DOMContentLoaded', () => {
    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light' || (!currentTheme && prefersLight)) {
        document.body.classList.add('light-mode');
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
                // observer.unobserve(entry.target); // Optional: unobserve once animated
            } else {
                // Optional: to re-animate when scrolling back up
                // entry.target.classList.remove('visible');
                // entry.target.classList.add('hidden');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-panel, .glass-card, .skill-tag, .project-card, .certification-card').forEach(el => {
        el.classList.add('hidden'); // Add hidden class initially
        observer.observe(el);
    });

    // Project Filtering
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.projects-container .project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            projectCards.forEach(card => {
                const cardCategory = card.dataset.category;
                if (category === 'All' || cardCategory === category) {
                    card.classList.remove('hidden-category');
                    card.classList.add('visible-category');
                    card.style.display = 'flex'; // Ensure it's displayed for animation
                } else {
                    card.classList.add('hidden-category');
                    card.classList.remove('visible-category');
                    // Use setTimeout to allow opacity/transform transition before hiding completely
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400); // Should match CSS transition duration
                }
            });
        });
    });

    // Trigger initial filter for 'All' to show all projects and apply animations
    const allButton = document.querySelector('.project-filter-btn[data-category="All"]');
    if (allButton) {
        allButton.click();
    }
});
