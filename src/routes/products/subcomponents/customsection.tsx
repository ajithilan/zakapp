import { ClearBtn } from "./clearbtn";

interface CustomSelectProps {
    value: string;
    arr: string[];
    placeholder: string;
    onSubmit: (val: string) => void;
    onClear: () => void;
    icon: React.JSX.Element;
}

export const CustomSelect = ({ value, arr, placeholder, onSubmit, onClear, icon } : CustomSelectProps) => {

    const handleData = (e: React.MouseEvent) => {
        const el = e.target as HTMLButtonElement;
        if(el) {
            const val = el.dataset.val;
            if(val) onSubmit(val);
        }
    }

    return (
        <div className="relative group min-w-42 h-10 bg-white rounded-sm shadow border">
            <div className="h-full flex items-center gap-2 pl-2 pr-1">
                <span className="flex-1 capitalize cursor-default">{ value === '' ? placeholder : value }</span>
                { value === ''  ? icon : <ClearBtn onClick={onClear} ariaLabel="clear"/> }
            </div>
            <div
            onClick={handleData}
            className="hidden group-hover:block absolute left-0 top-full w-full divide-y divide-zinc-600 bg-white text-start rounded-sm p-1 border border-gray-500 shadow z-99"
            >
                {
                    arr.map(val => {                              
                        return (
                            <button
                            type="button"
                            key={val}
                            data-val={val}
                            className="w-full capitalize text-start hover:bg-gray-800 hover:text-white hover:rounded-sm leading-5 px-2 py-2 transition-all duration-200">
                                { val === '' ? placeholder : val }
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}