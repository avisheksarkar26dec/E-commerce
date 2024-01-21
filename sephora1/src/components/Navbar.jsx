import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, NavLink } from 'react-router-dom'
import { ProductSearch, getProductsFromApi, setProdutctsData } from '../redux/slice/SephoraApi';

function Navbar() {

    const [navbarOpen, setNavbarOpen] = useState(false);
    const dispatch = useDispatch()
    const { cartData } = useSelector((state) => state.sephoraApi)


    
    const [input,setInput]=useState("")

    const handelChange=(e)=>{
        setInput(e.target.value)
        dispatch(ProductSearch(input))
    }

    const handelSubmit=(e)=>{
        e.preventDefault()
        console.log(input)
        dispatch(ProductSearch(input))
    }


    useEffect(() => {

        const getProduct = async () => {

            await dispatch(getProductsFromApi()).then(() => console.log("success"))
        }

        const productData = localStorage.getItem('productsData')
        const expireTime = localStorage.getItem('expirationTime')

        if (productData) {
            dispatch(setProdutctsData(productData))
        }

        if (!productData && new Date().getTime() > expireTime) {
            localStorage.removeItem('productsData')
            localStorage.removeItem('expirationTime')
            getProduct()
        }

    }, [])


    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-[#c7ce4f]">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <NavLink className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href='#none' >
                            Shop-Redux
                        </NavLink>
                        <button className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)} >
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>

                    <form className="flex items-center" onSubmit={handelSubmit}>
                        <label htmlFor="voice-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <input type="text" onChange={handelChange}  id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Name..." required />
                        </div>
                        <button type="submit" className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg aria-hidden="true" className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Search
                        </button>
                    </form>

                    <div className={"lg:flex flex-grow items-center" + (navbarOpen ? " flex" : " hidden")} id="example-navbar-danger" >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <li className="nav-item subnavitems">
                                <NavLink className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" to='/' >
                                    <i className="fa-solid fa-house text-lg leading-lg text-white" ></i><span className="ml-2">Home</span>
                                </NavLink>
                            </li>
                            <li className="nav-item subnavitems">
                                <NavLink className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" to='/cart' >
                                    <i className="fa-solid fa-hourglass-half text-lg leading-lg text-white"></i><span className="ml-2">Cart</span>
                                </NavLink>
                            </li>

                            <li className=" mr-4 font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
                                <a href="#" role="button" className="relative flex">
                                    <svg className="flex-1 w-8 h-8 fill-current " viewBox="0 0 24 24">
                                        <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                                    </svg>
                                    <span className="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">{cartData.length}
                                    </span>
                                </a>
                            </li>

                            <button className="bg-red-400 hover:bg-black text-white font-semibold hover:text-white py-2 px-4 border border-red-200 hover:border-transparent rounded">
                                Logout
                            </button>
                           
                        </ul>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    );
}

export default Navbar