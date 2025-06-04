// blog-engine.js - Markdown 部落格系統

class BlogEngine {
    constructor() {
        this.posts = [];
        this.currentPost = null;
        this.postsDirectory = './blog/posts/';
        
        // 文章清單配置
        this.postsConfig = [
            'exchangestudent-0.md',
            'exchangestudent-1.md',
            // 可以繼續添加更多文章
        ];
    }

    // 解析 Front Matter 和 Markdown 內容
    parseMarkdownWithFrontMatter(content) {
        const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = content.match(frontMatterRegex);
        
        if (!match) {
            return {
                frontMatter: {},
                content: content
            };
        }

        const frontMatterText = match[1];
        const markdownContent = match[2];
        
        // 簡單的 YAML 解析
        const frontMatter = {};
        frontMatterText.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > -1) {
                const key = line.substring(0, colonIndex).trim();
                let value = line.substring(colonIndex + 1).trim();
                
                // 移除引號
                if ((value.startsWith('"') && value.endsWith('"')) || 
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                
                // 處理陣列 (tags)
                if (value.startsWith('[') && value.endsWith(']')) {
                    value = value.slice(1, -1).split(',').map(item => 
                        item.trim().replace(/["']/g, '')
                    );
                }
                
                frontMatter[key] = value;
            }
        });

        return {
            frontMatter,
            content: markdownContent
        };
    }

    // 載入單篇文章
    async loadPost(filename) {
        try {
            const response = await fetch(`${this.postsDirectory}${filename}`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const content = await response.text();
            const parsed = this.parseMarkdownWithFrontMatter(content);
            
            return {
                filename,
                slug: filename.replace('.md', ''),
                ...parsed.frontMatter,
                content: parsed.content,
                htmlContent: marked.parse(parsed.content)
            };
        } catch (error) {
            console.error(`載入文章失敗: ${filename}`, error);
            return null;
        }
    }

    // 載入所有文章
    async loadAllPosts() {
        const loadPromises = this.postsConfig.map(filename => this.loadPost(filename));
        const results = await Promise.all(loadPromises);
        
        // 過濾掉載入失敗的文章
        this.posts = results.filter(post => post !== null);
        
        // 按日期排序（最新的在前）
        this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        return this.posts;
    }

    // 根據 slug 找文章
    getPostBySlug(slug) {
        return this.posts.find(post => post.slug === slug);
    }

    // 生成目錄
    generateTableOfContents(htmlContent) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        
        const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const toc = [];
        
        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;
            
            toc.push({
                id,
                text: heading.textContent,
                level: parseInt(heading.tagName.charAt(1))
            });
        });
        
        return {
            toc,
            htmlContent: tempDiv.innerHTML
        };
    }

    // 渲染目錄
    renderTableOfContents(toc) {
        if (toc.length === 0) {
            return '<p class="no-toc">此文章暫無目錄</p>';
        }

        let tocHtml = '<ul class="toc-list">';
        
        toc.forEach(item => {
            const indentClass = `toc-level-${item.level}`;
            tocHtml += `
                <li class="${indentClass}">
                    <a href="#${item.id}" class="toc-link">
                        ${item.text}
                    </a>
                </li>
            `;
        });
        
        tocHtml += '</ul>';
        return tocHtml;
    }

    // 找相關文章
    getRelatedPosts(currentPost, limit = 3) {
        if (!currentPost) return [];
        
        const related = this.posts
            .filter(post => post.slug !== currentPost.slug && post.status === 'published')
            .map(post => {
                let score = 0;
                
                // 根據分類計分
                if (post.category === currentPost.category) {
                    score += 3;
                }
                
                // 根據標籤計分
                if (currentPost.tags && post.tags) {
                    const commonTags = currentPost.tags.filter(tag => 
                        post.tags.includes(tag)
                    );
                    score += commonTags.length * 2;
                }
                
                // 根據國家/城市計分
                if (post.country === currentPost.country && currentPost.country) {
                    score += 2;
                }
                if (post.city === currentPost.city && currentPost.city) {
                    score += 1;
                }
                
                return { ...post, score };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
            
        return related;
    }

    // 渲染相關文章
    renderRelatedPosts(relatedPosts) {
        if (relatedPosts.length === 0) {
            return '<p class="no-related">暫無相關文章</p>';
        }

        let html = '';
        relatedPosts.forEach(post => {
            html += `
                <article class="related-article">
                    <a href="./article.html?post=${post.slug}" class="related-link">
                        <h4>${post.title}</h4>
                        <p class="related-meta">
                            <span class="related-date">${post.date}</span>
                            <span class="related-category">${post.category}</span>
                        </p>
                        <p class="related-description">${post.description || ''}</p>
                    </a>
                </article>
            `;
        });
        
        return html;
    }

    // 更新頁面 meta 資訊
    updatePageMeta(post) {
        document.getElementById('article-title').textContent = `${post.title} | 阿泥在哪裡？`;
        document.getElementById('meta-description').setAttribute('content', post.description || '');
        document.getElementById('meta-keywords').setAttribute('content', post.tags ? post.tags.join(', ') : '');
        document.getElementById('og-title').setAttribute('content', post.title);
        document.getElementById('og-description').setAttribute('content', post.description || '');
    }

    // 渲染文章
    renderPost(post) {
        // 更新頁面 meta
        this.updatePageMeta(post);
        
        // 更新麵包屑
        document.getElementById('breadcrumb-category').textContent = post.category || '未分類';
        
        // 更新文章標題和資訊
        document.getElementById('article-main-title').textContent = post.title;
        document.getElementById('publish-date').textContent = `發佈於 ${post.date}`;
        document.getElementById('read-time').textContent = post.readTime || '5 分鐘閱讀';
        
        // 更新標籤
        const tagsContainer = document.getElementById('article-tags');
        if (post.tags && post.tags.length > 0) {
            tagsContainer.innerHTML = post.tags.map(tag => 
                `<span class="article-tag">${tag}</span>`
            ).join('');
        }
        
        // 處理文章內容和目錄
        const { toc, htmlContent } = this.generateTableOfContents(post.htmlContent);
        document.getElementById('article-content').innerHTML = htmlContent;
        document.getElementById('table-of-contents').innerHTML = this.renderTableOfContents(toc);
        
        // 載入相關文章
        const relatedPosts = this.getRelatedPosts(post);
        document.getElementById('related-articles').innerHTML = this.renderRelatedPosts(relatedPosts);
        
        // 設置上下篇導航
        this.setupNavigation(post);
    }

    // 設置上下篇導航
    setupNavigation(currentPost) {
        const currentIndex = this.posts.findIndex(post => post.slug === currentPost.slug);
        const prevPost = this.posts[currentIndex + 1];
        const nextPost = this.posts[currentIndex - 1];
        
        const prevElement = document.getElementById('prev-article');
        const nextElement = document.getElementById('next-article');
        
        if (prevPost && prevPost.status === 'published') {
            prevElement.href = `./article.html?post=${prevPost.slug}`;
            prevElement.querySelector('.nav-title').textContent = prevPost.title;
            prevElement.style.display = 'block';
        }
        
        if (nextPost && nextPost.status === 'published') {
            nextElement.href = `./article.html?post=${nextPost.slug}`;
            nextElement.querySelector('.nav-title').textContent = nextPost.title;
            nextElement.style.display = 'block';
        }
    }

    // 顯示載入畫面
    showLoading() {
        document.getElementById('loading-screen').style.display = 'flex';
        document.getElementById('article-container').style.display = 'none';
        document.getElementById('error-screen').style.display = 'none';
    }

    // 顯示文章內容
    showArticle() {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('article-container').style.display = 'block';
        document.getElementById('error-screen').style.display = 'none';
    }

    // 顯示錯誤頁面
    showError() {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('article-container').style.display = 'none';
        document.getElementById('error-screen').style.display = 'flex';
    }

    // 初始化文章頁面
    async initArticlePage() {
        this.showLoading();
        
        try {
            // 從 URL 參數獲取文章 slug
            const urlParams = new URLSearchParams(window.location.search);
            const postSlug = urlParams.get('post');
            
            if (!postSlug) {
                throw new Error('未指定文章');
            }
            
            // 載入所有文章
            await this.loadAllPosts();
            
            // 找到對應文章
            const post = this.getPostBySlug(postSlug);
            if (!post) {
                throw new Error('文章不存在');
            }
            
            if (post.status !== 'published') {
                throw new Error('文章尚未發佈');
            }
            
            this.currentPost = post;
            this.renderPost(post);
            this.showArticle();
            
            // 設置平滑滾動
            this.setupSmoothScrolling();
            
        } catch (error) {
            console.error('初始化文章頁面失敗:', error);
            this.showError();
        }
    }

    // 設置平滑滾動
    setupSmoothScrolling() {
        document.querySelectorAll('.toc-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// 分享功能
function shareToFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareToTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.getElementById('article-main-title').textContent);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        // 簡單的提示
        const btn = event.target.closest('.share-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="icon">✅</span><span>已複製！</span>';
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    });
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', () => {
    // 只在文章頁面初始化 blog engine
    if (window.location.pathname.includes('article.html') || 
        window.location.search.includes('post=')) {
        const blogEngine = new BlogEngine();
        window.blogEngine = blogEngine; // 全域存取
        blogEngine.initArticlePage();
    }
});