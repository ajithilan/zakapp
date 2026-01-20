import { useContext, useRef, type KeyboardEvent } from "react"
import { ClearBtn } from "./clearbtn";
import { ProductContext } from "../products";

const SearchSvg = () => (
    <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
    </svg>
)

export const SearchBar = () => {
    const { keyword, setKeyword } = useContext(ProductContext);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = (e: KeyboardEvent) => {
        const key = e.key;
        if(key === 'Enter') {
            const el = e.target as HTMLInputElement;
            setKeyword(el.value.trim().toLowerCase());
        }
    }

    const handleClearSearch = () => {
        setKeyword('');
        if(inputRef.current) inputRef.current.value = '';
    }
    
    return (
        <div className="h-10 flex items-center bg-white rounded-full px-2 shadow border">
            <SearchSvg/>
            <input
            ref={inputRef}
            type="text"
            className="h-full pl-3 pr-2 focus:outline-none"
            onKeyDown={handleSearch}
            placeholder="search"
            />
            { keyword && <ClearBtn onClick={handleClearSearch} ariaLabel="clear search"/> }
        </div>
    )
}