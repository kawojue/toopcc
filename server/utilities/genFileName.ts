import crypto from 'crypto'

export const genFileName = () => {
    return crypto.randomBytes(8).toString('hex')
}