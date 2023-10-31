import prisma from '../../../prisma'
import { REG_NO } from '../../../utilities/RegExp'
import StatusCodes from '../../../enums/statusCodes'
import { type Response, type Request } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../../../helpers/sendRes'
import titleName from '../../../utilities/titleName'

export const add = expressAsyncHandler(
    async (req: Request, res: Response) => {
        let {
            reg_no, fullname, sex,
            dob, address, phone_no,
            city, state, country,
            occupation, first_visit,
            marital_status
        } = req.body

        fullname = fullname?.trim()

        if (!reg_no || !REG_NO.test(reg_no)) {
            sendError(
                res,
                StatusCodes.BadRequest,
                'Registration number is required.'
            )
            return
        }

        if (!fullname) {
            sendError(
                res,
                StatusCodes.BadRequest,
                'Fullname is required.'
            )
            return
        }

        fullname = titleName(fullname)

        if (sex !== 'male' && sex !== 'female') {
            sendError(
                res,
                StatusCodes.BadRequest,
                'Invalid Sex.'
            )
            return
        }

        const patient = await prisma.patients.findUnique({
            where: { reg_no }
        })

        if (patient) {
            sendError(
                res,
                StatusCodes.Conflict,
                'Patient with the same registration number already exists.'
            )
            return
        }

        sendSuccess(
            res,
            StatusCodes.Created,
        )
    }
)