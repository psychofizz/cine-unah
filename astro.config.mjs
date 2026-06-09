// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
    site: 'https://taquilla.cine',
    output: 'server',
    adapter: vercel({
        imageService: true,
        imagesConfig: {
            minimumCacheTTL: 2678400, // 31 days
            formats: ['image/webp'],
            sizes: [320, 640, 768, 1024, 1280, 1536],
        },
    }),
    image: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.tina.io',
            },
        ],
    },
});
