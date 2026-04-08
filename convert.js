const fs = require('fs');

let html = fs.readFileSync('dashboard.html', 'utf8');

let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (!bodyMatch) {
  console.log("No body found");
  process.exit(1);
}
let b = bodyMatch[1];

b = b.replace(/class=/g, 'className=')
     .replace(/for=/g, 'htmlFor=')
     .replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}')
     .replace(/style="font-variation-settings: 'FILL' 1;"/g, "style={{ fontVariationSettings: \"'FILL' 1\" }}")
     .replace(/style="width: (\d+)%"/g, "style={{ width: '$1%' }}")
     // Fix self-closing tags
     .replace(/<img([^>]*)>/g, (m, p1) => p1.endsWith('/') ? m : `<img${p1} />`)
     .replace(/<input([^>]*)>/g, (m, p1) => p1.endsWith('/') ? m : `<input${p1} />`)
     .replace(/<hr([^>]*)>/g, (m, p1) => p1.endsWith('/') ? m : `<hr${p1} />`)
     .replace(/<br([^>]*)>/g, (m, p1) => p1.endsWith('/') ? m : `<br${p1} />`)
     // Some disabled tags 
     .replace(/disabled=""/g, "disabled={true}");

let finalComponent = `export default function Dashboard() {
  return (
    <div className="bg-surface text-on-background min-h-screen flex">
${b}
    </div>
  );
}`;

fs.writeFileSync('src/app/page.tsx', finalComponent, 'utf8');
