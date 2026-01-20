interface PaginationProps {
    pages: number;
    currentPage: number;
    click: (page: string | number) => void;
}

interface PageBtnProps {
    val: string | number;
    disabled?: boolean;
}
export const Pagination = ({ pages, currentPage, click }: PaginationProps ) => {

    const PageBtn = ({ val, disabled }: PageBtnProps) => (
        <button
        type="button"
        onClick={() => click(val)}
        disabled={disabled}
        className={`${ currentPage === val && 'bg-blue-200' } min-w-10 h-full px-5 py-2 capitalize enabled:hover:bg-gray-800 enabled:hover:text-white disabled:opacity-60 disabled:cursor-not-allowed! transition-colors duration-200`}>
            { val }
        </button>
    )

    return (
        <div className="w-fit h-12 flex divide-x bg-white text-sm text-gray-800 font-semibold rounded-md mx-auto mt-10 overflow-hidden border">
            <PageBtn val="prev" disabled={pages === 1}/>
            { Array.from({length: pages}).map((_, i) => <PageBtn key={i+1} val={i+1} disabled={pages === 1}/>) }
            <PageBtn val="next" disabled={pages === 1}/>
        </div>
    )
}