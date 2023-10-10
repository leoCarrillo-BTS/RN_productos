import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native'
import { loginStyles } from '../theme/loginTheme'
import { WhiteLogo } from '../components/WhiteLogo'
import { TextInput } from 'react-native-gesture-handler'
import { useForm } from '../hooks/useForm'
import { StackScreenProps } from '@react-navigation/stack'
import { Background } from '../components/Background';
import { AUthContext } from '../context/AuthContext'

interface Props extends StackScreenProps<any, any> { }

export const RegisterScreen = ({ navigation }: Props) => {

    const { signUp, errorMessage, removeError } = useContext(AUthContext)

    const { email, password, name, onChange } = useForm({
        name: '',
        email: '',
        password: ''
    })

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

    const onRegister = () => {
        console.log({ email, password, name })
        Keyboard.dismiss()

        signUp({
            nombre: name,
            password,
            correo: email
        })
    }

    return (
        <>

            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    backgroundColor: '#5856D6'
                }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >

                <View
                    style={loginStyles.formContainer}
                >
                    <WhiteLogo />

                    <Text style={loginStyles.title}>
                        Registro
                    </Text>

                    {/* INPUTS */}

                    <Text style={loginStyles.label}>
                        Nombre
                    </Text>

                    <TextInput
                        placeholder='Ingrese su nombre'
                        placeholderTextColor={'rgba(255,255,255,0.6)'}
                        keyboardType='email-address'
                        underlineColorAndroid={'white'}
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor={'yellow'}

                        autoCapitalize='words'
                        autoCorrect={false}

                        onChangeText={(value) => onChange(value, 'name')}
                        value={name}
                        onSubmitEditing={onRegister}
                    />

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
                        onSubmitEditing={onRegister}
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
                        onSubmitEditing={onRegister}
                    />

                    {/* LOGIN BUTTON */}

                    <View
                        style={loginStyles.buttonContainer}
                    >
                        <TouchableOpacity
                            activeOpacity={0.4}
                            style={loginStyles.button}
                            onPress={onRegister}
                        >
                            <Text style={loginStyles.buttonText}>Crear cuenta</Text>

                        </TouchableOpacity>
                    </View>

                    {/* CREATE ACCOUNT */}

                    <TouchableOpacity
                        activeOpacity={0.4}
                        onPress={() => navigation.replace('LoginScreen')}
                        style={loginStyles.buttonReturn}
                    >
                        <Text style={loginStyles.buttonText}>Login</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        </>
    )
}
