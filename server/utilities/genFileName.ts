import crypto from 'crypto'

export const genFileName = (): string => crypto.randomBytes(8).toString('hex')