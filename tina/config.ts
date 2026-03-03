import { defineConfig } from "tinacms";

export default defineConfig({
  clientId: process.env.TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      // ─── PELÍCULAS ────────────────────────────────────────────────────────
      {
        name: "pelicula",
        label: "Películas",
        path: "src/content/peliculas",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Título",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "poster",
            label: "Poster",
            required: true,
          },
          {
            type: "string",
            name: "synopsis",
            label: "Sinopsis",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "string",
            name: "credits",
            label: "Créditos",
            description: "Ej: Dir. Stanley Kubrick | Elenco: Jack Nicholson...",
            ui: { component: "textarea" },
          },
          {
            type: "datetime",
            name: "showDate",
            label: "Fecha de proyección",
            required: true,
          },
          {
            type: "string",
            name: "showTime",
            label: "Hora de proyección",
            description: "Ej: 19:00 o 7:00 PM",
            required: true,
          },
          {
            type: "string",
            name: "status",
            label: "Estado",
            options: [
              { value: "current", label: "En cartelera (actual)" },
              { value: "next", label: "Próxima proyección" },
              { value: "past", label: "Pasada (archivo)" },
            ],
            required: true,
          },
          {
            type: "boolean",
            name: "featured",
            label: "⭐ Destacada (Hero Principal)",
            description:
              "Si está activo, esta película ocupa el hero principal hasta que la fecha pase. Solo una debe estar activa a la vez.",
          },
          {
            type: "number",
            name: "duration",
            label: "Duración (minutos)",
          },
          {
            type: "string",
            name: "country",
            label: "País / Año",
            description: "Ej: México, 1975",
          },
        ],
      },
      // ─── EVENTOS ─────────────────────────────────────────────────────────
      {
        name: "evento",
        label: "Eventos",
        path: "src/content/eventos",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Título del evento",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "poster",
            label: "Poster del evento",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Descripción",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Fecha del evento",
            required: true,
          },
          {
            type: "string",
            name: "eventTime",
            label: "Hora del evento",
            description: "Ej: 20:00 o 8:00 PM",
            required: true,
          },
          {
            type: "boolean",
            name: "featured",
            label: "⭐ Destacado (Hero Principal)",
            description:
              "Si está activo, este evento ocupa el hero principal hasta que la fecha pase.",
          },
          {
            type: "string",
            name: "location",
            label: "Lugar (opcional)",
          },
        ],
      },
    ],
  },
});
