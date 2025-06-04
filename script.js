// === 導覽選單功能 ===
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const appBar = document.querySelector(".top-app-bar");
    
    // 檢查元素是否存在（可能在某些頁面不存在）
    if (!menuToggle || !mobileMenu || !appBar) {
        console.warn("Navigation elements not found on this page");
        return;
    }
    
    let isMenuOpen = false;

    // 開關選單
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            // 打開選單
            mobileMenu.style.display = "flex";
            setTimeout(() => {
                mobileMenu.classList.add('show');
            }, 10); // 短暫延遲確保動畫效果
            menuToggle.classList.add('active');
        } else {
            // 關閉選單
            mobileMenu.classList.remove('show');
            setTimeout(() => {
                mobileMenu.style.display = "none";
            }, 300); // 等待動畫完成
            menuToggle.classList.remove('active');
        }
        
        // 更新按鈕圖標
        const icon = menuToggle.querySelector('.material-icons');
        if (icon) {
            icon.textContent = isMenuOpen ? 'close' : 'menu';
        }
    }

    // 關閉選單
    function closeMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            mobileMenu.classList.remove('show');
            menuToggle.classList.remove('active');
            setTimeout(() => {
                mobileMenu.style.display = "none";
            }, 300);
            
            const icon = menuToggle.querySelector('.material-icons');
            if (icon) {
                icon.textContent = 'menu';
            }
        }
    }

    // 點擊漢堡選單按鈕
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // 點擊選單項目後關閉
    const menuLinks = mobileMenu.querySelectorAll('.nav-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // 點擊選單外的區域關閉選單
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !appBar.contains(e.target)) {
            closeMenu();
        }
    });

    // 按 ESC 鍵關閉選單
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    // 視窗大小改變時關閉選單（切換到電腦版時）
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMenu();
        }
    });
});

// === 聊天介紹動畫 ===
document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("chat-section");
    
    // 檢查元素是否存在（因為不是所有頁面都有聊天區塊）
    if (!section) {
        return; // 如果沒有聊天區塊就跳過
    }
    
    const messages = section.querySelectorAll(".chat-message");

    // 如果沒有消息就跳過
    if (messages.length === 0) {
        return;
    }

    const options = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                messages.forEach((msg, i) => {
                    setTimeout(() => {
                        msg.style.opacity = "1";
                        msg.style.transform = "translateY(0)";
                    }, i * 600); // 每句話間隔 600ms 出現
                });
                observer.unobserve(entry.target);
            }
        });
    }, options);

    observer.observe(section);
});

// === Blog 頁面功能 ===
document.addEventListener("DOMContentLoaded", () => {
    // 篩選功能
    const filterTabs = document.querySelectorAll('.filter-tab');
    const blogCards = document.querySelectorAll('.blog-card');
    const tagItems = document.querySelectorAll('.tag-item');

    // 檢查是否在blog頁面
    if (filterTabs.length === 0) return;

    // 篩選函數
    function filterArticles(category) {
        blogCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // 篩選標籤點擊事件
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有活躍狀態
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // 添加活躍狀態到當前標籤
            tab.classList.add('active');
            
            // 執行篩選
            const category = tab.dataset.category;
            filterArticles(category);
        });
    });

    // 側邊欄標籤點擊事件
    tagItems.forEach(tag => {
        tag.addEventListener('click', () => {
            const category = tag.dataset.category;
            
            // 同步更新篩選標籤狀態
            filterTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.category === category) {
                    tab.classList.add('active');
                }
            });
            
            // 如果沒有對應的篩選標籤，設置"全部"為活躍
            const hasActiveTab = Array.from(filterTabs).some(tab => tab.classList.contains('active'));
            if (!hasActiveTab) {
                const allTab = document.querySelector('.filter-tab[data-category="all"]');
                if (allTab) allTab.classList.add('active');
            }
            
            // 執行篩選
            filterArticles(category);
        });
    });

    // 載入更多按鈕功能（示例）
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // 這裡可以添加載入更多文章的邏輯
            loadMoreBtn.innerHTML = '<span class="icon">⏳</span>載入中...';
            
            setTimeout(() => {
                loadMoreBtn.innerHTML = '<span class="icon">✅</span>已載入所有文章';
                loadMoreBtn.disabled = true;
                loadMoreBtn.style.opacity = '0.6';
                
                // 更新提示文字
                const loadMoreText = document.querySelector('.load-more-text');
                if (loadMoreText) {
                    loadMoreText.textContent = '所有文章都已顯示！更多精彩內容敬請期待 ✨';
                }
            }, 1500);
        });
    }

    // 為blog卡片添加初始動畫樣式
    blogCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100 + 300); // 錯開動畫時間
    });
});

// === 平滑滾動功能 ===
document.addEventListener("DOMContentLoaded", () => {
    // 為所有內部錨點連結添加平滑滾動
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // 跳過空錨點
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// === 返回頂部功能 ===
document.addEventListener("DOMContentLoaded", () => {
    // 創建返回頂部按鈕（可選功能）
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--color-primary-500);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(174, 233, 238, 0.3);
    `;

    document.body.appendChild(backToTopButton);

    // 顯示/隱藏返回頂部按鈕
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });

    // 點擊返回頂部
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // hover 效果
    backToTopButton.addEventListener('mouseenter', () => {
        backToTopButton.style.background = 'var(--color-primary-700)';
        backToTopButton.style.transform = 'translateY(-2px)';
    });

    backToTopButton.addEventListener('mouseleave', () => {
        backToTopButton.style.background = 'var(--color-primary-500)';
        backToTopButton.style.transform = 'translateY(0)';
    });
});

// === Blog 系統整合功能 ===
document.addEventListener("DOMContentLoaded", () => {
    // 自動轉換舊的文章連結為新格式
    function updateLegacyLinks() {
        const links = document.querySelectorAll('a[href*="exchangestudent-"]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href.endsWith('.html')) {
                const slug = href.replace('.html', '').replace('./', '');
                link.setAttribute('href', `./article.html?post=${slug}`);
            }
        });
    }

    // 執行連結更新
    updateLegacyLinks();

    // 為 coming-soon 文章添加點擊提示
    const comingSoonCards = document.querySelectorAll('.coming-soon');
    comingSoonCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 創建提示訊息
            const tooltip = document.createElement('div');
            tooltip.textContent = '文章即將發布，敬請期待！✨';
            tooltip.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--color-primary-500);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                font-weight: 500;
                z-index: 10000;
                box-shadow: 0 8px 24px rgba(174, 233, 238, 0.3);
                animation: fadeInOut 2s ease-in-out;
            `;

            // 添加CSS動畫
            if (!document.querySelector('#coming-soon-animation')) {
                const style = document.createElement('style');
                style.id = 'coming-soon-animation';
                style.textContent = `
                    @keyframes fadeInOut {
                        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                    }
                `;
                document.head.appendChild(style);
            }

            document.body.appendChild(tooltip);

            // 2秒後移除提示
            setTimeout(() => {
                document.body.removeChild(tooltip);
            }, 2000);
        });
    });
});

// === 文章頁面特殊功能 ===
document.addEventListener("DOMContentLoaded", () => {
    // 檢查是否為文章頁面
    if (window.location.pathname.includes('article.html') || 
        window.location.search.includes('post=')) {
        
        // 目錄高亮功能
        function highlightCurrentSection() {
            const headings = document.querySelectorAll('.article-content h1, .article-content h2, .article-content h3, .article-content h4');
            const tocLinks = document.querySelectorAll('.toc-link');
            
            if (headings.length === 0 || tocLinks.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        
                        // 移除所有活躍狀態
                        tocLinks.forEach(link => link.classList.remove('active'));
                        
                        // 添加當前活躍狀態
                        const activeLink = document.querySelector(`.toc-link[href="#${id}"]`);
                        if (activeLink) {
                            activeLink.classList.add('active');
                        }
                    }
                });
            }, {
                rootMargin: '-20% 0px -20% 0px',
                threshold: 0
            });

            headings.forEach(heading => {
                observer.observe(heading);
            });
        }

        // 延遲執行，等待文章載入完成
        setTimeout(highlightCurrentSection, 1000);

        // 閱讀進度條
        function addReadingProgress() {
            const progressBar = document.createElement('div');
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500));
                z-index: 1001;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);

            window.addEventListener('scroll', () => {
                const article = document.querySelector('.article-content');
                if (!article) return;

                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight - windowHeight;
                const scrollTop = window.pageYOffset;
                const progress = (scrollTop / documentHeight) * 100;

                progressBar.style.width = Math.min(progress, 100) + '%';
            });
        }

        // 添加閱讀進度條
        setTimeout(addReadingProgress, 1000);

        // 預估閱讀時間計算
        function estimateReadingTime() {
            const content = document.querySelector('.article-content');
            if (!content) return;

            const text = content.textContent || content.innerText;
            const wordsPerMinute = 250; // 中英文混合閱讀速度
            const words = text.trim().split(/\s+/).length;
            const readingTime = Math.ceil(words / wordsPerMinute);

            const readTimeElement = document.getElementById('read-time');
            if (readTimeElement && !readTimeElement.textContent.includes('分鐘')) {
                readTimeElement.textContent = `預估 ${readingTime} 分鐘閱讀`;
            }
        }

        // 計算閱讀時間
        setTimeout(estimateReadingTime, 1000);
    }
});

// === 工具函數 ===
// 防抖函數（用於優化性能）
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 節流函數（用於優化性能）
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// === 錯誤處理 ===
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // 可以在這裡添加錯誤回報邏輯
});

// === 效能監控（開發時使用） ===
if (window.performance && window.performance.measure) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const navigation = window.performance.getEntriesByType('navigation')[0];
            console.log(`頁面載入時間: ${navigation.loadEventEnd - navigation.loadEventStart}ms`);
        }, 0);
    });
}

// === 深色模式切換（未來功能） ===
function initThemeToggle() {
    // 預留深色模式功能
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// === SEO 和分析增強 ===
document.addEventListener("DOMContentLoaded", () => {
    // 結構化資料（JSON-LD）
    function addStructuredData() {
        if (window.location.pathname.includes('article.html')) {
            // 為文章頁面添加結構化資料
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "author": {
                    "@type": "Person",
                    "name": "Sophia Lue"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "阿泥在哪裡？",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://yourdomain.com/logo.png"
                    }
                }
            });
            document.head.appendChild(script);
        }
    }

    addStructuredData();
});