import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingHorizontal: 22,
        justifyContent: 'center',
        height: 600,
        marginBottom: 50,
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 22
    },
    label: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 22
    },
    inputField: {
        top: 4,
        height: 36,
        color: 'white',
    },
    inputFieldIOS: {
        borderBottomColor: 'white',
        borderBottomWidth: 2
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 44
    },
    button: {
        borderWidth: 1,
        borderColor: 'white',
        paddingHorizontal: 16,
        height: 36,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        color: 'white'
    },
    newUserContainer: {
        alignItems: 'flex-end',
        marginTop: 16,

    },
    buttonReturn: {
        position: 'absolute',
        top: 50,
        left: 16,
        borderWidth: 1,
        borderColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 100
    }

});