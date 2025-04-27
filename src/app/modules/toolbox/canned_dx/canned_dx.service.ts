import { StatusCodes } from "http-status-codes"
import ApiError from "../../../../errors/ApiError"
import { CannedDx } from "./canned_dx.model"
import { ICannedDx } from "./canned_dx.interface"
import QueryBuilder from "../../../builder/QueryBuilder"
import { sendNotifications } from "../../../../helpers/notificationHelper"
import { USER_ROLES } from "../../../../enums/user"

const addCannedDxToDB = async (content:Partial<ICannedDx>) => {
    const isExist = await CannedDx.isContentExist(content.content!)
    if (isExist) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "Canned DX content already exist!"
        )
    }
    const cannedDx = new CannedDx(content)
    await cannedDx.save()
    await sendNotifications({
        title: "New Canned DX added",
        text: "New Canned DX added",
        read: false,
        direction: "canned_dx",
        role: [USER_ROLES.ADMIN],
    }, [USER_ROLES.ADMIN])

    return cannedDx
}

const getAllCannedDxFromDB = async (query:Record<string,any>) => {
    const result = new QueryBuilder(CannedDx.find(),query).search(['content'])
    return await result.modelQuery.lean()
}

const deleteCannedDxFromDB = async (id:string) => {
    const cannedDx = await CannedDx.findByIdAndDelete(id)
    if (!cannedDx) {
        throw new ApiError(StatusCodes.BAD_REQUEST,
            "Canned DX not found!"
        )
    }
    return cannedDx
}

const updateCannedDxFromDB = async (id:string, content:string) => {
    const cannedDx = await CannedDx.findByIdAndUpdate(id, { content }, { new: true })
    if (!cannedDx) {
        throw new ApiError(StatusCodes.BAD_REQUEST,
            "Canned DX not found!"
        )
    }
    return cannedDx
}

export const CannedDxService = {
    addCannedDxToDB,
    getAllCannedDxFromDB,
    deleteCannedDxFromDB,
    updateCannedDxFromDB
}