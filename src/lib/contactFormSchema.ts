import { z } from 'zod';

/**
 * Keys must match `Contact.form.projectTypes.*` in messages/*.json — the form
 * renders one pill per entry, in this order.
 */
export const PROJECT_TYPES = [
  'webApp',
  'apiBackend',
  'saasMvp',
  'automation',
  'existingProject',
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

/**
 * Field-level `message` values are not user-facing text — they're keys into
 * `Contact.form.errors.*`, resolved by the form component. Keeps validation
 * copy in messages/*.json instead of baked into the schema.
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'name').max(120, 'name'),
  email: z.string().trim().min(1, 'email').email('email').max(200, 'email'),
  projectType: z.enum(PROJECT_TYPES, { message: 'projectType' }),
  message: z.string().trim().min(20, 'message').max(2000, 'message'),
  website: z
    .union([
      z.literal(''),
      z.string().trim().url('website').max(300, 'website'),
    ])
    .optional(),
  privacyConsent: z.boolean().refine((value) => value, { message: 'privacy' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactFormDefaultValues: ContactFormValues = {
  name: '',
  email: '',
  projectType: 'webApp',
  message: '',
  website: '',
  privacyConsent: false,
};
