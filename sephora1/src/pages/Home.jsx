import { useSelector } from "react-redux"
import ProductCard from "../components/ProductCard"
import Filter from "../components/Filter"

const Home = () => {

  const { products, filterdData, search } = useSelector((state) => state.sephoraApi)
  return (
    <div className="flex justify-evenly items-center flex-wrap gap-5 p-10">

      <Filter />
      {
        filterdData.length > 2 ? filterdData.map((x) => {
          return (
            <ProductCard product={x.attributes} key={x.id} />
          )
        })

          :
          products && products?.data.filter((x) => {
            if (search == "") {
              return x
            }
            else if (x.attributes.name.toLowerCase().includes(search.toLowerCase())){
                  return x
            }
          }).map((x) => {

            return (
              <ProductCard product={x.attributes} key={x.id} />
            )
          })

      }



    </div>
  )
}

export default Home