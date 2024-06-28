import { z } from 'zod';
import { register } from '..';

const SCHEMA = z.object({
  env: z
    .enum(['development', 'production', 'test', 'provision'])
    .default('development'),
  host: z.string().default('localhost'),
  port: z.number().min(1).max(65535).default(5000),
});

export const env = register(null, SCHEMA);
export type AppConfig = z.infer<typeof SCHEMA>;
