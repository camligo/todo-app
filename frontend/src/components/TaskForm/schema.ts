import * as z from 'zod';

export const schema = z.object({
  name: z.string().min(2).max(100),
  categoryId: z.coerce.number(),
  priority: z.boolean().optional(),
  dueDate: z.coerce.date().optional(),
})

export type TaskFormData = z.infer<typeof schema>
