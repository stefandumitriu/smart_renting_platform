import {UserSignUpInfo} from "../../models";
import {DbUserBasicInfo} from "@packages/db";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function convertAPIUserSignupInfoToDbUserBasicInfo(apiUserBasicInfo: UserSignUpInfo): Promise<DbUserBasicInfo> {
    return {
        id: uuidv4(),
        email: apiUserBasicInfo.email,
        firstName: apiUserBasicInfo.firstName,
        lastName: apiUserBasicInfo.lastName,
        password: await bcrypt.hash(apiUserBasicInfo.password, 10)
    }
}