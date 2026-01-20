import { FilterBar } from "./subcomponents/filter"
import { SearchBar } from "./subcomponents/search"
import { ProductDisplay } from "./subcomponents/productdisplay"
import { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import type { ProductType } from "../../types";

interface ContextType {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    sort: string;
    setSort: React.Dispatch<React.SetStateAction<string>>;
    keyword: string;
    setKeyword: React.Dispatch<React.SetStateAction<string>>;
    filteredSortedProducts: ProductType[];
}

export const ProductContext = createContext({} as ContextType);

export const Products = () => {
    const { loading, products } = useContext(AppContext);
    const [filteredSortedProducts, setFilteredSortedProducts] = useState<ProductType[]>([]);
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const [keyword, setKeyword] = useState('');
    

    const sortingMethod = (arr: ProductType[]) => {
        const newArr = [...arr];
        newArr.sort((a,b) => {
            if(sort === 'price[low - high]') return a.price - b.price
            else if(sort === 'price[high - low]') return b.price - a.price
            else if(sort === 'a - z') return a.title.localeCompare(b.title)
            else return b.title.localeCompare(a.title)
        });
        return newArr
    }

    useEffect(() => {
        let arr = [...products];
        
        if(keyword) {
            arr = arr.filter(product => {
                let title = product.title.trim().toLowerCase();
                return title.includes(keyword)
            });
        }

        if(category) arr = arr.filter(product => product.category.toLowerCase() === category);

        if(sort) arr = sortingMethod(arr);

        setFilteredSortedProducts(arr);
    }, [products, keyword, category, sort]);

    const contextValues = {
        category,
        setCategory,
        sort,
        setSort,
        keyword,
        setKeyword,
        filteredSortedProducts,
    }

    return (
        <ProductContext.Provider value={contextValues}>
            <main className="w-11/12 min-h-full flex flex-col gap-10 pt-20 pb-20 mx-auto">
                <div className="flex justify-end gap-6">
                    <FilterBar/>
                    <SearchBar/>
                </div>
                {
                    loading
                    ? (
                        <div className="flex-1 -translate-y-12 flex justify-center items-center md:text-3xl text-gray-600 opacity-70">
                            Fetching products from API.....
                        </div>
                    )
                    : <ProductDisplay/>
                }
            </main>
        </ProductContext.Provider>
    )
}