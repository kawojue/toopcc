import { Router, type Request, type Response } from 'express'
import { sendSuccess } from '../helpers/sendRes'
import StatusCodes from '../enums/statusCodes'
import { getIpAddress } from '../utilities/getIp'

const root: Router = Router()

root.get('/', (req: Request, res: Response) => {
    sendSuccess(res, StatusCodes.OK, {
        "Your IP Adress": getIpAddress(req)
    })
})

export default root