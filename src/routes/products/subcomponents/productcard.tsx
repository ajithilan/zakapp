import axios, { AxiosError } from "axios";
import type { ProductType } from "../../../types";
import { useContext } from "react";
import { AppContext } from "../../../App";
import { AdminContext } from "../../admin/admin";

interface ProductCardType {
    data: ProductType;
    DeleteDisplay?: boolean;
}

const CartSvg = () => (
    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"/>
    </svg>
)

const DeleteSvg = () => (
    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
    </svg>
)

export const ProductCard = ({ data, DeleteDisplay }: ProductCardType) => {
    const { setProducts } = useContext(AppContext);
    const { setId } = useContext(AdminContext);
    const { id, title, price, category, desc, url } = data;

    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    });

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`https://my-json-server-zakapp.onrender.com/products/${id}`);
            setProducts(prev => {
                const arr = prev.filter(obj => obj.id !== id);
                return arr;
            });
            setId('');
            alert(`Product with ID ${id} deleted`)!
        }
        catch(error) {
            const err = error as AxiosError;
            alert('Error deleting data, see console for more details');
            if(err.response) console.log("status - ", err.response.statusText);
        };
    }

    return (
        <div
        key={id}
        data-category={category}
        className={`min-h-100 max-h-110 flex flex-col bg-white ${ !DeleteDisplay && 'hover:scale-103 hover:shadow' } rounded-lg transition-all duration-200 border overflow-hidden`}
        >
            <img
            src={url.replace('/', '')}
            className="h-3/5 mx-auto"
            alt={title}
            />
            <div className="flex-1 px-3 pb-2">
                <h6 className="h-8 text-xl text-gray-700 font-semibold pb-2 line-clamp-1">
                    { title }
                </h6>
                <span className="text-xl font-bold">
                    { formatter.format(price) }
                </span>
                <p className="line-clamp-1 text-gray-600 my-4">
                    { desc }
                </p>
                {
                    !DeleteDisplay
                    ? (
                        <button
                        type="button"
                        className="w-fit flex items-center gap-2 text-gray-800 hover:text-white hover:bg-gray-800 font-semibold px-4 py-2 rounded-md mx-auto border transition-colors duration-200"
                        >
                            Add to Cart
                            <CartSvg/>
                        </button>
                    )
                    : (
                        <button
                        type="button"
                        onClick={handleDelete}
                        className="w-fit flex items-center gap-2 text-gray-800 hover:text-white hover:bg-gray-800 font-semibold px-4 py-2 rounded-md mx-auto border transition-colors duration-200"
                        >
                            Delete product
                            <DeleteSvg/>
                        </button>
                    )
                }
            </div>
        </div>
    )
}