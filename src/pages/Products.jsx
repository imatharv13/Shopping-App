import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../features/products/productThunks'
import { Link } from 'react-router-dom'

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // console.log("Items : " + items)
if(loading){
  return(
    <div className="min-h-screen flex justify-center items-center">
      Loading Products....
    </div>
  )
}
if(error){
  return(
    <div className="min-h-screen flex justify-center items-center text-red-600">
      Error: {error}
    </div>
  )
}
  return (
   <div className="min-h-screen bg-gray-100 py-10 px-4">
    <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
      Products Page
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl
 mx-auto">
      {items.map((product) => (
        <div key={product.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group flex flex-col">
          <div className="h-52 bg-white flex items-center justify-center">
            <img src={product.image}
             alt={product.title}
             className="h-full object-contain group-hover:scale-110 transition-duration-200" />
          </div>
          <div className="p-4 space-y-2 flex flex-col flex-grow">
            <span className="block text-lg font-semibold text-gray-800">
              {product.category}
            </span>
            <h2 className="text-xl font-bold text-gray-900">{product.title}</h2>
            {/* <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p> */}
            <div className="mt-auto">
  <div className="pt-2">
    <span className="text-2xl text-green-500">
      ₹{product.price.toFixed(2)}
    </span>
  </div>

  <Link to={`/product/${product.id}`} className="mt-3 block">
    <button className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700 transition-colors">
      View Details
    </button>
  </Link>
</div>

          </div>
        </div>
      ))}
    </div>
   </div>
  )
}

export default Products


