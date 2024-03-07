import { z } from "zod";

export const registerSchemaZ = z.object({
  usuario: z.string({
    required_error: "usuario requerido",
  }),
  correo: z
    .string({
      required_error: "correo requerido",
    })
    .email({
      message: "correo invalido",
    }),
  clave: z
    .string({
      required_error: "contraseña requerida",
    })
    .min(6, {
      message: "contraseña minima de 6 caracteres",
    }),
});

export const loginSchemaZ = z.object({
  correo: z
    .string({
      required_error: "correo requerido",
    })
    .email({
      message: "correo invalido",
    }),
  clave: z
    .string({
      required_error: "contraseña requerida",
    })
    .min(6, {
      message: "contraseña minima de 6 caracteres",
    }),
});
