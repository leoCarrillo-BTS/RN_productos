import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, TextInput, StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { ProductsStackParams } from '../navigator/ProductsNavigator'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/PoductsContext';
import { LoginResponse } from '../interfaces/appInterfaces';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { }

export const ProductScreen = ({ navigation, route }: Props) => {

    const { id = '', name = '' } = route.params

    const [tempUri, setTempUri] = useState<string>()

    const { categories } = useCategories()
    const {
        loadProductById,
        addProduct,
        updateProduct,
        uploadImage
    } = useContext(ProductsContext)

    const {
        _id,
        categoriaId,
        nombre,
        img,
        form,
        onChange,
        setFormValue
    } = useForm({
        _id: id,
        categoriaId: '',
        nombre: name,
        img: ''
    })

    useEffect(() => {
        navigation.setOptions({
            title: (name) ? name : 'Nuevo Producto'
        })
    }, [])

    useEffect(() => {
        loadProduct()
    }, [])

    const loadProduct = async () => {

        if (id.length === 0) return
        const product = await loadProductById(id)

        setFormValue({
            _id: id,
            categoriaId: product.categoria._id,
            img: product.img || '',
            nombre
        })

        console.log(product)
    }

    const saveOrUpdate = async () => {
        if (id.length > 0) {
            updateProduct(
                categoriaId,
                id,
                nombre
            )
        } else {

            const tempCategoriaId = categoriaId || categories[0]._id
            const newProd = await addProduct(tempCategoriaId, nombre)

            onChange(newProd._id, '_id')
        }
    }

    const takePhoto = () => {
        launchCamera({
            mediaType: 'photo',
            quality: 0.5
        }, (resp) => {
            if (resp.didCancel) return
            if (!resp.assets) return
            if (resp.assets.length === 0) return
            if (!resp.assets[0].uri) return

            setTempUri(resp.assets[0].uri)

            console.log(resp)

            uploadImage(resp, _id)
        })
    }

    const takePhotoFromGallery = () => {

        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5
        }, (resp) => {
            if (resp.didCancel) return
            if (!resp.assets) return
            if (resp.assets.length === 0) return
            if (!resp.assets[0].uri) return

            setTempUri(resp.assets[0].uri)

            console.log(resp)

            uploadImage(resp, _id)
        })
    }

    return (
        <View style={localStyles.conatiner}>

            <ScrollView>

                {
                    img.length > 0 && !tempUri && <Image
                        source={{ uri: img }}
                        style={{
                            marginTop: 16,
                            width: '100%',
                            height: 300
                        }}
                    />
                }

                {
                    tempUri && <Image
                        source={{ uri: tempUri }}
                        style={{
                            marginTop: 16,
                            width: '100%',
                            height: 300
                        }}
                    />
                }

                <Text style={localStyles.fieldName}>
                    Nombre del Producto
                </Text>

                <TextInput
                    style={localStyles.textInput}
                    placeholder='Producto'
                    value={nombre}
                    onChangeText={
                        (value) => onChange(value, 'nombre')
                    }
                />

                <Text style={localStyles.fieldName}>
                    Categoría
                </Text>

                <Picker
                    selectedValue={categoriaId}
                    onValueChange={(itemValue) =>
                        onChange(itemValue, 'categoriaId')
                    }
                >
                    {
                        categories.map(c => (
                            <Picker.Item
                                label={c.nombre}
                                value={c._id}
                                key={c._id}
                            />
                        ))
                    }
                </Picker>

                {
                    (_id.length > 0) && (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: 16,
                            }}
                        >

                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={
                                    takePhoto
                                }
                            >

                                <Icon
                                    name='camera-outline'
                                    color='#5856D6'
                                    size={36} />

                                <Text
                                    style={{
                                        color: '#5856D6',
                                        fontSize: 12
                                    }}
                                >
                                    Cámara
                                </Text>

                            </TouchableOpacity>

                            <View
                                style={{
                                    width: 44
                                }} />

                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={
                                    takePhotoFromGallery
                                }
                            >

                                <Icon
                                    name='images-outline'
                                    color='#5856D6'
                                    size={36} />

                                <Text
                                    style={{
                                        color: '#5856D6',
                                        fontSize: 12
                                    }}
                                >
                                    Galería
                                </Text>

                            </TouchableOpacity>

                        </View>
                    )
                }

                <TouchableOpacity
                    style={{
                        marginTop: 32,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={
                        saveOrUpdate
                    }
                >
                    <Text
                        style={{
                            color: '#5856D6',
                            fontSize: 22
                        }}
                    >
                        Guardar
                    </Text>

                </TouchableOpacity>

                <View style={{ height: 64 }} />

            </ScrollView>

        </View>
    )
}

const localStyles = StyleSheet.create({
    conatiner: {
        flex: 1,
        marginHorizontal: 16
    },
    fieldName: {
        fontSize: 16,
        marginTop: 16,
    },
    textInput: {
        marginTop: 8,
        borderWidth: 1,
        paddingHorizontal: 8,
        height: 36,
        borderRadius: 8,
        borderColor: 'rgba(0,0,0,0.3)'
    }
});