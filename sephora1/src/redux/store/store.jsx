import { configureStore } from "@reduxjs/toolkit";
import SephoraApi from "../slice/SephoraApi";

export const store= configureStore({
    reducer:{
        sephoraApi:SephoraApi
    }
})