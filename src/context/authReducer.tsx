import { Usuario } from "../interfaces/appInterfaces"

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated'
    errorMessage: string
    token: string | null
    user: Usuario | null
}

type AuthAction =
    | { type: 'signUp', payload: { token: string, user: Usuario } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAUthenticated' }
    | { type: 'logOUt' }


export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                errorMessage: action.payload
            }
            break;

        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }

        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user
            }

        case 'logOUt':
        case 'notAUthenticated':

            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null
            }

        default:
            return state
    }
}