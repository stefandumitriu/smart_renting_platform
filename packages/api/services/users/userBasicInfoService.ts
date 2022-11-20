import {UserSignUpInfo} from "../../models";
import {convertAPIUserSignupInfoToDbUserBasicInfo} from "../../convertors/users/userBasicInfo";
import {storeUser} from '@packages/db/services/users/userBasicInfoService'

export async function createNewUser(body: UserSignUpInfo): Promise<string> {
    const dbModel = await convertAPIUserSignupInfoToDbUserBasicInfo(body);
    const response = await storeUser(dbModel);
    return response.id;
}