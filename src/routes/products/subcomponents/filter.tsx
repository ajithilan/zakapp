import { useContext } from "react"
import { ProductContext } from "../products"
import { CustomSelect } from "./customsection";

const CategorySvg = () => (
    <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11H4m15.5 5a.5.5 0 0 0 .5-.5V8a1 1 0 0 0-1-1h-3.75a1 1 0 0 1-.829-.44l-1.436-2.12a1 1 0 0 0-.828-.44H8a1 1 0 0 0-1 1M4 9v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-3.75a1 1 0 0 1-.829-.44L9.985 8.44A1 1 0 0 0 9.157 8H5a1 1 0 0 0-1 1Z"/>
    </svg>
)

const SortSvg = () => (
    <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 10 4-6 4 6H8Zm8 4-4 6-4-6h8Z"/>
    </svg>
)

export const FilterBar = () => {
    const { category, setCategory, sort, setSort } = useContext(ProductContext);
    const categoriesOptions = ['electronics', 'home & living', 'kitchen', 'fashion & accessories', 'fitness & health'];
    const sortOptions = ['price[low - high]', 'price[high - low]', 'a - z', 'z - a'];

    const handleCategory = (val: string) => setCategory(val);

    const handleClearCategory = () => setCategory('');

    const handleSort = (val: string) => setSort(val);

    const handleClearSort = () => setSort('');

    return (
        <div className="flex gap-4">
            <CustomSelect
            value={category}
            arr={categoriesOptions}
            placeholder="Filter by"
            onSubmit={handleCategory}
            onClear={handleClearCategory}
            icon={<CategorySvg/>}/>
            <CustomSelect
            value={sort}
            arr={sortOptions}
            placeholder="Sort by"
            onSubmit={handleSort}
            onClear={handleClearSort}
            icon={<SortSvg/>}/>
        </div>
    )
}