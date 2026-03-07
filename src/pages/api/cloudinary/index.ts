import { createMediaHandler } from "next-tinacms-cloudinary/dist/handlers";

export const prerender = false;

export const GET = ({ request }) => {
  return createMediaHandler({
    cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
    api_key: import.meta.env.CLOUDINARY_API_KEY,
    api_secret: import.meta.env.CLOUDINARY_API_SECRET,
    authorized: async (req) => {
      // Typically you would add Tina auth logic here (e.g. isAuthorized(req)).
      // Currently defaulting to true for local testing and open admin.
      return true;
    },
  })(request, {} as any);
};

export const POST = GET;
