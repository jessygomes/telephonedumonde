import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères"),
  description: z
    .string()
    .min(3, "La description doit contenir au moins 3 caractères")
    .max(1000, "La description doit contenir au maximum 1000 caractères"),
  location: z
    .string()
    .min(8, "Le lieu doit contenir au moins 8 caractères")
    .max(400, "La description doit contenir au maximum 400 caractères"),
  departement: z.string(),
  ville: z.string(),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  category: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
  maxPlaces: z
    .number()
    .min(0, "Le nombre de places doit être supérieur ou égal à 0")
    .optional(),
  isBilleterieExterne: z.boolean(),
  tags: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .optional(),
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
    role: z.enum(["user", "organizer"]),
    organizationName: z.optional(z.string()),
    organizationType: z.optional(z.string()),
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
