import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packagePath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));
const currentDate = new Date();
const version = `${currentDate.getFullYear()}.${(currentDate.getMonth() + 1).toString()
.padStart(2, '0')}.${currentDate.getDate().toString().padStart(2, '0')}_${currentDate.getHours().toString().padStart(2, '0')}.${currentDate.getMinutes().toString().padStart(2, '0')}.${currentDate.getSeconds().toString().padStart(2, '0')}`;
packageJson.buildtime = version;
writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
