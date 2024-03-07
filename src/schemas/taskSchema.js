import { z } from "zod";

export const taskSchemaZ = z.object({
  titulo: z
    .string({
      required_error: "titulo requerido",
    })
    .max(20, {
      message: "titulo maximo de 20 caracteres",
    }),
  descripcion: z.string({ required_error: "descripcion requerido" }).optional(),
});
