import React from 'react'
import { Dimensions, View } from 'react-native'

export const Background = () => {


    const { width, height } = Dimensions.get('window')

    return (
        <View
            style={{
                position: 'absolute',
                backgroundColor: '#5856D6',
                width: width * 2,
                height: height,
                left: width / 2 * -1,
                top: -144,

                transform: [
                    { rotate: '20deg' }
                ]
            }}
        />
    )
}
