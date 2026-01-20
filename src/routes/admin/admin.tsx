import { createContext, useContext, useEffect, useState } from "react";
import { ButtonTab } from "./subcomponents/buttontab";
import { ProductForm } from "./subcomponents/productform"
import { SearchTab } from "./subcomponents/searchtab";
import { ProductCard } from "../products/subcomponents/productcard";
import { AppContext } from "../../App";
import type { ProductType } from "../../types";

interface AdminContextType {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    id: string;
    setId: React.Dispatch<React.SetStateAction<string>>;
}

export const AdminContext = createContext({} as AdminContextType);

export const Admin = () => {
    const { products } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('add');
    const [id, setId] = useState('');
    const [modifyData, setModifyData] = useState<ProductType>();

    useEffect(() => {
        if(id) {
            const product = products.find(product => product.id === id);
            if(product) setModifyData(product);
            else {
                setId('');
                alert(`No product with ID ${ id } exists!`)
            };
        }
    }, [id])

    useEffect(() => {
        setId('');
    }, [activeTab])

    const contextValues = {
        activeTab,
        setActiveTab,
        id,
        setId
    }

    return (
        <AdminContext.Provider value={contextValues}>
            <main className="w-11/12 h-full flex flex-col pt-24 2xl:pt-36 mx-auto">
                <ButtonTab/>
                <div className="flex-1 flex justify-center py-8">
                    {
                        activeTab === 'add'
                        ? <ProductForm/>
                        : (
                            <div className="flex flex-col gap-6">
                                <SearchTab/>
                                {
                                    (id && modifyData)
                                    && (
                                        activeTab === 'edit'
                                        ? <ProductForm displayData={modifyData} editModeId={activeTab === 'edit' ? id : ''}/>
                                        : <ProductCard data={modifyData} DeleteDisplay/>
                                    ) 
                                }
                            </div>
                        )
                    }
                </div>
            </main>
        </AdminContext.Provider>
    )
}