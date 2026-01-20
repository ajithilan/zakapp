import { useContext, useEffect, useState } from "react"
import { ProductCard } from "./productcard";
import { Pagination } from "./pagination";
import { ProductContext } from "../products";

export const ProductDisplay = () => {
    const { filteredSortedProducts } = useContext(ProductContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(calcTotalPages());
    const startVal = (16 * currentPage) - 15;
    const endVal = 16 * currentPage;

    function calcTotalPages () {
        return Math.ceil(filteredSortedProducts.length / 16);
    }

    const handlePrev = () => {
        setCurrentPage(prev => {
            if(prev - 1 > 0) return prev - 1
            return prev
        })
    }

    const handlePage = (page: string | number) => {
        if(typeof page === 'string') {
            page === 'prev' ? handlePrev() : handleNext();
        }
        else setCurrentPage(page);
    }

    const handleNext = () => {
        setCurrentPage(prev => {
            if(prev + 1 <= totalPages) return prev + 1
            return prev
        })
    }

    useEffect(() => {
        setTotalPages(calcTotalPages());
        setCurrentPage(1);
    }, [filteredSortedProducts])

    if(filteredSortedProducts.length === 0) {
        return (
            <div className="flex-1 -translate-y-12 flex flex-col justify-center items-center md:text-3xl text-gray-600 opacity-70">
                <img
                src="sample.jpg"
                className="h-40"
                alt="Product sample"
                />
                No products match the keyword !
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-4 gap-6">
                { filteredSortedProducts.slice(startVal - 1, endVal).map(product => <ProductCard key={product.id} data={product}/>) }
            </div>
            <Pagination
            pages={totalPages}
            currentPage={currentPage}
            click={handlePage}
            />
        </>
    )
}