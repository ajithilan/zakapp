import { Link, NavLink } from "react-router-dom"

export const Navbar = () => {

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-11/12 flex justify-between bg-white rounded-lg py-2 px-8 shadow border z-999">
            <Link to="/products">
                <span className="text-2xl font-bold">Z</span>
            </Link>
            <nav className="space-x-8 text-gray-600 text-lg font-medium">
                <NavLink
                to="/products"
                className={({isActive}) => `${ isActive && 'underline underline-offset-4' }`}
                >
                    Products
                </NavLink>
                <NavLink
                to="/admin"
                className={({isActive}) => `${ isActive && 'underline underline-offset-4' }`}
                >
                    Admin
                </NavLink>
            </nav>
        </div>
    )
}