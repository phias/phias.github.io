document.addEventListener("DOMContentLoaded", () => {
    // === 導覽選單功能 ===
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const appBar = document.querySelector(".top-app-bar");
    if (menuToggle && mobileMenu && appBar) {
        let isMenuOpen = false;
        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.style.display = "flex";
                setTimeout(() => { mobileMenu.classList.add('show'); }, 10);
                menuToggle.classList.add('active');
                menuToggle.setAttribute('aria-expanded', "true");
            } else {
                mobileMenu.classList.remove('show');
                setTimeout(() => { mobileMenu.style.display = "none"; }, 300);
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', "false");
            }
            const icon = menuToggle.querySelector('.material-symbols-rounded');
            if (icon) icon.textContent = isMenuOpen ? 'close' : 'menu';
        }
        function closeMenu() {
            if (isMenuOpen) {
                isMenuOpen = false;
                mobileMenu.classList.remove('show');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', "false");
                setTimeout(() => { mobileMenu.style.display = "none"; }, 300);
                const icon = menuToggle.querySelector('.material-symbols-rounded');
                if (icon) icon.textContent = 'menu';
            }
        }
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu();
        });
        mobileMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !appBar.contains(e.target)) closeMenu();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) closeMenu();
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && isMenuOpen) closeMenu();
        });
    }

    // === 聊天介紹動畫 ===
    const section = document.getElementById("chat-section");
    if (section) {
        const messages = section.querySelectorAll(".chat-message");
        if (messages.length > 0) {
            const options = { threshold: 0.2 };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        messages.forEach((msg, i) => {
                            setTimeout(() => {
                                msg.style.opacity = "1";
                                msg.style.transform = "translateY(0)";
                            }, i * 600);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, options);
            observer.observe(section);
        }
    }

    // === 平滑滾動功能 ===
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // === SEO 和分析增強 ===
    function addStructuredData() {
        const pathname = window.location.pathname;
        if (pathname.includes('article.html') || pathname.includes('exchangestudent-')) {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "author": { "@type": "Person", "name": "Sophia Lue" },
                "publisher": {
                    "@type": "Organization",
                    "name": "阿泥在哪裡？",
                    "logo": { "@type": "ImageObject", "url": "https://yourdomain.com/logo.png" }
                }
            });
            document.head.appendChild(script);
        }
    }
    addStructuredData();

    // === 經歷與軌跡 Accordion 收合 ===
    document.querySelectorAll('.formal-timeline-item.has-sub-cards').forEach(item => {
        function toggleAccordion() {
            const isOpen = item.classList.toggle('is-open');
            item.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
        item.addEventListener('click', toggleAccordion);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordion();
            }
        });
    });
});
