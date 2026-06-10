// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
    site: 'https://taquilla.cine',
    output: 'server',
    adapter: vercel(),
    image: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.tina.io',
            },
        ],
    },
});
