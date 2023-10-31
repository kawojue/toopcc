import StatusCodes from '../enums/statusCodes'
import { sendSuccess } from '../helpers/sendRes'
import { getIpAddress } from '../utilities/getIp'
import { Router, type Request, type Response } from 'express'

const root: Router = Router()

root.get('/', (req: Request, res: Response) => {
    sendSuccess(res, StatusCodes.OK, {
        "Your IP Adress": getIpAddress(req)
    })
})

export default root