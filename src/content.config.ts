import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const eventos = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/eventos" })
});

const peliculas = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/peliculas" })
});

const ubicaciones = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/ubicaciones" })
});

export const collections = {
  eventos,
  peliculas,
  ubicaciones,
};
