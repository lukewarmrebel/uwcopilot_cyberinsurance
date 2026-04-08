const fs = require('fs');

let html = fs.readFileSync('case-workspace.html', 'utf8');
let blockMatch = html.match(/<!-- Case Header \(Sticky\) -->([\s\S]*?)<\/main>/i);

if(blockMatch) { 
    let b = blockMatch[1]; 
    b = b.replace(/class=/g, 'className=')
         .replace(/for=/g, 'htmlFor=')
         .replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}')
         .replace(/style=\"[^\"]*\"/g, ''); 
         
    b = b.replace(/<img(.*?)>/g, (m, p1) => {
        if(p1.endsWith('/')) return m;
        return `<img${p1} />`;
    });
    
    b = b.replace(/<input(.*?)>/g, (m, p1) => {
        if(p1.endsWith('/')) return m;
        return `<input${p1} />`;
    });
    
    b = b.replace(/disabled=\"\"/g, 'disabled={true}'); 
    
    fs.mkdirSync('src/app/case', {recursive: true}); 
    
    let out = `import React from "react";

export default function CaseWorkspace() {
  return (
    <div className="flex-1 flex flex-col pt-16 h-screen overflow-hidden">
${b}
    </div>
  );
}`;
    fs.writeFileSync('src/app/case/page.tsx', out, 'utf8'); 
    console.log('success'); 
} else { 
    console.log('no match'); 
}
