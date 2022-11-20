export const USER_BASIC_INFO_TABLE_NAME = 'user_basic_info';

export interface DbUserBasicInfo {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}