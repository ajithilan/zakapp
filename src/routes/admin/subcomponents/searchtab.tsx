import { useContext, useEffect, useRef, type KeyboardEvent } from "react"
import { AdminContext } from "../admin";
import { ClearBtn } from "../../products/subcomponents/clearbtn";

const SearchSvg = () => (
    <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
    </svg>
)

export const SearchTab = () => {
    const { id, setId } = useContext(AdminContext);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = (e: KeyboardEvent) => {
        const key = e.key;
        if(key === 'Enter') {
            const el = e.target as HTMLInputElement;
            setId(el.value.trim().toLowerCase());
        }
    }

    const handleClearSearch = () => {
        setId('');
        if(inputRef.current) inputRef.current.value = '';
    }

    useEffect(() => {
        if(inputRef.current) {
            if(!id) inputRef.current.value = '';
        }
    }, [id])
    
    return (
        <div className="w-100 h-12 flex items-center bg-white rounded-full px-2 shadow border mx-auto">
            <SearchSvg/>
            <input
            ref={inputRef}
            type="text"
            className="w-full h-full text-lg font-semibold text-gray-800 pl-3 pr-2 focus:outline-none"
            onKeyDown={handleSearch}
            placeholder="search by ID"
            />
            { id && <ClearBtn onClick={handleClearSearch} ariaLabel="clear search"/> }
        </div>
    )
}