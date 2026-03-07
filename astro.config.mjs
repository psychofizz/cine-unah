// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
    site: 'https://taquilla.cine',
    output: 'server',
    adapter: vercel({
        imageService: true,
    }),
    image: {
        domains: ['assets.tina.io', 'res.cloudinary.com'],
    },
});
