import { config } from 'dotenv'
config()

import cors, { type CorsOptions } from 'cors'
import cookieParser from 'cookie-parser'
import root from './routes/root.route'
import express, {
    type Express, type NextFunction,
    type Request, type Response,
} from 'express'
import logger from 'morgan'

const app: Express = express()
const allowedOrigins: string[] = [
    process.env.CLIENT_URL!
]

const PORT: unknown = process.env.PORT || 2002

app.set('trust proxy', true)
app.use(express.json({ limit: '32mb' }))
app.use(express.urlencoded({
    extended: true,
    limit: '32mb',
}))
app.use((req: Request, res: Response, next: NextFunction) => {
    const origin: unknown = req.headers.origin
    if (allowedOrigins.includes(origin as string)) {
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Allow-Origin', origin as string)
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    }
    next()
})
app.use(cors({
    origin: (origin, cb) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            cb(null, true)
        } else {
            throw new Error("Not allowed by CORS!")
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: "GET, DELETE, POST, PATCH",
} as CorsOptions))
app.use(cookieParser())
app.use(logger('dev'))

app.use('/', root)


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))