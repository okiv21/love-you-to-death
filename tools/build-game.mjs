import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const parts=['district.js','world-art.js','interface.js','mechanics.js','demo.js'];
const source=parts.map(p=>readFileSync(root+'playcanvas/src/'+p,'utf8')).join('\n\n');
for(const target of ['playcanvas/midnight-grounds.js','dist/sandbox/midnight-grounds.js'])writeFileSync(root+target,source);
console.log('Built PlayCanvas and standalone demo.');
