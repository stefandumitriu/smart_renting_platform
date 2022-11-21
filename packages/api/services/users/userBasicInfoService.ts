import {UserLoginInfo, UserSignUpInfo} from "../../models";
import {convertAPIUserSignupInfoToDbUserBasicInfo} from "../../convertors/users/userBasicInfo";
import {getUserByLoginInfo, storeUser} from '@packages/db/services/users/userBasicInfoService'
import {DbUserBasicInfo} from "@packages/db";
import bcrypt from "bcrypt";
import _ from "lodash";

export async function createNewUser(body: UserSignUpInfo): Promise<string> {
    const dbModel = await convertAPIUserSignupInfoToDbUserBasicInfo(body);
    const response = await storeUser(dbModel);
    return response.id;
}

export async function getUser(body: UserLoginInfo): Promise<Omit<DbUserBasicInfo, 'password'> | undefined> {
    const userWithEmail = await getUserByLoginInfo({email: body.email});
    const validPassword = !!userWithEmail && await bcrypt.compare(body.password, userWithEmail.password);
    if (validPassword) {
        return _.omit(userWithEmail, 'password');
    }
    return undefined;
}