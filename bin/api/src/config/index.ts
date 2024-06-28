/* eslint-disable @typescript-eslint/no-explicit-any */
import { flow, fromPairs, keys, map, snakeCase, toUpper } from 'lodash/fp';
import { z } from 'zod';
import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';

const envify = (n: string | null, k: any) =>
  toUpper(snakeCase(`VELOMTL ${n ?? ''} ${k}`));

export function register<T extends z.ZodRawShape>(
  namespace: string | null,
  schema: z.ZodObject<T>,
) {
  type SchemaType = z.infer<typeof schema>;
  type K = keyof SchemaType;

  const shape = schema.shape;

  /* Config Module */
  const fromEnv = () =>
    flow([keys, map((k) => [k, process.env[envify(namespace, k)]]), fromPairs])(
      shape,
    );

  const load = registerAs(
    `velomtl${namespace ? `.${namespace}` : ''}`,
    fromEnv,
  );
  const validate = (env: any) => {
    const remapped = flow([
      keys,
      map((k: keyof typeof schema) => [envify(namespace, k), shape[k]]),
      fromPairs,
    ])(shape);

    return z.object(remapped).parse(env);
  };

  const module = ConfigModule.forRoot({ load: [load], validate });

  /* Config Service */
  const get = <Key extends K>(
    cfg: ConfigService,
    key: Key,
  ): SchemaType[Key] | undefined => {
    return cfg.get<SchemaType[Key]>(
      `velomtl${namespace ? `.${namespace}` : ''}.${key as string}`,
    );
  };

  return { get, module };
}
