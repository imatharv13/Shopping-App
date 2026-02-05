import React from 'react';
import { useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MenShirt from "../assets/MenShirt.jpg";
import Coat from "../assets/Coat.jpg";
import Earrings from "../assets/Earrings.jpg";
import Foundation from "../assets/Foundation.jpg";
import Jeans from "../assets/Jeans.jpg";
import Jersey from "../assets/Jersey.jpg";
import Lipstick from "../assets/Lipstick.jpg";
import Onepiece from "../assets/Onepiece.jpg";
import Shoe from "../assets/Shoe.jpg";
import Watch from "../assets/Watch.jpg";
import WomenShirt from "../assets/WomenShirt.jpg";
import Kurti from "../assets/Kurti.jpg"
import ActiveWear from "../assets/ActiveWear.webp"
import HandBag from "../assets/HandBag.webp"
import Hero5 from "../assets/Hero5.jpg"
import Hero2 from "../assets/Hero2.jpg"
import Hero3 from "../assets/Hero3.jpg"
import Hero4 from "../assets/Hero4.jpg"


const Home = () => {
  const dispatch = useDispatch();
  const { items: products } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const heroImages = [Hero2, Hero3, Hero4, Hero5];
const [currentHero, setCurrentHero] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentHero((prev) =>
      prev === heroImages.length - 1 ? 0 : prev + 1
    );
  }, 4000);

  return () => clearInterval(interval);
}, []);


  // Dummy data for sections if no products loaded
 const dummyProducts = [
  { id: 1, name: 'Elegant Dress', price: 89.99, rating: 4.5, category: 'men', image:  Coat },
  { id: 2, name: 'Casual Shirt', price: 49.99, rating: 4.2, category: 'men', image: MenShirt },
  { id: 3, name: 'Lipstick', price: 19.99, rating: 4.8, category: 'cosmetics', image: Lipstick},
  { id: 4, name: 'Sneakers', price: 129.99, rating: 4.6, category: 'wearables', image: Shoe },
  { id: 5, name: 'Sports', price: 59.99, rating: 4.3, category: 'men', image: Jersey},
  { id: 6, name: 'Jeans', price: 79.99, rating: 4.7, category: 'men', image:  Jeans},
  { id: 7, name: 'Foundation', price: 39.99, rating: 4.4, category: 'cosmetics', image: Foundation },
  { id: 8, name: 'Watch', price: 199.99, rating: 4.9, category: 'wearables', image: Watch },
  { id: 9, name: 'Earrings', price: 99.99, rating: 4.0, category: 'cosmetics', image: Earrings },
  { id: 10, name: 'Women Shirt', price: 198.99, rating: 4.0, category: 'women', image: WomenShirt },
  { id: 11, name: 'Onepiece', price: 89.99, rating: 4.5, category: 'women', image: Onepiece },
  { id: 12, name: 'Kurti', price: 125.99, rating: 4.5, category: 'women', image:Kurti },
  { id: 13, name: 'Active Wear ', price: 759.99, rating: 4.5, category: 'women', image: ActiveWear },
  { id: 14, name: 'HandBag', price: 89.99, rating: 4.8, category: 'cosmetics', image: HandBag},

];


  const displayProducts = products.length > 0 ? products.slice(0, 8) : dummyProducts;

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-94 object-cover-fit" />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        {/* <div className="flex items-center mb-2">
          <span className="text-yellow-400">★</span>
          <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
        </div>
        <p className="text-xl font-bold text-gray-800 mb-3">${product.price}</p>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200"
        >
          Add to Cart
        </button> */}
      </div>
    </div>
  );

  const Section = ({ title, products, viewAllLink }) => (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <Link to={viewAllLink} className="text-gray-600 hover:text-gray-900 font-medium">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
  {/* Background Slider */}
  {heroImages.map((img, index) => (
    <div
      key={index}
      className={`absolute inset-0 transition-opacity duration-5000 ${
        index === currentHero ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "1000px 500px",
        backgroundPosition: "center",
      }}
    />
  ))}

  {/* EXISTING CONTENT — DO NOT CHANGE */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Discover Your
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            Style
          </span>
        </h1>

        <p className="text-xl text-bold text-white mb-8 leading-relaxed">
          Explore the latest trends in fashion, wearables, and beauty products.
          Elevate your wardrobe with our curated collection.
        </p>

        <Link
          to={isAuthenticated ? "/products" : "/login"}
          className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {isAuthenticated ? "Explore" : "Create Your Account"}
        </Link>
        &nbsp;&nbsp;
        <Link
          to="/products"
          className="inline-block bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Shop the Latest Trends
        </Link>
      </div>
    </div>
  </div>
</section>


      {/* Trending Fashion Section */}
      <Section
        title="Mens Arrivals"
        products={displayProducts.filter(p => p.category === 'men').slice(0, 4)}
        viewAllLink="/products"
      />

      {/* New Arrivals Section */}
      <Section
        title="Womens Arrivals"
        products={displayProducts.filter(p => p.category === 'women').slice(0, 4)}
        viewAllLink="/products"
      />

      {/* Cosmetics & Beauty Section */}
      <Section
        title="Cosmetics & Beauty"
        products={displayProducts.filter(p => p.category === 'cosmetics').slice(0, 4)}
        viewAllLink="/products"
      />

      {/* Best Sellers Section */}
      <Section
        title="Best Sellers"
        products={displayProducts.sort((a, b) => b.rating - a.rating).slice(0, 4)}
        viewAllLink="/products"
      />

      {/* Footer-like CTA */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Look?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of fashion enthusiasts who trust us for their style needs.</p>
          
        </div>
      </section>
    </div>
  );
};

export default Home;
