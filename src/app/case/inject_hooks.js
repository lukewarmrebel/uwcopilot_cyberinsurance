const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'app', 'case', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Inject the renderFeedback calls into Rationale cards
const rationaleMarker1 = 'CHAT FURTHER</button></div>';
if (content.indexOf(rationaleMarker1) !== -1) {
    content = content.replace(rationaleMarker1, rationaleMarker1 + '{renderFeedback("rationale-healthcare")}');
}

const rationaleMarker2 = 'DEEP DIVE</button></div>';
if (content.indexOf(rationaleMarker2) !== -1) {
    content = content.replace(rationaleMarker2, rationaleMarker2 + '{renderFeedback("rationale-baserate")}');
}

// 2. Inject into Red Flag cards (just the first few as examples)
const flagMarker1 = 'psychology</span> QUESTION</button></div>';
content = content.replace(flagMarker1, flagMarker1 + '{renderFeedback("flag-vpn")}');

// 3. Inject into Overlay reasoning chain
const overlayMarker = 'perimeter vulnerability.</div>';
content = content.replace(overlayMarker, overlayMarker + '{renderFeedback("deep-dive-overlay", true)}');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully injected feedback hooks into case workspace.');
