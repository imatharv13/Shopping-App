const customProducts = [
  {
    "id": 21,
    "title": "Urban Trek Laptop Backpack",
    "price": 129.99,
    "description": "A durable everyday backpack designed for city travel and office use with a padded laptop compartment.",
    "category": "accessories",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    "rating": { "rate": 4.2, "count": 210 }
  },
  {
    "id": 22,
    "title": "Classic Cotton Crew T-Shirt",
    "price": 19.99,
    "description": "Soft breathable cotton t-shirt suitable for daily wear and casual outings.",
    "category": "casual wear",
    "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
    "rating": { "rate": 4.4, "count": 340 }
  },
  {
    "id": 23,
    "title": "All-Season Outdoor Jacket",
    "price": 62.5,
    "description": "Weather-resistant jacket perfect for travel, trekking, and light winter conditions.",
    "category": "outerwear",
    "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
    "rating": { "rate": 4.8, "count": 520 }
  },
  {
    "id": 24,
    "title": "Slim Fit Casual Shirt",
    "price": 17.49,
    "description": "Modern slim-fit shirt with a clean look, ideal for daily and semi-formal wear.",
    "category": "casual wear",
    "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
    "rating": { "rate": 3.6, "count": 180 }
  },
  {
    "id": 25,
    "title": "Dragon Crest Chain Bracelet",
    "price": 720,
    "description": "Premium handcrafted bracelet inspired by ancient dragon symbols for strength and protection.",
    "category": "luxury jewelry",
    "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
    "rating": { "rate": 4.7, "count": 410 }
  },
  {
    "id": 26,
    "title": "Minimal Gold Stud Ring",
    "price": 180,
    "description": "Elegant gold ring designed for minimalists who prefer subtle luxury.",
    "category": "jewelry",
    "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png",
    "rating": { "rate": 4.1, "count": 95 }
  },
  {
    "id": 27,
    "title": "Princess Cut Promise Ring",
    "price": 14.99,
    "description": "A beautifully crafted ring symbolizing commitment and elegance.",
    "category": "fashion jewelry",
    "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png",
    "rating": { "rate": 3.5, "count": 360 }
  },
  {
    "id": 28,
    "title": "Rose Steel Tunnel Earrings",
    "price": 12.5,
    "description": "Stylish rose-gold plated earrings made with surgical-grade steel.",
    "category": "accessories",
    "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png",
    "rating": { "rate": 2.8, "count": 130 }
  },
  {
    "id": 29,
    "title": "Portable 2TB Storage Drive",
    "price": 69.99,
    "description": "High-speed external drive ideal for backups, media storage, and portability.",
    "category": "storage devices",
    "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png",
    "rating": { "rate": 3.9, "count": 260 }
  },
  {
    "id": 30,
    "title": "High-Speed Internal SSD 1TB",
    "price": 115,
    "description": "Boost system performance with fast boot and data transfer speeds.",
    "category": "computer hardware",
    "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png",
    "rating": { "rate": 3.7, "count": 390 }
  },
  {
    "id": 31,
    "title": "Compact SSD Performance Drive",
    "price": 112,
    "description": "Reliable SSD built for smooth multitasking and long-term usage.",
    "category": "computer hardware",
    "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png",
    "rating": { "rate": 4.9, "count": 510 }
  },
  {
    "id": 32,
    "title": "Console Gaming Expansion Drive",
    "price": 120,
    "description": "Expand your gaming library with this high-capacity portable drive.",
    "category": "gaming accessories",
    "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
    "rating": { "rate": 4.8, "count": 450 }
  },
  {
    "id": 33,
    "title": "Ultra Slim Full HD Monitor",
    "price": 579,
    "description": "Crystal-clear IPS display with smooth refresh rate for work and entertainment.",
    "category": "monitors",
    "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png",
    "rating": { "rate": 3.2, "count": 270 }
  },
  {
    "id": 34,
    "title": "49-inch Curved Gaming Display",
    "price": 1049,
    "description": "Immersive ultra-wide gaming monitor with high refresh rate and HDR support.",
    "category": "gaming monitors",
    "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png",
    "rating": { "rate": 3.1, "count": 190 }
  },
  {
    "id": 35,
    "title": "3-in-1 Winter Adventure Jacket",
    "price": 61.99,
    "description": "Versatile jacket built for cold weather and outdoor exploration.",
    "category": "winter wear",
    "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png",
    "rating": { "rate": 3.4, "count": 280 }
  },
  {
    "id": 36,
    "title": "Faux Leather Moto Jacket",
    "price": 34.99,
    "description": "Stylish biker jacket with detachable hood for an urban look.",
    "category": "fashion wear",
    "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png",
    "rating": { "rate": 3.6, "count": 310 }
  },
  {
    "id": 37,
    "title": "Striped Windbreaker Raincoat",
    "price": 44.99,
    "description": "Lightweight rain jacket designed for comfort and protection.",
    "category": "rain wear",
    "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png",
    "rating": { "rate": 4.1, "count": 700 }
  },
  {
    "id": 38,
    "title": "Boat Neck Casual Top",
    "price": 11.99,
    "description": "Soft stretchable fabric top for everyday comfort and style.",
    "category": "women fashion",
    "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png",
    "rating": { "rate": 4.8, "count": 160 }
  },
  {
    "id": 39,
    "title": "Moisture Control Sports Tee",
    "price": 9.49,
    "description": "Breathable sports t-shirt ideal for workouts and active days.",
    "category": "activewear",
    "image": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png",
    "rating": { "rate": 4.6, "count": 190 }
  },
  {
    "id": 40,
    "title": "Printed Cotton Casual Tee",
    "price": 14.99,
    "description": "Comfortable printed t-shirt perfect for casual and daily wear.",
    "category": "casual wear",
    "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png",
    "rating": { "rate": 3.9, "count": 170 }
  }
]
;

export default customProducts;
