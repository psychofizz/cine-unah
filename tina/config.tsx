import React from "react";
import { defineConfig } from "tinacms";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TimePickerField = ({ input }: any) => {
  return React.createElement("input", {
    type: "time",
    id: input.name,
    value: input.value || "",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      input.onChange(e.currentTarget.value),
    style: {
      width: "100%",
      padding: "8px 12px",
      fontSize: "1rem",
      border: "1px solid #e2e8f0",
      borderRadius: "6px",
      background: "white",
      color: "#1a202c",
      outline: "none",
      cursor: "pointer",
    },
  });
};


export default defineConfig({
  branch: process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main",
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
            ui: { component: TimePickerField },
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
            ui: { component: TimePickerField },
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
