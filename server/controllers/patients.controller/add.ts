import prisma from '../../prisma'
import StatusCodes from '../../enums/statusCodes'
import titleName from '../../utilities/titleName'
import { type Response, type Request } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { REG_NO, NGN_PHONE } from '../../utilities/RegExp'
import { sendError, sendSuccess } from '../../helpers/sendRes'

export const add = expressAsyncHandler(
    async (req: Request, res: Response) => {
        let { reg_no, fullname, sex, phone_no, marital_status } = req.body

        fullname = fullname?.trim()
        reg_no = reg_no?.toUpperCase()

        if (!reg_no) {
            sendError(
                res,
                StatusCodes.BadRequest,
                'Registration number is required.'
            )
            return
        }

        if (!REG_NO.test(reg_no)) {
            sendError(
                res,
                StatusCodes.BadRequest,
                'Invalid Registration number.'
            )
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

        if (phone_no) {
            if (!NGN_PHONE.test(phone_no)) {
                sendError(
                    res,
                    StatusCodes.BadRequest,
                    'Invalid Phone Number.'
                )
                return
            }
        }

        if (marital_status) {
            if (
                marital_status !== 'Taken' && marital_status !== 'Single' &&
                marital_status !== 'Married' && marital_status !== 'Widowed' &&
                marital_status !== 'Divorced' && marital_status !== 'Seperated'
            ) {
                sendError(
                    res,
                    StatusCodes.BadRequest,
                    'Marital status is not valid.'
                )
                return
            }
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

        await prisma.patients.create({
            data: {
                ...req.body,
                sex,
                reg_no,
                fullname,
                marital_status,
                first_vist: new Date().toISOString(),
            }
        })

        sendSuccess(
            res,
            StatusCodes.Created,
            { msg: "Patient added successfully." }
        )
    }
)