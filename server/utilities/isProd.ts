import { env } from 'node:process'

export const isProd = env.NODE_ENV === 'production'