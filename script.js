document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    
    const closeNav = () => {
        mobileNavOverlay.classList.remove('open');
        document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', () => {
        mobileNavOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; 
    });

    closeMenu.addEventListener('click', closeNav);

    document.querySelectorAll('.mobile-nav-menu a').forEach(link => {
        link.addEventListener('click', closeNav);
    });


    // 2. Project Modal Functionality (Only runs if project cards and modal exist)
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');

    if (projectCards.length > 0 && modal) {
        const closeModal = document.querySelector('.modal .close-btn');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalImage = document.getElementById('modal-image');
        const modalLink = document.querySelector('.modal-link');

        projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get data from the clicked card
                const title = card.getAttribute('data-title');
                const description = card.getAttribute('data-desc');
                const imgSrc = card.querySelector('.project-thumb').src;

                // Populate the modal
                modalTitle.textContent = title;
                modalDescription.textContent = description;
                // Use the thumb source, replacing the placeholder size if possible (or just use the thumb image)
                modalImage.src = imgSrc.includes('placeholder') ? imgSrc.replace('600x400', '800x600') : imgSrc;
                modalLink.href = card.href !== '#' ? card.href : '#case-study-preview'; // Use real link if available

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; 
            });
        });

        const closeProjectModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        };

        closeModal.addEventListener('click', closeProjectModal);
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeProjectModal();
            }
        });
    }

    // 3. Set Current Year in Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 4. Active Navigation Link Highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-menu a, .mobile-nav-menu a').forEach(link => {
        let linkHref = link.getAttribute('href').split('/').pop();
        if (linkHref === '' || linkHref.startsWith('#')) linkHref = 'index.html'; 

        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});