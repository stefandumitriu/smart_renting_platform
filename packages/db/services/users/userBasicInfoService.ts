import {DbUserBasicInfo, USER_BASIC_INFO_TABLE_NAME} from "../../models";
import knex from "../../knex";

export async function storeUser(userBasicInfo: DbUserBasicInfo): Promise<Omit<DbUserBasicInfo, 'password'>> {
    return knex(USER_BASIC_INFO_TABLE_NAME).insert(userBasicInfo, ['id', 'email', 'firstName', 'lastName']);
}

export async function getUserByLoginInfo(userLoginInfo: {email: string}): Promise<DbUserBasicInfo | undefined> {
    return knex(USER_BASIC_INFO_TABLE_NAME)
        .where('email', userLoginInfo.email)
        .select().first();
}