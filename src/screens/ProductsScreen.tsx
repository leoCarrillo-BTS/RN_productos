import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native'
import { ProductsContext } from '../context/PoductsContext'
import { StackScreenProps } from '@react-navigation/stack'
import { ProductsStackParams } from '../navigator/ProductsNavigator'

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> { }

export const ProductsScreen = ({ navigation }: Props) => {

    const [isRefreshing, setIsRefreshing] = useState(false)

    const {
        products,
        loadProducts
    } = useContext(ProductsContext)

    useEffect(() => {

        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ marginRight: 16 }}
                    onPress={
                        () => navigation.navigate('ProductScreen', {})
                    }
                >
                    <Text>
                        Agregar
                    </Text>
                </TouchableOpacity>
            )
        })

    }, [])

    const loadProductsFromBackend = async () => {
        setIsRefreshing(true)
        await loadProducts()
        setIsRefreshing(false)
    }

    return (
        <View
            style={{
                flex: 1,
                marginHorizontal: 16
            }}
        >
            <FlatList
                data={products}
                keyExtractor={(p) => p._id}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={loadProductsFromBackend}
                    />
                }

                renderItem={({ item }) => (

                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={
                            () => navigation.navigate('ProductScreen', {
                                id: item._id,
                                name: item.nombre
                            })
                        }
                    >
                        <Text style={localStyles.productName}>
                            {item.nombre}
                        </Text>
                    </TouchableOpacity>
                )}

                ItemSeparatorComponent={() => (
                    <View style={localStyles.itemSeparator} />
                )}

            // ItemSeparatorComponent={() => {
            //     <View style={localStyles.productName} />
            // }}
            />
        </View>
    )
}

const localStyles = StyleSheet.create({
    productName: {
        fontSize: 20
    },
    itemSeparator: {
        borderBottomWidth: 1,
        marginVertical: 8,
        borderBottomColor: 'rgba(0,0,0,0.2)'
    }
});