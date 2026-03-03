# 🎬 Cine UNAH

Website creado para el manejo de cartelera y eventos del cine, creando asi una pagina consolidada para que la comunidad este informada de proyecciones futuras.

Una pantalla. Mucha película.

## qué hace esto?

- 🎥 **Cartelera** — muestra las pelis que estan en proyección ahora y las que vienen. hora, fecha, poster, todo visible de un vistazo.
- 🎪 **Eventos** — para las actividades especiales (noches de terror, ciclos, charlas, etc). con poster, descripción y fecha.
- 📁 **Archivo** — registro histórico de todo lo que se ha proyectado. pa' que quede constancia.
- 📱 **Mobile first** — diseñado primero para celular porque asi es como la gente lo va a ver.
- 🔗 **Compartir** — cada peli y evento se puede compartir fácil por WhatsApp, Facebook o copiar el link.

## tech stack

- [Astro](https://astro.build) — framework web, rápido y estático
- [TinaCMS](https://tina.io) — CMS para manejar el contenido sin tocar código
- [Vercel](https://vercel.com) — hosting y deploy automático

## setup local

```bash
# instalar dependencias
npm install

# correr en dev
npm run dev

# build para producción
npm run build
```

el dev server corre en `localhost:4321`.
el admin de TinaCMS está en `localhost:4321/admin`.

## variables de entorno

para el build de producción necesitas configurar las variables de TinaCMS:

```
TINA_CLIENT_ID=tu_client_id
TINA_TOKEN=tu_token
```

en local no necesitas esto, TinaCMS corre en modo local automáticamente.

## estructura

```
src/
├── components/      # MovieCard, EventCard
├── content/         # markdown de pelis y eventos (manejado por TinaCMS)
├── layouts/         # BaseLayout con header, footer, nav
├── pages/           # index, archivo, detalle de peli/evento
└── styles/          # global.css — todo el diseño
tina/
└── config.tsx       # esquema de TinaCMS + time picker custom
```

## créditos

hecho por la **Comunidad del Cine Universitario**.

dev ❤️ [psychofizz](https://github.com/psychofizz)
