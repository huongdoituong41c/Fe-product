import * as yup from 'yup';
import { errorEmail, getErrorMinLength, getErrorRequired, validatePhoneNumber } from "./errorValidations";
import axios from 'axios';
import { apiUrl } from '../../environments/env';

const checkUsernameExists = async (value: string) => {
    const response = await axios.get(`${apiUrl}/users`)
    if (response.data) {
        const users = response.data;
        const isUsersUnique = users.findIndex((user: any) => user.username === value);
        return isUsersUnique != -1 ? true : false;
    } else {
        throw Error('500 server');
    }
}

const checkEmailExists = async (value: string) => {
    const response = await axios.get(`${apiUrl}/users`)
    if (response.data) {
        const users = response.data;
        const isEmailExists = users.findIndex((user: any) => user.email === value);
        return isEmailExists == -1 ? false : true;
    } else {
        throw Error('500 server');
    }
}

const checkPhoneNumberExists = async (value: string) => {
    const response = await axios.get(`${apiUrl}/users`)
    if (response.data) {
        const users = response.data;
        const isPhoneNumberExists = users.findIndex((user: any) => user.phone_number === value);
        return isPhoneNumberExists == -1 ? false : true;
    } else {
        throw Error('500 server');
    }
}

export const userSchema = yup.object().shape({
    firstName: yup.string().required(getErrorRequired({ name: 'First name' })),
    lastName: yup.string().required(getErrorRequired({ name: 'Last name' })),
    username: yup.string()
        .matches(/^\S*$/, 'Spaces are not allowed')
        .required(getErrorRequired({ name: 'Username' }))
        .min(8, getErrorMinLength({ name: 'Username', size: 8 }))
        .test('usernameUnique', 'Username really exists', async function (value: string) {
            if (value && value.trim()?.length >= 8) {
                const isUnique = await checkUsernameExists(value);
                return isUnique ? false : true;
            } else {
                return true;
            }
        }),
    email: yup.string()
        .required(getErrorRequired({ name: 'Email' }))
        .email(errorEmail)
        .test('emailUnique', 'Email really exists', async function (value: string) {
            const isEmailPromise = await yup.string().required().email().isValid(value);
            if (isEmailPromise) {
                const isEmailExists = await checkEmailExists(value);
                return !isEmailExists;
            } else {
                return true;
            }
        }),
    password: yup.string().required(getErrorRequired({ name: 'Password' })),
    phoneNumber: yup.string()
        .required(getErrorRequired({ name: 'Phone Number' }))
        .matches(validatePhoneNumber.regExp, validatePhoneNumber.errorMsg)
        .test('phoneNumberUnique', 'Phone number really exists', async function (value: string) {
            const isPhoneNumber = await yup.string().required().matches(validatePhoneNumber.regExp).isValid(value);
            if (isPhoneNumber) {
                const isPhoneNumberExists = await checkPhoneNumberExists(value);
                return !isPhoneNumberExists;
            } else {
                return true;
            }
        }),
    gender: yup.string(),
});

export type FormRegisterData = yup.InferType<typeof userSchema>;