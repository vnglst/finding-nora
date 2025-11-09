import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-icon-*.png', 'android-icon-*.png', 'ms-icon-*.png', 'sounds/*.mp3', 'splashscreens/*.png'],
      manifest: {
        name: 'Finding Nora',
        short_name: 'Finding Nora',
        description: 'Learn to spell by finding all the letters of your name, or any other word.',
        theme_color: '#ffd332',
        background_color: '#ffd332',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'android-icon-36x36.png',
            sizes: '36x36',
            type: 'image/png'
          },
          {
            src: 'android-icon-48x48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: 'android-icon-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: 'android-icon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'android-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3,jpg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cloudinary-images-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },
  build: {
    outDir: 'build',
    sourcemap: true
  }
})
