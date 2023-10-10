import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoginData, LoginResponse, RegisterData, Usuario } from '../interfaces/appInterfaces';
import { AuthState, authReducer } from "./authReducer";
import cafeApi from "../api/cafeApi";
import { isAxiosError } from "axios";

type AuthContextProps = {
    errorMessage: string
    token: string | null
    user: Usuario | null
    status: 'checking' | 'authenticated' | 'not-authenticated'
    signUp: (registerData: RegisterData) => void
    signIn: (loginData: LoginData) => void
    logOut: () => void
    removeError: () => void
}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AUthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState)

    useEffect(() => {
        checkToken()
    }, [])

    const checkToken = async () => {

        const token = await AsyncStorage.getItem('token')
        if (!token) return dispatch({ type: 'notAUthenticated' })

        // Validar token
        const { data, status } = await cafeApi.get('/auth')
        if (status !== 200) {
            return dispatch({ type: 'notAUthenticated' })
        }

        await AsyncStorage.setItem('token', data.token)

        dispatch({
            type: 'signUp',
            payload: {
                token: data.token,
                user: data.usuario
            }
        })
    }

    const signUp = async ({ correo, password, nombre }: RegisterData) => {
        try {

            const { data } = await cafeApi.post<LoginResponse>(
                '/usuarios',
                { correo, password, nombre }
            )

            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario,
                }
            })

            console.log('SIGN_UP : ' + JSON.stringify(data))

            await AsyncStorage.setItem('token', data.token)

        } catch (error) {

            let errMessage = 'Información incorrecta'

            if (isAxiosError(error)) {
                errMessage = error.response?.data.errors[0].msg
                console.log(errMessage)
            }

            dispatch({
                type: 'addError',
                payload: errMessage
            })
        }
    }

    const signIn = async ({ correo, password }: LoginData) => {
        try {

            const { data } = await cafeApi.post<LoginResponse>(
                '/auth/login',
                { correo, password }
            )

            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            })

            console.log('LOGIN : ' + JSON.stringify(data))

            await AsyncStorage.setItem('token', data.token)

        } catch (error) {

            let errMessage = 'Información incorrecta'

            if (isAxiosError(error)) {
                errMessage = error.response?.data.errors[0].msg
                console.log(errMessage)
            }

            dispatch({
                type: 'addError',
                payload: errMessage
            })
        }
    }
    const logOut = async () => {
        await AsyncStorage.removeItem('token')
        dispatch({ type: 'logOUt' })
    }

    const removeError = () => {
        dispatch({ type: 'removeError' })
    }

    return (
        <AUthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
        }}>
            {children}
        </AUthContext.Provider>
    )
}