
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';


export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (data) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: data,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});


export const getProductsFromApi = () => {
  return async (dispatch) => {
    dispatch(fetchProductsRequest());

    try {
      const options = {
        method: 'GET',
        url: 'https://sephora.p.rapidapi.com/products/v2/list',
        params: {
          number: '1',
          size: '30',
          country: 'SG',
          language: 'en-SG',
          sort: 'sales',
        },
        headers: {
          'X-RapidAPI-Key': '392a3040a7msh3e8aceb3d7ad922p1d1a29jsna9a1b200014e',
          'X-RapidAPI-Host': 'sephora.p.rapidapi.com',
        },
      };

      const response = await axios.request(options);

      dispatch(fetchProductsSuccess(response.data));

      
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // One day in milliseconds
      localStorage.setItem('productsData', JSON.stringify(response.data.data));
      localStorage.setItem('expireDate', expirationTime);
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
      console.error(error);
    }
  };
};


const SephoraApi = createSlice({
    name: "SephoraApi",
    initialState: {
        status: "",
        products: "",
        productsMeta: "",
        cartData: [],
        TotalCartPrice: "",
        filterdData: "",
        search: ""
    },
    reducers: {
        setProdutctsData(state, action) {
            const data = {
                data: JSON.parse(action.payload)
            }
            state.products = data
        },
        addToCArt(state, action) {
            state.cartData.push(action.payload)
        },
        quantityUp(state, action) {
            const findData = state.cartData.find((x) => x['featured-variant-id'] == action.payload);
            console.log(findData);
            findData.quantity = findData.quantity + 1;
        },
        quantityDown(state, action) {
            const findData = state.cartData.find((x) => x['featured-variant-id'] == action.payload);
            console.log(findData);
            if (findData.quantity <= 1) {
                alert("You cant go less than 1 quantity");
            } else {
                findData.quantity = findData.quantity - 1;
            }
        },
        TotalCartPrice(state) {
            const Data = state.cartData.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
            console.log(Data);
            state.TotalCartPrice = Data;
        },
        CartProductRemove(state, action) {
            const filterData = state.cartData.filter((x) => x['featured-variant-id'] !== action.payload);
            state.cartData = filterData;
        },
        PriceFilterWithSale(state, action) {
            const { price, sale } = action.payload;
            let filteredData = state.products.data;

            if (price && sale) {
                filteredData = filteredData.filter((x) => x.attributes.price < price &&  x.attributes["under-sale"] === sale);
            }
            if (price) {
                filteredData = filteredData.filter((x) => x.attributes.price < price);
            }
            if (sale) {
                filteredData = filteredData.filter((x) => x.attributes["under-sale"] === sale);
            }

            state.filterdData = filteredData;
        },

        ProductSearch(state, action){
            state.search=action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(FETCH_PRODUCTS_REQUEST, (state) => {
            state.status = "loading";
        })
        .addCase(FETCH_PRODUCTS_SUCCESS, (state, action) => {
            state.status = "fulfilled";
            state.products = action.payload;
        })
        .addCase(FETCH_PRODUCTS_FAILURE, (state) => {
            state.status = "error";
        });
    }
});

// Export actions and reducer
export const { setProdutctsData, addToCArt, quantityUp, quantityDown, TotalCartPrice,
    CartProductRemove, PriceFilterWithSale, ProductSearch } = SephoraApi.actions;

export default SephoraApi.reducer;
