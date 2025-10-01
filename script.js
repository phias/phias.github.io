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
});

// 將新的 JS 程式碼包在一個立即執行的函式中，避免與原 script.js 衝突
(function () {
    // 確保 DOM 已載入
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupCardStacker);
    } else {
        setupCardStacker();
    }

    function setupCardStacker() {
        const projects = [
            { id: 1, title: 'Timesow Puzzle 時間管理工具', description: '結合番茄鐘與拼圖遊戲的 App，讓時間管理變得更有趣。', imageUrl: 'https://placehold.co/600x450/82CFD8/FFFFFF?text=Timesow', tags: ['product-design', 'ux-research', 'ui-ux'] },
            { id: 2, title: '線上學習平台優化', description: '從使用者回饋出發，優化課程觀看與互動介面。', imageUrl: 'https://placehold.co/600x450/52ACB7/FFFFFF?text=E-Learning', tags: ['side-project', 'ux-research', 'ui-ux'] },
            { id: 3, title: '財富管理體驗優化', description: '重新釐清使用者需求，打造滿意的財富管理體驗。', imageUrl: 'https://placehold.co/600x450/FF9443/FFFFFF?text=Fintech', tags: ['product-design', 'fintech', 'data-tech'] },
            { id: 4, title: '數據儀表板設計', description: '將複雜數據轉化為清晰易懂的視覺化圖表。', imageUrl: 'https://placehold.co/600x450/FFBB6E/FFFFFF?text=Dashboard', tags: ['side-project', 'data-tech', 'ui-ux'] },
            { id: 5, title: '使用者訪談與分析', description: '透過深度訪談，挖掘使用者真實痛點與需求。', imageUrl: 'https://placehold.co/600x450/CC5680/FFFFFF?text=Interview', tags: ['ux-research'] },
            { id: 6, title: '永續時尚 App 概念', description: '一個旨在推廣二手衣物交換與租賃的平台概念。', imageUrl: 'https://placehold.co/600x450/994160/FFFFFF?text=Fashion+App', tags: ['product-design', 'side-project', 'ui-ux'] }
        ];

        const stacker = document.getElementById('card-stacker');
        if (!stacker) {
            console.error('Card stacker container not found!');
            return;
        }

        // *** 新增：獲取 DOM 元素 ***
        const featuredProjectSection = document.querySelector('.featured-project');
        const allProjectsTitle = document.querySelector('.all-projects .section-title');

        let cardElements = [];
        let currentIndex = 0;
        let visibleCards = [];
        let isScrolling = false;
        let activeFilter = 'all';

        const tagDisplayMap = {
            'product-design': '產品設計',
            'ux-research': 'UX 研究',
            'side-project': 'Side Project',
            'ui-ux': 'UI/UX設計',
            'fintech': '金融科技',
            'data-tech': '數據科技'
        };

        function createCards() {
            stacker.innerHTML = ''; // 清空容器
            cardElements = []; // 清空陣列
            projects.forEach(project => {
                const card = document.createElement('a');
                card.href = `#project-${project.id}`;
                card.className = 'project-card';
                card.dataset.tags = project.tags.join(' ');

                const chipText = tagDisplayMap[project.tags[0]] || project.tags[0];

                const tagsHtml = project.tags.map(tagKey => {
                    const displayTag = tagDisplayMap[tagKey] || tagKey;
                    return `<span class="tag"># ${displayTag}</span>`;
                }).join('');

                card.innerHTML = `
                            <div class="card-content">
                                <div class="card-chip">${chipText}</div>
                                <div class="card-image-container">
                                    <img src="${project.imageUrl}" alt="${project.title}">
                                </div>
                                <div class="card-text-content">
                                    <h4>${project.title}</h4>
                                    <p>${project.description}</p>
                                    <div class="tag-group">
                                        ${tagsHtml}
                                    </div>
                                </div>
                            </div>
                        `;
                stacker.appendChild(card);
                cardElements.push(card);
            });
        }

        function updateCardPositions() {
            if (visibleCards.length === 0) return;

            visibleCards.forEach((card, index) => {
                card.classList.remove('is-active');

                if (index < currentIndex) {
                    const stackOffset = currentIndex - index;
                    card.style.transform = `translateY(${stackOffset * -30}px) translateZ(-${stackOffset * 80}px) scale(${1 - stackOffset * 0.05})`;
                    card.style.opacity = '1';
                }
                else if (index === currentIndex) {
                    card.style.transform = `translateY(0) translateZ(0) scale(1)`;
                    card.style.opacity = '1';
                    card.classList.add('is-active');
                }
                else {
                    card.style.transform = `translateY(120%) scale(0.8)`;
                    card.style.opacity = '0';
                }

                card.style.zIndex = index;
                card.style.pointerEvents = (index === currentIndex) ? 'auto' : 'none';
            });
        }

        function filterAndArrangeCards() {
            visibleCards = cardElements.filter(card =>
                activeFilter === 'all' || card.dataset.tags.includes(activeFilter)
            );

            cardElements.forEach(card => {
                const isVisible = visibleCards.includes(card);
                card.style.display = isVisible ? 'block' : 'none';
            });

            currentIndex = Math.max(0, visibleCards.length - 1);
            updateCardPositions();
        }

        function handleScroll(e) {
            if (isScrolling || visibleCards.length <= 1) return;
            isScrolling = true;

            if (e.deltaY < 0) {
                if (currentIndex > 0) {
                    currentIndex--;
                }
            } else {
                if (currentIndex < visibleCards.length - 1) {
                    currentIndex++;
                }
            }
            updateCardPositions();

            setTimeout(() => { isScrolling = false; }, 400);
        }

        function handleFilterClick(e) {
            e.preventDefault();
            const target = e.target.closest('.tag');
            if (target && !target.classList.contains('active')) {
                document.querySelectorAll('.tag-cloud .tag').forEach(t => t.classList.remove('active'));

                const filterValue = target.dataset.filter;
                const filterText = target.textContent.trim();

                document.querySelectorAll(`.tag[data-filter="${filterValue}"]`).forEach(t => t.classList.add('active'));

                activeFilter = filterValue;

                // *** 新增：更新標題和精選專案可見度 ***
                if (allProjectsTitle && featuredProjectSection) {
                    if (filterValue === 'all') {
                        // 提取文本節點進行更改，以保留 ::before 偽元素
                        const titleTextNode = Array.from(allProjectsTitle.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
                        if (titleTextNode) titleTextNode.textContent = ' 所有專案';
                        featuredProjectSection.style.display = 'block';
                    } else {
                        const titleTextNode = Array.from(allProjectsTitle.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
                        if (titleTextNode) titleTextNode.textContent = ` ${filterText}`;
                        featuredProjectSection.style.display = 'none';
                    }
                }

                filterAndArrangeCards();
            }
        }

        stacker.addEventListener('wheel', (e) => {
            e.preventDefault();
            handleScroll(e);
        });

        document.getElementById('category-filter')?.addEventListener('click', handleFilterClick);
        document.getElementById('skill-filter')?.addEventListener('click', handleFilterClick);

        // 初始設定
        createCards();
        filterAndArrangeCards();
        window.addEventListener('resize', filterAndArrangeCards);
    }
})();