import { createContext, useEffect, useState } from "react";
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import cafeApi from "../api/cafeApi";
import { ImagePickerResponse } from "react-native-image-picker";

type ProductsContextProps = {
    products: Producto[]
    loadProducts: () => Promise<void>
    addProduct: (categoria: string, nombre: string) => Promise<Producto>
    updateProduct: (categoria: string, productId: string, nombre: string) => Promise<void>
    deleteProduct: (productId: string) => Promise<void>
    loadProductById: (productId: string) => Promise<Producto>
    uploadImage: (data: any, productId: string) => Promise<void> // TODO: cambiar any
}

export const ProductsContext = createContext({} as ProductsContextProps)

export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Producto[]>([])

    useEffect(() => {
        loadProducts()
    }, [])


    const loadProducts = async () => {

        const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50')

        setProducts([...resp.data.productos])

        console.log(JSON.stringify(products))
    }

    const addProduct = async (categoryId: string, productName: string): Promise<Producto> => {

        const resp = await cafeApi.post<Producto>('/productos', {
            nombre: productName,
            categoria: categoryId
        })

        setProducts([...products, resp.data])

        return resp.data
    }

    const updateProduct = async (categoryId: string, productId: string, productName: string) => {
        const resp = await cafeApi.put<Producto>(`/productos/${productId}`, {
            nombre: productName,
            categoria: categoryId
        })

        setProducts(products.map(prod => {
            return (prod._id === productId)
                ? resp.data
                : prod
        }))
    }

    const deleteProduct = async (productId: string) => { }

    const loadProductById = async (productId: string): Promise<Producto> => {
        const resp = await cafeApi.get<Producto>(`/productos/${productId}`)
        return resp.data
    }

    const uploadImage = async (data: ImagePickerResponse, productId: string) => {

        let asset = data.assets![0]

        const fileToUpload = {
            uri: asset.uri,
            type: asset.type,
            name: asset.fileName
        }

        const formData = new FormData()
        formData.append(
            'archivo',
            fileToUpload
        )

        try {

            const resp = await cafeApi.put(
                `/uploads/productos/${productId}`,
                formData
            )
            console.log(resp)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            loadProductById,
            uploadImage,
        }}>
            {children}
        </ProductsContext.Provider>
    )
}