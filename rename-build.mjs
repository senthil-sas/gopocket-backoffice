import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve the __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json to get the build name
const packageJsonPath = path.resolve(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const buildtime = packageJson.buildtime || 'default-build-name';

// Define directory paths
const oldDir = path.resolve(__dirname, 'dist');
const newDir = path.resolve(__dirname, `dist_${buildtime}`);

// Rename the directory
fs.rename(oldDir, newDir, (err) => {
    if (err) {
        // console.error('Error renaming directory:', err);
    } else {
        // console.log(`Directory renamed to: ${newDir}`);
    }
});
