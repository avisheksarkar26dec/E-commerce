import { useState } from "react";
import { useDispatch } from "react-redux";
import { PriceFilterWithSale } from "../redux/slice/SephoraApi";


const Filter = () => {

    const dispatch=useDispatch()

    const [input,setInput]=useState(15000)

    const [isChecked, setIsChecked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);


    const handelChangePrice=(e)=>{
        setInput(e.target.value)
        
        if(isChecked==true){
            dispatch(PriceFilterWithSale({price:input,sale:true}))
            console.log(isDisabled,"me")

        }else{
            dispatch(PriceFilterWithSale({price:input,sale:""}))
            console.log(isDisabled)

        }
    }

    const handleButtonClick = () => {
        setIsChecked(!isChecked);
        setIsDisabled(!isDisabled);
    };

    

    return (
        <div className="flex flex-col shadow-md cursor-pointer w-96 hover:-translate-y-1 duration-300">
            <div className="inline relative group h-48 px-10">
                <label htmlFor="medium-range" className="block mb-2 text-sm font-medium text-gray-900">Price Range<span className="ml-3 text-sm font-medium text-gray-400 dark:text-gray-500">Rs. {input}</span></label>
                
                <input id="medium-range" type="range"  onChange={handelChangePrice}  value={input} min="0" max="15050" className="w-full h-2 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

                <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Rs 1000</span>
                    <span className="text-sm text-gray-700">Rs 3000</span>
                    <span className="text-sm text-gray-700">Rs 5000</span>
                    <span className="text-sm text-gray-700">Rs 8000</span>
                    <span className="text-sm text-gray-700">Rs 15000</span>
                </div>


                <div className="w-[100%] flex justify-between items-center gap-11 mt-8 ">

                    <span className="ml-3 text-sm font-medium text-gray-900">Only Sales</span>

                    <label className="relative inline-flex items-center mr-5 cursor-pointer">

                        <input
                            type="checkbox"
                            className="sr-only peer"
                            disabled={isDisabled}
                            checked={isChecked}
                            readOnly
                        />
                        <div onClickCapture={handleButtonClick} onClick={handelChangePrice} className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                    after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>


                    </label>

                </div>
            </div>
        </div>
    )
}

export default Filter