

import { useDispatch } from "react-redux";
import { TotalCartPrice, addToCArt } from "../redux/slice/SephoraApi";

const ProductCard = ({ product }) => {

  
    const dispatch=useDispatch()

    const addTocarts=(product)=>{

        const data={...product,quantity:1}
        dispatch(addToCArt(data))
        dispatch(TotalCartPrice())
    }


    

    const imageUrls = product["image-urls"]; // Accessing the array of image URLs
    return (
        <div className="flex flex-col shadow-md cursor-pointer w-96 hover:-translate-y-1 duration-300">
            <div className="inline relative group h-48">
                <img className="absolute rounded-t object-contain h-[100%] w-full"
                    src={imageUrls[0]}
                    alt="Product Preview" />
                <div className="flex flex-row absolute justify-end
                h-16 w-full bottom-0 px-3 space-x-2
                bg-none opacity-0 group-hover:opacity-100
                group-hover:bg-gradient-to-t from-black/20 via-gray-800/20 to-transparent 
                transition-all ease-in-out duration-200 delay-100">
                    <button className="bg-gray-50/10 rounded-full 
                    px-1 h-9 w-9 my-auto hover:bg-gray-50/20
                    transition-colors duration-200">
                        <i className="mdi mdi-playlist-plus text-xl text-gray-200
                        hover:text-white transition-all duration-200"
                            title="Add to Bookmarks"></i>
                    </button>
                    <button className="bg-gray-50/10 rounded-full 
                    px-1 h-9 w-9 my-auto hover:bg-gray-50/20
                    transition-colors duration-200">
                        <i className="mdi mdi-heart text-xl text-gray-200 p-1
                        hover:text-white transition-all duration-200"
                            title="Add to Favorites"></i>
                    </button>
                </div>
            </div>
            <div className="flex flex-col bg-white rounded-b p-3">
                <div className="text-sm font-semibold text-gray-900 hover:underline truncate">
                   {product.name}
                </div>
                <div className="text-xxs text-gray-400 truncate mt-1">
                    by
                    <a className="font-semibold hover:underline"> {product.description} </a>

                    in
                    <a className="font-semibold hover:underline"> e-commerce </a>
                </div>
                <div className="text-sm text-gray-600 font-bold mt-4 mb-1">
                ₹{product.price} <span className=" ml-4 text-red-400 line-through"> ₹{product["original-price"]}</span>
                <span className=" float-right text-yellow-400">{product["sale-text"]}</span>
                </div>
                <div className="flex flex-row mt-2">
                    <div className="flex flex-col flex-auto">
                        <div className="flex flex-row group">
                            <i className="mdi mdi-star text-xs text-amber-400 
                        hover:text-amber-500 transition-all duration-200"
                                title="Worst"></i>

                            <i className="mdi mdi-star text-xs text-amber-400 
                        hover:text-amber-500 transition-all duration-200"
                                title="Bad"></i>

                            <i className="mdi mdi-star text-xs text-amber-400 
                        hover:text-amber-500 transition-all duration-200"
                                title="Not Bad"></i>

                            <i className="mdi mdi-star text-xs text-amber-400 
                        hover:text-amber-500 transition-all duration-200"
                                title="Good"></i>

                            <i className="mdi mdi-star text-xs text-amber-400 
                        hover:text-amber-500 transition-all duration-200"
                                title="Awesome"></i>

                            <div className="text-xxs text-gray-400 ml-1 hover:underline">
                                ({product["reviews-count"]})
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row flex-auto justify-end">
                        <a className="flex text-xs border px-3 my-auto py-2 mr-2
                    border-amber-500 group hover:bg-amber-500 
                    rounded-xss
                    transition-all duration-200"  onClick={()=>addTocarts(product)} >
                            <i className="mdi mdi-cart-outline text-amber-700
                        group-hover:text-white delay-100"></i>
                        </a>
                        <a className="flex text-xs border px-3 my-auto py-2 
                    border-amber-500 group hover:bg-amber-500 
                    rounded-xss
                    transition-all duration-200">

                            <i className="mdi mdi-eye-outline text-amber-700
                        group-hover:text-white delay-100"></i>

                            <div className="text-xxs text-amber-700 font-semibold ml-2
                        group-hover:text-white delay-100">
                                Live Preview
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard