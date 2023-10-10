import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AUthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {

}

export const LoginScreen = ({ navigation }: Props) => {

    const { signIn, errorMessage, removeError } = useContext(AUthContext)

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    })

    const onLogin = () => {
        console.log({ email, password })
        Keyboard.dismiss()

        signIn({ correo: email, password: password })
    }

    useEffect(() => {

        if (errorMessage.length === 0) return

        Alert.alert(
            'Login Incorrecto',
            errorMessage,
            [
                {
                    text: 'Ok', onPress: removeError
                }
            ]
        )

    }, [errorMessage])


    return (
        <>
            <Background />

            <KeyboardAvoidingView
                style={{
                    flex: 1
                }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >

                <View
                    style={loginStyles.formContainer}
                >
                    <WhiteLogo />

                    <Text style={loginStyles.title}>
                        Login
                    </Text>

                    {/* INPUTS */}


                    <Text style={loginStyles.label}>
                        Email
                    </Text>

                    <TextInput
                        placeholder='Ingrese su email'
                        placeholderTextColor={'rgba(255,255,255,0.6)'}
                        keyboardType='email-address'
                        underlineColorAndroid={'white'}
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor={'yellow'}

                        autoCapitalize='none'
                        autoCorrect={false}

                        onChangeText={(value) => onChange(value, 'email')}
                        value={email}
                        onSubmitEditing={onLogin}
                    />

                    <Text style={loginStyles.label}>
                        Contraseña
                    </Text>

                    <TextInput
                        placeholder='Ingrese su contraseña'
                        placeholderTextColor={'rgba(255,255,255,0.6)'}
                        keyboardType='default'
                        secureTextEntry={true}
                        underlineColorAndroid={'white'}
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor={'yellow'}

                        autoCapitalize='none'
                        autoCorrect={false}

                        onChangeText={(value) => onChange(value, 'password')}
                        value={password}
                        onSubmitEditing={onLogin}
                    />

                    {/* LOGIN BUTTON */}

                    <View
                        style={loginStyles.buttonContainer}
                    >
                        <TouchableOpacity
                            activeOpacity={0.4}
                            style={loginStyles.button}
                            onPress={onLogin}
                        >
                            <Text style={loginStyles.buttonText}>Login</Text>

                        </TouchableOpacity>
                    </View>

                    {/* CREATE ACCOUNT */}

                    <View style={loginStyles.newUserContainer}>
                        <TouchableOpacity
                            activeOpacity={0.4}
                            onPress={() => navigation.navigate('RegisterScreen')}
                        >
                            <Text style={loginStyles.buttonText}>Crear cuenta</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </>
    )
}
