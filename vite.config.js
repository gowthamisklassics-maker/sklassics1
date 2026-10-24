import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Local Flask backend by default.
  // You can override this in .env.development.
  const apiTarget =
    env.VITE_DEV_API_TARGET?.trim() || 'https://easyfindtrip.com';

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],

    server: {
      host: '0.0.0.0',
      port: 5082,

      allowedHosts: [
        'sklassics.in',
        '.sklassics.in',
        'sklassicsacademy.com',
        '.sklassicsacademy.com',
        'localhost',
        '127.0.0.1',
      ],

      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
        '/static': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },

    preview: {
      allowedHosts: [
        'sklassics.in',
        '.sklassics.in',
        'sklassicsacademy.com',
        '.sklassicsacademy.com',
        'localhost',
        '127.0.0.1',
      ],
    },
  };
});
