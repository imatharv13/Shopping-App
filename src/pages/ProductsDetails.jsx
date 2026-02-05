import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProductById } from '../features/products/productThunks'
import { useParams } from 'react-router-dom'
import { clearSelectedProduct } from '../features/products/productSlice'
import {addToCart} from "../features/cart/cartSlice"
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'


const ProductsDetails = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearSelectedProduct());
    }
  }, [dispatch, id]);

  if(loading || !selectedProduct){
    return(
      <div className="min-h-screen flex justify-center items-center">
          Loading Product Details....
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
  const handleAddToCart = () =>{
    dispatch(addToCart({
      id:selectedProduct.id,
      title:selectedProduct.title,
      price:selectedProduct.price,
      image:selectedProduct.image,
    }));
    toast.success("Product added to cart!");
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.title}
              className="h-96 object-contain" 
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900">
              {selectedProduct.title}
            </h1>

            {/* Category */}
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-semibold">CATEGORY</p>
              <p className="text-lg text-gray-700 capitalize">
                {selectedProduct.category}
              </p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-semibold">PRICE</p>
              <p className="text-4xl font-bold text-blue-600">
                ₹{selectedProduct.price}
              </p>
            </div>

            {/* Rating */}
            {selectedProduct.rating && (
              <div className="space-y-2">
                <p className="text-sm text-gray-500 font-semibold">RATING</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-yellow-500">
                    ★ {selectedProduct.rating.rate}
                  </span>
                  <span className="text-gray-600">
                    ({selectedProduct.rating.count} reviews)
                  </span>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-semibold">DESCRIPTION</p>
              <p className="text-base text-gray-700 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-6 space-y-3">
              
              <button  onClick={handleAddToCart}
               className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
              <Link to={'/products'}>
              <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                Continue Shopping
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsDetails;
