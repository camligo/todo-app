import * as z from 'zod';

export const schema = z.object({
  name: z.string().min(3).max(200),
  categoryId: z.number(),
})

export type TaskFormData = z.infer<typeof schema>
