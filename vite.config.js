/**
 * vite.config.js - Build configuration for CEOTR Ltd ERP Suite
 *
 * Performance Optimizations:
 * - Code splitting enabled automatically by React.lazy imports
 * - Tree shaking for unused code elimination
 * - CSS optimization and minification
 * - Asset optimization with proper caching headers
 * - Build analysis and bundle size monitoring
 *
 * @fileoverview Vite build configuration with performance optimizations
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  build: {
    // Enable source maps for debugging in production
    sourcemap: false, // Disabled to reduce bundle size

    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React and core dependencies
          vendor: ['react', 'react-dom', 'react-router-dom'],

          // UI chunk for icons and styling
          ui: ['lucide-react'],

          // Utils chunk for helper functions
          utils: ['src/config/currency.js']
        },

        // Optimize chunk file names for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },

    // Enable minification and compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },

    // Optimize CSS
    cssCodeSplit: true,
    cssMinify: true,

    // Target modern browsers for better optimization
    target: 'esnext',

    // Enable build optimizations
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000 // Warn if chunks exceed 1MB
  },

  // Enable CSS optimization
  css: {
    devSourcemap: true
  },

  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react'
    ],
    exclude: ['@vite/client', '@vite/env']
  }
})
