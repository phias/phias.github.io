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