interface ClearBtnType {
    onClick: () => void;
    ariaLabel: string;
}

const ClearSvg = () => (
    <svg className="w-6 h-6 text-gray-800 px-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </svg>
)

export const ClearBtn = ({ onClick, ariaLabel }: ClearBtnType) => {

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClick();
    }

    return (
        <button
        type="button"
        aria-label={ariaLabel}
        className="hover:scale-115 transition-all duration-200"
        onClick={handleClear}>
            <ClearSvg/>
        </button>
    )
}