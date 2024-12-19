import * as z from "zod";

//! MODEL & VARIANT
export const modelFormSchema = z.object({
  brand: z.string().min(2, "La marque est requise"),
  name: z.string().min(2, "Le nom du modèle est requis"),
  isActive: z.boolean(),
});

// SUREMENT A MODIFIER EN FONCTION DES MODIFS ET DU FORM (voir comment on récupère les infos des pays et des images url)
export const variantFormSchema = z.object({
  price: z.number().min(0, "Le prix doit être supérieur ou égal à 0"),
  memory: z.number(),
  color: z.string(),
  country: z.string().optional(),
  description: z.string(),
  stock: z.number().min(0, "Le stock doit être supérieur ou égal à 0").optional(),
  isActive: z.boolean(),
  modelId: z.string().optional(),
  imageUrl: z.array(z.string().url()).optional(), // imageUrl: z.string().optional(),
});

//! COUNTRY
export const countryFormSchema = z.object({
  name: z.string().min(2, "Le nom du pays doit contenir au moins 2 caractères"),
  imageUrl: z.string().optional(),
});

export const userLoginSchema = z.object({
  email: z.string().email({
    message: "L'email est requis.",
  }),
  password: z.string().min(1, "Le mot de passe est requis."),
  code: z.optional(z.string()), // Pour Auhtentification à deux facteurs
});

export const userRegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email({
      message: "L'email est requis.",
    }),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 6 caractères."),
    passwordConfirmation: z.string(),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Les mots de passe ne correspondent pas.",
        path: ["passwordConfirmation"],
      });
    }
  });

export const ResetSchema = z.object({
  email: z.string().email({
    message: "L'email est requis.",
  }),
});

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères."),
    passwordConfirmation: z.string(),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Les mots de passe ne correspondent pas.",
        path: ["passwordConfirmation"],
      });
    }
  });

export const userFormSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  description: z
    .string()
    .min(3, "La description doit contenir au moins 3 caractères")
    .max(400, "La description doit contenir au maximum 400 caractères"),
  instagram: z.string().url().or(z.string().length(0)).optional(),
  twitter: z.string().url().or(z.string().length(0)).optional(),
  tiktok: z.string().url().or(z.string().length(0)).optional(),
});

export const userProfileSchema = z.object({
  description: z.optional(
    z
      .string()
      .max(400, "La description doit contenir au maximum 400 caractères")
  ),
  instagram: z.string().url().or(z.string().length(0)).optional(),
  twitter: z.string().url().or(z.string().length(0)).optional(),
  tiktok: z.string().url().or(z.string().length(0)).optional(),
  youtube: z.string().url().or(z.string().length(0)).optional(),
  image: z.string(),
});

export const userSettingSchema = z.object({
  firstName: z.optional(
    z.string().min(2, "Le prénom doit contenir au moins 2 caractères")
  ),
  lastName: z.optional(
    z.string().min(2, "Le nom doit contenir au moins 2 caractères")
  ),
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  departement: z.optional(z.string()),
  isTwofactorEnabled: z.optional(z.boolean()),
  organizationName: z.optional(z.string()),
  organizationType: z.optional(z.string()),
  isHidenWishlist: z.optional(z.boolean()),
  tags: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .optional(),
});
