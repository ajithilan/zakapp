import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Navbar } from "./common/navbar"
import { Products } from "./routes/products/products"
import { Admin } from "./routes/admin/admin"
import { createContext, useEffect, useState } from "react"
import { useFetch } from "./common/usefetch"
import type { ProductType } from "./types"

interface AppContextType {
  apiData: ProductType[];
  loading: boolean | null;
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

export const AppContext = createContext({} as AppContextType);

function App() {
  const { apiData, loading } = useFetch();
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if(apiData) setProducts(apiData);
  }, [apiData])
  
  const contextValues = {
    apiData,
    loading,
    products,
    setProducts
  }

  return (
    <div className="min-h-dvh">
      <img
      className="fixed w-full h-dvh scale-150 opacity-35 -z-10"
      src="/background-2.svg"
      alt="Svg background"
      />
      <AppContext.Provider value={contextValues}>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/products" element={<Products/>} />
            <Route path="/admin" element={<Admin/>} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  )
}

export default App
