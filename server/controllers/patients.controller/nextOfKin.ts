import prisma from '../../prisma'
import StatusCodes from '../../enums/statusCodes'
import titleName from '../../utilities/titleName'
import { NGN_PHONE } from '../../utilities/RegExp'
import { type Request, type Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../../helpers/sendRes'

const nextOfKin = expressAsyncHandler(
    async (req: Request, res: Response) => {
        const { patientId } = req.params
        let { phone_no, address, fullname, city, state, occupation, country } = req.body

        if (!patientId) {
            sendError(
                res,
                StatusCodes.BadRequest,
                'Patient ID is not provided.'
            )
            return
        }

        if (!fullname || !fullname?.trim() || !address || !city || !state) {
            sendError(
                res,
                StatusCodes.BadRequest,
                'Fullname, Address, City, State are required.'
            )
            return
        }

        fullname = titleName(fullname)

        if (!NGN_PHONE.test(phone_no)) {
            sendError(
                res,
                StatusCodes.BadRequest,
                'Invalid Phone Number.'
            )
            return
        }

        const patient = await prisma.patients.findUnique({
            where: {
                id: patientId
            },
        })
        if (!patient) {
            sendError(
                res,
                StatusCodes.NotFound,
                'Patient not found.'
            )
            return
        }

        const next_of_kin = await prisma.nextOfKin.findUnique({
            where: { patientId }
        })

        if (!next_of_kin) {
            await prisma.nextOfKin.create({
                data: {
                    city,
                    state,
                    address,
                    fullname,
                    phone_no,
                    occupation,
                    patient: {
                        connect: {
                            id: patientId
                        }
                    }
                },
            })
        } else {
            await prisma.nextOfKin.update({
                where: { patientId },
                data: {
                    city,
                    state,
                    address,
                    country,
                    fullname,
                    phone_no,
                    occupation,
                }
            })
        }

        sendSuccess(
            res,
            StatusCodes.OK,
            { msg: 'Next Of Kin has been successfully updated.' }
        )
    }
)