import { ourFileRouter } from "./core";
import { createRouteHandler } from "uploadthing/next";

// Utilisation de `createRouteHandler` pour les App Routes
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
