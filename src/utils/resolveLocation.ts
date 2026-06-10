interface LocationInfo {
  slug: string;
  title: string;
}

export function resolveLocation(location: any): LocationInfo | null {
  if (!location) return null;

  if (typeof location === 'object') {
    const slug = location._sys?.filename || location.id?.split('/').pop()?.replace('.md', '') || '';
    return {
      slug,
      title: location.title || location.id || slug,
    };
  }

  if (typeof location === 'string') {
    // Extract slug from path (e.g. "src/content/ubicaciones/cise.md" -> "cise")
    const slug = location.split('/').pop()?.replace('.md', '') || '';
    
    try {
      const localUbicacionesGlob = import.meta.glob("../content/ubicaciones/*.md", { eager: true });
      const matchKey = Object.keys(localUbicacionesGlob).find(k => k.endsWith(`/${slug}.md`));
      if (matchKey) {
        const mod: any = localUbicacionesGlob[matchKey];
        return {
          slug,
          title: mod.frontmatter?.title || slug,
        };
      }
    } catch (e) {
      // Fallback if glob fails
    }

    return {
      slug,
      title: slug.toUpperCase(), // Fallback e.g. "cise" -> "CISE"
    };
  }

  return null;
}
