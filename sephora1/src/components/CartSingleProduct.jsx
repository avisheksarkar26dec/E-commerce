/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { quantityUp,quantityDown, TotalCartPrice,CartProductRemove } from "../redux/slice/SephoraApi";

const CartSingleProduct = ({x}) => {

    const imageUrls = x["image-urls"];
    const dispatch=useDispatch()

    const priceUpdate=()=>{
        dispatch(TotalCartPrice())
    }

    const qtyIncrement=(id)=>{
        console.log(id)
        dispatch(quantityUp(id))
        priceUpdate()
    }
    const qtyDecrement=(id)=>{
        console.log(id)
        dispatch(quantityDown(id))
        priceUpdate()
    }

    const removeProduct=(id)=>{
        dispatch(CartProductRemove(id))
    }
    return (
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div className="flex w-2/5">
                <div className="w-20">
                    <img className="h-24" src={imageUrls[0]} alt="" />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{x.name} <span className="text-red-500 text-xs">{x["sale-text"]}</span></span>
                    <span className="text-black text-xs">{x["heading"]}</span>
                    <a onClick={()=>removeProduct(x['featured-variant-id'])} className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer">Remove</a>
                </div>
            </div>
            <div className="flex justify-center w-1/5">
                <svg  onClick={()=>qtyDecrement(x['featured-variant-id'])} className="cursor-pointer fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>

                <input className="mx-2 border text-center w-8" type="text" value={x.quantity} />

                <svg  onClick={()=>qtyIncrement(x['featured-variant-id'])} className="cursor-pointer fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
            </div>
            <span className="text-center w-1/5 font-semibold text-sm"> ₹{x.price}</span>
            <span className="text-center w-1/5 font-semibold text-sm">${x.price*x.quantity}</span>
        </div>
    )
}

export default CartSingleProduct