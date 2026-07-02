import fs from 'fs';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Copy Hero frames automatically from Downloads to public/hero-frames
try {
  const srcDir = 'C:\\Users\\Personal\\Downloads\\AIWAS\\AIWAS\\Hero';
  const destDir = path.resolve(__dirname, 'public/hero-frames');
  
  if (fs.existsSync(srcDir)) {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    const files = fs.readdirSync(srcDir);
    let copiedCount = 0;
    files.forEach(file => {
      if (file.toLowerCase().startsWith('hero_') && file.toLowerCase().endsWith('.jpg')) {
        const srcFile = path.join(srcDir, file);
        const destFile = path.join(destDir, file);
        if (!fs.existsSync(destFile) || fs.statSync(srcFile).size !== fs.statSync(destFile).size) {
          fs.copyFileSync(srcFile, destFile);
          copiedCount++;
        }
      }
    });
    if (copiedCount > 0) {
      console.log(`[Vite Config] Successfully copied ${copiedCount} new Hero frames.`);
    }
  }
} catch (err) {
  console.error('[Vite Config] Failed to copy Hero frames:', err);
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
          'react-i18next': path.resolve(__dirname, './mock-i18n.ts'),
        }
      }
    };
});
