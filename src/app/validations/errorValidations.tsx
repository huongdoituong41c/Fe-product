type Field = {
    name: string,
    size?: number
}

export const errorEmail = 'Invalid email format';

export const validatePhoneNumber = {
    regExp: /^(0[3|5|7|8|9])+([0-9]{8})$/,
    errorMsg: `Phone number is not valid`
}

export const getErrorRequired = (field: Field) => {
    return  field.name + ' is required';
}
 
export const getErrorMinLength = (field: Field) => {
    return `${field.name}  must be at least ${field.size} characters`;
}
