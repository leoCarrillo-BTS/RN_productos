import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AUthContext } from '../context/AuthContext'

export const ProtectedScreen = () => {

    const { user, token, logOut } = useContext(AUthContext)

    return (
        <View style={localStyles.container}>
            <Text style={localStyles.title}>
                ProtectedScreen
            </Text>

            <Button
                title='Logout'
                color='#5856D6'
                onPress={logOut}
            />

            <Text>
                {JSON.stringify(user, null, 5)}
            </Text>

            <Text>
                {token}
            </Text>
        </View>
    )
}

const localStyles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
    }
});