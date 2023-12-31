import { useEffect, useState } from "react"
import cafeApi from "../api/cafeApi"
import { Categoria, CategoriesResponse } from "../interfaces/appInterfaces"
import { SectionListComponent, Settings } from "react-native"



export const useCategories = () => {

    const [categories, setCategories] = useState<Categoria[]>([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {

        const resp = await cafeApi.get<CategoriesResponse>('/categorias')
        setCategories(resp.data.categorias)
        setIsLoading(false)
    }

    return {
        isLoading,
        categories
    }
}
