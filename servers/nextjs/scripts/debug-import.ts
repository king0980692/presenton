
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function debug() {
    const filePath = path.join(path.resolve(__dirname, '..'), 'presentation-templates/modern-minimalist/minimal-coverLayout.tsx');
    // On Windows, import() needs file:/// URL
    const fileUrl = 'file:///' + filePath.split(path.sep).join('/');
    console.log(`Importing ${fileUrl}...`);
    try {
        const mod = await import(fileUrl);
        console.log('Keys:', Object.keys(mod));
        console.log('Schema:', mod.Schema ? 'Found' : 'Missing');
    } catch (err) {
        console.error('Import failed:', err);
    }
}

debug();
