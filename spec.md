# Case Study Redesign Specification

## Overview

This document outlines the specifications for redesigning `casestudy.html` based on the provided design mockup and the `ui-ux-pro-max` guidelines.

## Layout & Structure

1. **Two-Column Layout (Main Area)**:
   - **Sidebar (Left)**: Contains filtering options ("專案類型").
     - Structure: White sticky card container (`24px` rounded corners, soft shadow).
     - Title: "folder 專案類型" (Material Icon, Teal color `var(--color-primary-900)`, Extra Bold).
     - Options: 全部專案 (Active), 產品設計, UX 研究, Side Project.
     - Inactive state: Teal text, `20px` rounded corners, large padding.
     - Active state: Light cyan background (`var(--color-primary-100)`), Teal text, `20px` border-radius.
   - **Projects Area (Right)**:
     - **Featured Project (Top)**: A large horizontal card.
       - Structure: Left side contains a badge ("實習專案"), title, description, tags, and a CTA button ("查看專案"). Right side contains a large image.
     - **Other Projects Grid (一般專案)**: A 2-column grid displaying general projects below the featured project.
       - Card Structure: Image on top with an overlapping badge on top-left. Below image: Title, description, tags, and a circular arrow icon button on the bottom right.
       - **Card 1 (Timesaw Puzzle)**:
         - Badge: Side Project
         - Title: Timesaw Puzzle 時間管理工具
         - Description: 開發創新的時間管理應用程式，結合遊戲化元素幫助用戶...
         - Tags: # tag
       - **Card 2 (線上學習平台優化)**:
         - Badge: 實戰營專案
         - Title: 線上學習平台優化
         - Description: 參與 UXTW 實戰營，協助優化線上學習平台的使用體驗。...
         - Tags: # tag

2. **Footer**:
   - Four columns/cards:
     - 關於阿泥 (About): Contains text and a "聯絡我" (Contact) button with cyan background.
     - 探索內容 (Navigation): "Casestudy" is active (gray background). "Portfolio" and "Blog" have cyan background.
     - 支持創作 (Support): "贊助連結" button with pink background.
     - 社群連結 (Social): "Instagram" and "LinkedIn" buttons with pale orange background.

## UI/UX Styling Details (Sophia's Magic Corner)

- **Pattern**: Portfolio Grid (Cards with visual emphasis).
- **Colors**:
  - Background: Off-white / very light gray (`#F8FAFC` or similar).
  - Cards: White (`#FFFFFF`) with soft, diffuse drop shadows for a "floating" glass/card effect.
  - Active Menu Item (Sidebar): Light Cyan (`#E0F2FE` or similar).
  - Pink Accents (Badges, CTA buttons in project cards, Support button): Light Pink background (`#FCE7F3`) with darker pink text/icon.
  - Orange/Peach Accents (Social buttons): Light Orange background (`#FFEDD5`) with darker orange text.
  - Cyan Accents (About button, inactive Footer nav): Light Cyan background (`#CCFBF1`) with darker teal text.
  - Tags (`# tag`): Light Gray background, smaller font size.
- **Typography**:
  - Sans-serif, clean fonts.
  - Headings are bold and prominent.
  - Descriptions are smaller, with muted text color (e.g., `#64748B`).
- **Shapes & Borders**:
  - Soft rounded corners for all cards, images, and buttons (e.g., `border-radius: 16px` to `24px` for cards).
- **Interactions**:
  - Smooth hover states on all buttons and cards (`cursor-pointer`).
  - Expected hover effect on cards: slight lift (transform translateY) and shadow increase.

## Implementation Plan

1. **HTML Structure**: Update `casestudy.html` to reflect the layout:
   - Refactor `sidebar` to match the exact tags and remove "技能標籤" if it's no longer in the design (the image only shows "專案類型").
   - Update `.featured-card` to match the horizontal flex layout and styling in the design.
   - Update `.card-stack-container` to be a 2-column grid instead of a stack. Ensure individual project cards match the new design (top image, overlapping badge, bottom content with tags and arrow button).
   - Update footer button classes and HTML structure/icons if necessary to match the new color-coded buttons.
2. **CSS Styles**: Add missing rules in `style.css` to implement the colors, shadows, border-radiuses, and layouts outlined above.
3. **Responsive Design**: Ensure it collapses to a single column on mobile screens.

## Pre-delivery Checklist

- [ ] No emojis as icons (use SVG or Material Icons).
- [ ] `cursor-pointer` on all clickable elements.
- [ ] Hover states with smooth transitions.
- [ ] Matches the provided design mockup's color theme and soft UI vibes.

## CSS Refactoring (casestudy-design.css Merge)

### Objective

Merge `casestudy-design.css` into `style.css` to consolidate styles, improve maintainability, and resolve global class duplication/conflict issues.

### Conflict Resolution Strategy

1. **Remove deprecated styles**: Clean up the original `7.4 Case Study Page` section in `style.css` completely, as they are overridden and replaced by the new redesign styles in `casestudy-design.css`.
2. **Namespace conflicting classes**: The new `.project-title` and `.project-desc` in `casestudy-design.css` share names with styles meant for individual project pages (`/* 9.1 Project Header */` in `style.css`). To safely isolate them to the Casestudy listing page, prefix these two selectors with `.page-casestudy` (i.e. `.page-casestudy .project-title`).
3. **HTML Update**: Remove the `<link href="casestudy-design.css">` tag in `casestudy.html`.
4. **Clean up**: Delete the standalone `casestudy-design.css` file once successfully merged.

## Financial Car Redesign Specification

### 競品分析 (Competitive Analysis) Section

1. **Location**: Append after the `process-outer-card` in `financial-car.html`.
2. **Layout & Content**:
   - Block Title: "競品分析"
   - Block Description: "了解基富通、大戶豐、創富通、momo的相關產品特色，及其解決方式"
   - Image Content: Use `img/produsts.png` to represent the comparison table.
3. **Styling**:
   - Container (`.competitor-card`): Use a `var(--color-surface-50)` white background with a soft drop shadow (`0 16px 60px rgba(...)`) and large rounded corners (`40px`), similar to the `process-outer-card`.
   - Background Accent: Add a soft radial gradient (orange/peach tint) to the top-left corner using a pseudo-element (`::before`) to match the visual reference.
   - Typography:
     - Title in bold orange (`#E86F2C` or similar mapped primary/secondary hue).
     - Subtitle in smaller, muted orange/brown.
   - Image Container: Wrap the image in a rounded container with a subtle border.
4. **Responsiveness**:
   - Scale padding and text size appropriately on tablet (`max-width: 1024px`) and mobile (`max-width: 768px`) breakpoints.

### Wireframe (手繪線框稿) Section

1. **Location**: Append after the `.competitor-analysis-block` in `financial-car.html`.
2. **Layout & Content**:
   - Image Content: Use `img/financial-wireframe.JPG` on top.
   - Title: "手繪線框稿" below the image, left-aligned.
3. **Styling**:
   - Container (`.wireframe-block`): Use a `var(--color-surface-50)` white background with the same soft drop shadow (`0 16px 60px rgba(...)`) and large rounded corners (`40px`) as `.competitor-analysis-block`.
   - Structural Layout: Flex column, with an image wrapper on top and a title at the bottom.
   - Image wrapper: Large inner rounded corners (`32px` or `24px`) with a subtle border.
   - Typography: Title in bold dark color (`var(--color-text-900)`), large headline font.
4. **Responsiveness**:
   - Share the responsive padding and border-radius rules with `.process-outer-card` and `.competitor-analysis-block`.

### UI Flow (介面流程) Section

1. **Location**: Append after the `.wireframe-block` inside `financial-car.html`.
2. **Layout & Content**:
   - Title: "UI Flow介面流程" (with `.ui-flow-title`).
   - Image Content: Use `img/financial-UI-flow.png`.
3. **Styling**:
   - Container (`.ui-flow-block`): Use `var(--color-surface-50)` background, soft drop shadow (`0 16px 60px rgba(...)`), and large rounded corners (`40px`), equivalent to other detail blocks.
   - Background Accent: Similar soft radial gradient (orange/peach tint) to the top-left corner using a pseudo-element (`::before`), identical to the `competitor-analysis-block` glow.
   - Image Wrapper (`.ui-flow-image-wrapper`): Rounded inner corners (`24px`) matching the wireframe and competitor blocks.
   - Typography: Title in bold dark color (`var(--color-text-900)`), large headline font, left-aligned.
4. **Interaction (Tooltip)**:
   - Implement progressive disclosure for `.ui-flow-tooltip` to prevent the dialog from obscuring the image. The tooltip initially shows the title with an info icon, and expands on hover to display the full flow list.
5. **Responsiveness**:
   - Add `.ui-flow-block` to the shared media query selectors for responsive padding and border-radius.
   - On mobile screens, keep the `.ui-flow-tooltip` expanded by default below the title.

### Header Redesign Specification (Based on Mockup)

1. **Brand Title Layout**:
   - The original title text (`✨阿泥在哪裡？｜Sophia's Magic Corner🧙‍♀️`) was simplified and reformatted.
   - Now reads: `✨ 阿泥在哪裡？ | Sophia's Magic Corner 🧙` with spaces around the vertical separator.
   - The vertical separator `|` uses `var(--color-divider)` to appear subtle as per the mockup.
   - Text color overrides the default primary color to use `var(--color-text-900)` for better contrast matching the design.
2. **Navigation Links Layout & Colors**:
   - Changed the corresponding primary color classes of the navigation links to secondary, tertiary, and primary to match the varied icon and text colors from the screenshot:
     - `作品集`: Uses `.btn--secondary` class (orange) with the `category` Material symbol.
     - `案例研究`: Uses `.btn--tertiary` class (pink) with the `leaderboard` Material symbol.
     - `部落格`: Maintains `.btn--primary` class (blue/cyan) with the `menu_book` Material symbol.
   - These changes were uniformly applied to both the desktop `.nav-links` and the `.mobile-menu` wrappers.

### Global Header Propagation

1. **Objective**:
   - The new redesigned header (including `top-app-bar`, `.btn--text` configurations, and specific colors/icons) originally designed for `financial-car.html` needs to be consistently applied across all HTML files in the project.
2. **Affected Files**:
   - `casestudy.html`
   - `exchangestudent-0.html`
   - `exchangestudent-1.html`
   - `exchangestudent-2.html`
   - `blog.html`
   - `index.html`
   - `lifePuzzle202510.html`
   - `portfolio.html`
   - `timesaw.html`
3. **Execution**:
   - Replace the `<header class="top-app-bar">...</header>` section in each of the affected files with the updated `<header class="top-app-bar">...</header>` from `financial-car.html`.

### Header Navigation Interaction (導覽列互動設計)

根據 `ui-ux-pro-max` 原則，為提升使用者的動態與魔法氛圍，我們將為 Header 導覽列加入微互動（Micro-interactions）設計：

1. **導覽列按鈕 (Navigation Links - `.nav-links .btn` / `.mobile-menu .btn`)**:
   - **滑鼠懸停 (Hover) 時**:
     - 按鈕主體產生微小上浮 (`transform: translateY(-2px)`) 並加深其帶有品牌色的柔和光輝與背景色 (`box-shadow`, `background-color`)。
     - 內部 Material Design 圖示產生平滑縮放與旋轉 (`transform: scale(1.15) rotate(-5deg)`)，傳遞點擊暗示與活潑感受。

2. **網站標題 (Site Title - `.site-title`)**:
   - **滑鼠懸停 (Hover) 時**:
     - 整體群組輕微放大 (`transform: scale(1.02)`) 提升點擊焦點。
     - 特別針對前面的星星圖示 (`auto_awesome`) 加入 180 度的平滑旋轉 (`transform: rotate(180deg)`)，呼應「Sophia's Magic Corner」的魔幻風格。

3. **轉場效果 (Transitions)**:
   - 所有的互動效果皆會加入流暢的貝茲曲線轉場 (`transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`) 確保視覺感受舒適。
