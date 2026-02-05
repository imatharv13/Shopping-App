import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart?.items || []);

  const totalPrice = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id) => {
    const item = items.find((i) => i.id === id);
    const newQty = (item?.quantity || 1) + 1;
    dispatch(updateQuantity({ id, quantity: newQty }));
  };

  const handleDecrease = (id) => {
    const item = items.find((i) => i.id === id);
    const newQty = Math.max(1, (item?.quantity || 1) - 1);
    if (item && newQty !== item.quantity) {
      dispatch(updateQuantity({ id, quantity: newQty }));
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">🛒 Your Shopping Cart</h1>

        {items.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Your cart is empty</p>
        ) : (
          <>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4 mb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600">₹{item.price} x {item.quantity || 1}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="px-3 py-1 hover:bg-gray-100"
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity || 1}</span>
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="px-3 py-1 hover:bg-gray-100"
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-end mt-6">
              <div className="text-right">
                <p className="text-xl font-semibold">Total: ₹{totalPrice.toFixed(2)}</p>

                <button 
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;