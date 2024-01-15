export interface ILoginReq {
    email: string,
    password: string
}

export interface ILoginRes {
    message: string,
    token: string,
    userId: number | null,
}

export interface ILoginUser {
    user_id: number | null,
    first_name: string,
    last_name: string,
    email: string,
    role: string
    createdAt: any,
    updatedAt: any
}
