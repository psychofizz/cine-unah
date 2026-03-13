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
            type: "boolean",
            name: "cancelled",
            label: "\u{1F6AB} Cancelada (proyecci\xF3n cancelada)",
            description: "Activa esto si la proyecci\xF3n fue cancelada. Se mostrar\xE1 un aviso de cancelaci\xF3n en la cartelera y en la p\xE1gina de la pel\xEDcula."
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
            type: "reference",
            name: "location",
            label: "Ubicaci\xF3n",
            collections: ["ubicacion"]
          },
          {
            type: "reference",
            name: "isPartOfEvent",
            label: "Parte del Evento (Ej: Double Feature)",
            description: "Si esta pel\xEDcula es parte de un evento m\xE1s grande (ej: Funci\xF3n Doble de Barbenheimer), selecciona el Evento padre aqu\xED.",
            collections: ["evento"]
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
            type: "boolean",
            name: "cancelled",
            label: "\u{1F6AB} Cancelado (evento cancelado)",
            description: "Activa esto si el evento fue cancelado. Se mostrar\xE1 un aviso de cancelaci\xF3n en la lista de eventos y en la p\xE1gina del evento."
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
            type: "reference",
            name: "location",
            label: "Lugar",
            collections: ["ubicacion"]
          },
          {
            type: "object",
            list: true,
            name: "shortFilms",
            label: "Cortometrajes (Lineup)",
            description: "Si este evento es una funci\xF3n de varios cortos, agr\xE9galos aqu\xED en lugar de crear una p\xE1gina de Pel\xEDcula completa para cada uno.",
            ui: {
              itemProps: (item) => {
                return { label: item?.title ? `${item?.title} (${item?.duration || "?"} min)` : "Nuevo Corto" };
              }
            },
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo", required: true },
              { type: "string", name: "director", label: "Director" },
              { type: "number", name: "duration", label: "Duraci\xF3n (min)" },
              { type: "string", name: "synopsis", label: "Sinopsis breve", ui: { component: "textarea" } }
            ]
          }
        ]
      },
      // ─── UBICACIONES ───────────────────────────────────────────────────────
      {
        name: "ubicacion",
        label: "Ubicaciones",
        path: "src/content/ubicaciones",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              const titleSlug = (values?.title || "ubicacion").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
              return titleSlug;
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Nombre de la ubicaci\xF3n",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "address",
            label: "Direcci\xF3n",
            description: "Ej: 3RMM+WQ3, Tegucigalpa, Francisco Moraz\xE1n"
          },
          {
            type: "string",
            name: "mapCoordinates",
            label: "Coordenadas del Mapa (Lat, Lng)",
            description: "Ej: 14.084587, -87.165553"
          },
          {
            type: "string",
            name: "instagramReel",
            label: "URL del Reel de Instagram"
          },
          {
            type: "image",
            name: "image",
            label: "Imagen de la ubicaci\xF3n"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
