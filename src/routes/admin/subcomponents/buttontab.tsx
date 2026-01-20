import { useContext } from "react";
import { AdminContext } from "../admin";

export const ButtonTab = () => {
    const { activeTab, setActiveTab } = useContext(AdminContext);

    const handleTab = (tab: string) => {
        setActiveTab(tab);
    }

    const CustomButton = ({ val }: { val: string }) => (
        <button
        type="button"
        onClick={() => handleTab(val)}
        className={`${activeTab === val && 'bg-gray-800 text-white'} min-w-30 uppercase px-8 py-2`}>
            { val }
        </button>
    )

    return (
        <div className="w-fit divide-x rounded-md bg-white font-semibold border mx-auto overflow-hidden">
            <CustomButton val="add"/>
            <CustomButton val="edit"/>
            <CustomButton val="delete"/>
        </div>
    )
}