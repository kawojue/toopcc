import prisma from '../../../prisma'
import { REG_NO } from '../../../utilities/RegExp'
import StatusCodes from '../../../enums/statusCodes'
import titleName from '../../../utilities/titleName'
import { type Response, type Request } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../../../helpers/sendRes'

export const add = expressAsyncHandler(
    async (req: Request, res: Response) => {
        let { reg_no, fullname, sex } = req.body

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

        const newPatient = await prisma.patients.create({
            data: {
                ...req.body,
                fullname,
                reg_no,
                sex,   
            }
        })

        sendSuccess(
            res,
            StatusCodes.Created,
            { msg: "Patient added successfully." }
        )
    }
)