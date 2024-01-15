import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import DefaultLayout from '../layouts/defaultLayout';
import { ROLE } from '../constants/constant';
import { useAppSelector } from '../hooks';
import { RootState, useAppDispatch } from '../store';
import { authUserLogin } from '../services/Auth.service';

type AuthGuardProps = {
    component: React.ComponentType;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ component: Component }) => {
    const dispatch = useAppDispatch()

    const userLogin = useAppSelector((state: RootState) => state.auth.userLogin)
    const loginLocalStorage = JSON.parse(localStorage.getItem('jwt') || '{}')

    useEffect(() => {
        dispatch(authUserLogin());
    }, [dispatch])

    return (
        <>
            {
                (loginLocalStorage.role === ROLE.ADMIN || loginLocalStorage.role === ROLE.SUPER_ADMIN) ? <DefaultLayout children={<Component />} /> : <Navigate to="/home" replace />
            }
        </>
    )
};
export default AuthGuard;
