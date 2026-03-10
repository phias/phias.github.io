import re
import uuid

def process_file(html_file, css_file):
    with open(html_file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # 找尋包含 style="..." 的所有標籤
    # <([^>]+?)\sstyle="([^"]*)"([^>]*)>
    pattern = re.compile(r'<([a-zA-Z0-9\-]+)([^>]*?)\sstyle="([^"]*)"([^>]*)>')
    
    new_css = []
    
    def replacer(match):
        tag = match.group(1)
        attr1 = match.group(2)
        style = match.group(3).strip()
        attr2 = match.group(4)
        
        if not style:
            return f"<{tag}{attr1}{attr2}>"
            
        # 看看原本有沒有 class
        class_pattern = re.search(r'class="([^"]*)"', attr1 + attr2)
        classes = []
        if class_pattern:
            classes = class_pattern.group(1).split()
            
        if classes:
            base_class = classes[-1]
            target_class = f"extracted-{base_class}-{str(uuid.uuid4())[:4]}"
        else:
            target_class = f"auto-style-{str(uuid.uuid4())[:8]}"
            
        # add the target class to the element
        # if element already had class=", we insert the new class inside
        # Otherwise add class="target_class"
        
        new_attr = attr1 + attr2
        if class_pattern:
            new_attr = new_attr.replace(f'class="{class_pattern.group(1)}"', f'class="{class_pattern.group(1)} {target_class}"')
        else:
            new_attr += f' class="{target_class}"'
            
        new_css.append(f"\\n/* Extracted from {html_file.split('/')[-1]} */\\n.{target_class} {{\\n    {style.replace('; ', ';\\n    ')}\\n}}")
        
        return f"<{tag}{new_attr}>"
        
    new_html = pattern.sub(replacer, html)
    
    if new_css:
        with open(css_file, 'a', encoding='utf-8') as f:
            f.write('\n'.join(new_css))
            
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(new_html)
            
        print(f"Extracted {len(new_css)} styles from {html_file}")
    else:
        print(f"No styles to extract from {html_file}")

process_file('portfolio.html', 'style.css')
process_file('porfolio-formal.html', 'style.css')
