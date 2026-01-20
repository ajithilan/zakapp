import { useContext, useRef } from "react"
import axios, { AxiosError } from "axios";
import { AppContext } from "../../../App";
import type { ProductType } from "../../../types";
import { AdminContext } from "../admin";

interface ProductFormType {
    displayData?: ProductType;
    editModeId?: string;
}

export const ProductForm = ({ displayData, editModeId }: ProductFormType) => {
    const { products, setProducts } = useContext(AppContext);
    const { setId } = useContext(AdminContext);
    const formRef = useRef<HTMLFormElement>(null);
    const categories = ['electronics', 'home & living', 'kitchen', 'fashion & accessories', 'fitness & health'];

    const handleFormData = async (e: React.FormEvent) => {
        e.preventDefault();
        if(formRef.current) {
            const formData = new FormData(formRef.current);
            const data = {
                ...(!editModeId && { id: String(Number(products[products.length - 1].id) + 1) }),
                title: formData.get('title'),
                price: Number(formData.get('price')),
                category: formData.get('category'),
                desc: formData.get('desc'),
                url: '/sample.jpg'
            }
            try {
                if(!editModeId) {
                    const res = await axios.post<ProductType>('https://my-json-server-zakapp.onrender.com/products', data);
                    setProducts(prev => {
                        const arr = [...prev, res.data];
                        return arr;
                    });
                    alert('New product added to database');
                }
                else {
                    const res = await axios.put<ProductType>(`https://my-json-server-zakapp.onrender.com/products/${editModeId}`, data);
                    setProducts(prev => {
                        const arr = [...prev];
                        const i = arr.findIndex(product => product.id === editModeId);
                        arr[i] = res.data;
                        return arr;
                    });
                    alert(`Product with ID ${editModeId} data modified`)!
                    setId('');
                }
            }
            catch(error) {
                const err = error as AxiosError;
                alert('Error posting data, see console for more details');
                if(err.response) console.log("status - ", err.response.statusText);
            };
            formRef.current.reset();
        }
    }

    return (
        <form
        ref={formRef}
        onSubmit={handleFormData}
        className="w-120 h-fit flex flex-col gap-6 bg-white rounded-lg px-6 py-8 shadow-xl border"
        >
            <input
            type="text"
            name="title"
            defaultValue={ displayData && displayData.title }
            className=" text-gray-600 p-2 rounded-sm border"
            placeholder="Title"
            minLength={3}
            maxLength={50}
            aria-label="Title"
            required
            />
            <input
            type="number"
            name="price"
            defaultValue={ displayData && displayData.price }
            className=" text-gray-600 p-2 rounded-sm border"
            placeholder="Price"
            min={1}
            max={999999}
            aria-label="Price"
            required
            />
            <select
            name="category"
            defaultValue={ displayData && displayData.category }
            className="text-gray-600 px-1 py-2.5 rounded-sm border capitalize focus:outline-none"
            aria-label="Category"
            required
            >
                { categories.map(category => <option key={category}>{ category }</option>) }
            </select>
            <textarea
            name="desc"
            defaultValue={ displayData && displayData.desc }
            className="h-32 text-gray-600 leading-5 p-2 rounded-sm border"
            placeholder="Description"
            minLength={3}
            maxLength={500}
            aria-label="Description"
            required
            />
            <input
            type="text"
            name="url"
            defaultValue={ displayData && displayData.url }
            className=" text-gray-600 p-2 rounded-sm border"
            placeholder="Image URL"
            minLength={3}
            maxLength={50}
            aria-label="Image URL"
            required
            />
            {
                <button
                type="submit"
                className="min-w-30 w-fit rounded-md bg-gray-800 text-white hover:bg-white hover:text-gray-800 font-semibold px-4 py-2 border ml-auto transition-colors duration-200">
                    { editModeId? 'Save Changes' : 'Add Product' }
                </button>
            }
        </form>
    )
}