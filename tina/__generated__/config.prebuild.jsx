// tina/config.tsx
import React from "react";
import { defineConfig } from "tinacms";
var TimePickerField = ({ input }) => {
  return React.createElement("input", {
    type: "time",
    id: input.name,
    value: input.value || "",
    onChange: (e) => input.onChange(e.currentTarget.value),
    style: {
      width: "100%",
      padding: "8px 12px",
      fontSize: "1rem",
      border: "1px solid #e2e8f0",
      borderRadius: "6px",
      background: "white",
      color: "#1a202c",
      outline: "none",
      cursor: "pointer"
    }
  });
};
var config_default = defineConfig({
  branch: process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main",
  clientId: process.env.TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads"
    }
  },
  schema: {
    collections: [
      // ─── PELÍCULAS ────────────────────────────────────────────────────────
      {
        name: "pelicula",
        label: "Pel\xEDculas",
        path: "src/content/peliculas",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              const titleSlug = (values?.title || "pelicula").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
              const datePart = values?.showDate ? new Date(values.showDate).toISOString().split("T")[0] : "";
              return datePart ? `${titleSlug}-${datePart}` : titleSlug;
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "T\xEDtulo",
            isTitle: true,
            required: true
          },
          {
            type: "image",
            name: "poster",
            label: "Poster",
            required: true
          },
          {
            type: "string",
            name: "youtubeTrailer",
            label: "Tr\xE1iler de YouTube (URL)",
            description: "Ej: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          },
          {
            type: "string",
            name: "synopsis",
            label: "Sinopsis",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "credits",
            label: "Cr\xE9ditos",
            description: "Ej: Dir. Stanley Kubrick | Elenco: Jack Nicholson...",
            ui: { component: "textarea" }
          },
          {
            type: "datetime",
            name: "showDate",
            label: "Fecha de proyecci\xF3n",
            required: true
          },
          {
            type: "string",
            name: "showTime",
            label: "Hora de proyecci\xF3n",
            ui: { component: TimePickerField }
          },
          {
            type: "string",
            name: "showEndTime",
            label: "Hora de finalizaci\xF3n (opcional)",
            ui: { component: TimePickerField }
          },
          {
            type: "boolean",
            name: "featured",
            label: "\u2B50 Destacada (Hero Principal)",
            description: "Si est\xE1 activo, esta pel\xEDcula ocupa el hero principal hasta que la fecha pase. Solo una debe estar activa a la vez."
          },
          {
            type: "number",
            name: "duration",
            label: "Duraci\xF3n (minutos)"
          },
          {
            type: "string",
            name: "country",
            label: "Pa\xEDs / A\xF1o",
            description: "Ej: M\xE9xico, 1975"
          },
          {
            type: "string",
            name: "location",
            label: "Ubicaci\xF3n (opcional)",
            description: "Ej: Cine Francisco Salvador"
          }
        ]
      },
      // ─── EVENTOS ─────────────────────────────────────────────────────────
      {
        name: "evento",
        label: "Eventos",
        path: "src/content/eventos",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              const titleSlug = (values?.title || "evento").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
              const datePart = values?.date ? new Date(values.date).toISOString().split("T")[0] : "";
              return datePart ? `${titleSlug}-${datePart}` : titleSlug;
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "T\xEDtulo del evento",
            isTitle: true,
            required: true
          },
          {
            type: "image",
            name: "poster",
            label: "Poster del evento",
            required: true
          },
          {
            type: "string",
            name: "youtubeTrailer",
            label: "Tr\xE1iler de YouTube (URL)",
            description: "Ej: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          },
          {
            type: "string",
            name: "description",
            label: "Descripci\xF3n",
            ui: { component: "textarea" }
          },
          {
            type: "datetime",
            name: "date",
            label: "Fecha del evento",
            required: true
          },
          {
            type: "string",
            name: "eventTime",
            label: "Hora del evento",
            ui: { component: TimePickerField }
          },
          {
            type: "string",
            name: "eventEndTime",
            label: "Hora de finalizaci\xF3n (opcional)",
            ui: { component: TimePickerField }
          },
          {
            type: "boolean",
            name: "featured",
            label: "\u2B50 Destacado (Hero Principal)",
            description: "Si est\xE1 activo, este evento ocupa el hero principal hasta que la fecha pase."
          },
          {
            type: "string",
            name: "location",
            label: "Lugar (opcional)"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
