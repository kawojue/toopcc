declare namespace NodeJS {
    interface ProcessEnv {
        EMAILER: string
        SIGNUP_KEY: string
        JWT_SECRET: string
        CLIENT_URL: string
        BUCKET_NAME: string
        DIST_DOMAIN: string
        EMAILER_PSWD: string
        DATABASE_URL: string
        BUCKET_REGION: string
        AWS_SECRET_ID: string
        PLUNK_API_KEY: string
        AWS_ACCESS_SECRET: string
        NODE_ENV: 'production' | 'development'
    }
}