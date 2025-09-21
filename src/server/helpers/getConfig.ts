import { FirebaseOptions } from 'firebase/app';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

export function getFireBaseConfig(): FirebaseOptions | undefined {
    const secretsPath = path.resolve(__dirname, '../../../secrets.yaml');
    try {
        const fileContents = fs.readFileSync(secretsPath, 'utf8');
        const secrets = yaml.load(fileContents) as Record<string, Record<string, string>>;
        return secrets['fireBaseConfig'];
    } catch (err) {
        console.log('Error reading secrets.yaml:', err);
        return undefined;
    }
}