import React, { useState, useRef } from "react";
import { ShoppingCart, User, ChevronLeft, ChevronRight } from "lucide-react";

const products = Array(8).fill({
  name: "CRYSTAL AGATE PHONE GRIP",
  price: "18.99$",
  image:
    "https://s3-alpha-sig.figma.com/img/515a/3922/05949d981f0a7ab0ecb2d55fcf22b90f?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DvPk-RVEKsKia~4MWGPIdnJk1HGBcShriplX4cD~6azlzZ7Pd5XutQc9D93KUooMXSV~iR2KSlJd0nlykhAPEqmhdZZEQasy~dpEsEwflj6A2nC6UvsWWyLwzQJQW8MG6tWvLcaqPtjq9M6IM3CN2UUqNxKEShZXBm~gAdRbS57CwdbEtFH~GbDEbZfhb9KoyZZ7Zwz4Lii7K3-2z0mzIdSgFTXtl3TCgFMhzcFVZYOFo6XuCLlXVa7CyivUqx8pNBXzDWHG6O-LS7~J1ifOMnLvt-ncst~nxTQsutpv6BSmOz7PkOX8hWFkaNuv240Fk8lszaz9BUz5Pll-xkRJ0A__", // Product image size updated to 198x198
});

const featuredItems = [
  {
    name: "New Arrivals",
    image:
      "https://s3-alpha-sig.figma.com/img/515a/3922/05949d981f0a7ab0ecb2d55fcf22b90f?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DvPk-RVEKsKia~4MWGPIdnJk1HGBcShriplX4cD~6azlzZ7Pd5XutQc9D93KUooMXSV~iR2KSlJd0nlykhAPEqmhdZZEQasy~dpEsEwflj6A2nC6UvsWWyLwzQJQW8MG6tWvLcaqPtjq9M6IM3CN2UUqNxKEShZXBm~gAdRbS57CwdbEtFH~GbDEbZfhb9KoyZZ7Zwz4Lii7K3-2z0mzIdSgFTXtl3TCgFMhzcFVZYOFo6XuCLlXVa7CyivUqx8pNBXzDWHG6O-LS7~J1ifOMnLvt-ncst~nxTQsutpv6BSmOz7PkOX8hWFkaNuv240Fk8lszaz9BUz5Pll-xkRJ0A__",
  }, // Featured item image size updated to 362x362
  {
    name: "New Arrivals",
    image:
      "https://s3-alpha-sig.figma.com/img/515a/3922/05949d981f0a7ab0ecb2d55fcf22b90f?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DvPk-RVEKsKia~4MWGPIdnJk1HGBcShriplX4cD~6azlzZ7Pd5XutQc9D93KUooMXSV~iR2KSlJd0nlykhAPEqmhdZZEQasy~dpEsEwflj6A2nC6UvsWWyLwzQJQW8MG6tWvLcaqPtjq9M6IM3CN2UUqNxKEShZXBm~gAdRbS57CwdbEtFH~GbDEbZfhb9KoyZZ7Zwz4Lii7K3-2z0mzIdSgFTXtl3TCgFMhzcFVZYOFo6XuCLlXVa7CyivUqx8pNBXzDWHG6O-LS7~J1ifOMnLvt-ncst~nxTQsutpv6BSmOz7PkOX8hWFkaNuv240Fk8lszaz9BUz5Pll-xkRJ0A__",
  },
  {
    name: "New Arrivals",
    image:
      "https://s3-alpha-sig.figma.com/img/515a/3922/05949d981f0a7ab0ecb2d55fcf22b90f?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DvPk-RVEKsKia~4MWGPIdnJk1HGBcShriplX4cD~6azlzZ7Pd5XutQc9D93KUooMXSV~iR2KSlJd0nlykhAPEqmhdZZEQasy~dpEsEwflj6A2nC6UvsWWyLwzQJQW8MG6tWvLcaqPtjq9M6IM3CN2UUqNxKEShZXBm~gAdRbS57CwdbEtFH~GbDEbZfhb9KoyZZ7Zwz4Lii7K3-2z0mzIdSgFTXtl3TCgFMhzcFVZYOFo6XuCLlXVa7CyivUqx8pNBXzDWHG6O-LS7~J1ifOMnLvt-ncst~nxTQsutpv6BSmOz7PkOX8hWFkaNuv240Fk8lszaz9BUz5Pll-xkRJ0A__",
  },
  {
    name: "New Arrivals",
    image:
      "https://s3-alpha-sig.figma.com/img/515a/3922/05949d981f0a7ab0ecb2d55fcf22b90f?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DvPk-RVEKsKia~4MWGPIdnJk1HGBcShriplX4cD~6azlzZ7Pd5XutQc9D93KUooMXSV~iR2KSlJd0nlykhAPEqmhdZZEQasy~dpEsEwflj6A2nC6UvsWWyLwzQJQW8MG6tWvLcaqPtjq9M6IM3CN2UUqNxKEShZXBm~gAdRbS57CwdbEtFH~GbDEbZfhb9KoyZZ7Zwz4Lii7K3-2z0mzIdSgFTXtl3TCgFMhzcFVZYOFo6XuCLlXVa7CyivUqx8pNBXzDWHG6O-LS7~J1ifOMnLvt-ncst~nxTQsutpv6BSmOz7PkOX8hWFkaNuv240Fk8lszaz9BUz5Pll-xkRJ0A__",
  },
  {
    name: "New Arrivals",
    image:
      "https://s3-alpha-sig.figma.com/img/515a/3922/05949d981f0a7ab0ecb2d55fcf22b90f?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DvPk-RVEKsKia~4MWGPIdnJk1HGBcShriplX4cD~6azlzZ7Pd5XutQc9D93KUooMXSV~iR2KSlJd0nlykhAPEqmhdZZEQasy~dpEsEwflj6A2nC6UvsWWyLwzQJQW8MG6tWvLcaqPtjq9M6IM3CN2UUqNxKEShZXBm~gAdRbS57CwdbEtFH~GbDEbZfhb9KoyZZ7Zwz4Lii7K3-2z0mzIdSgFTXtl3TCgFMhzcFVZYOFo6XuCLlXVa7CyivUqx8pNBXzDWHG6O-LS7~J1ifOMnLvt-ncst~nxTQsutpv6BSmOz7PkOX8hWFkaNuv240Fk8lszaz9BUz5Pll-xkRJ0A__",
  },
  //   { name: "Best Sellers", image: "/api/placeholder/362/362" },
  //   { name: "Special Offers", image: "/api/placeholder/362/362" },
  //   { name: "Gift Sets", image: "/api/placeholder/362/362" },
  //   { name: "Customized Crystals", image: "/api/placeholder/362/362" },
];

export default function PopRockCrystalShop() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const productsRef = useRef(null); // Create a ref for the Products section

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredItems.length) % featuredItems.length
    );
  };

  const scrollToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly to the products section
    }
  };

  return (
    <div className="bg-gradient-to-b from-cyan-300 to-gray-100 min-h-screen">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-cyan-400">Pop Rock Crystal</div>
        <nav className="space-x-4">
          <a href="#" className="text-gray-300 hover:text-cyan-400">
            Home
          </a>
          <a href="#" className="text-gray-300 hover:text-cyan-400">
            Shop
          </a>
          <a href="#" className="text-gray-300 hover:text-cyan-400">
            About Us
          </a>
          <a href="#" className="text-gray-300 hover:text-cyan-400">
            Help
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <User className="text-gray-300" />
          <ShoppingCart className="text-gray-300" />
          <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs">
            Anonymous
          </span>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <section className="py-12 flex flex-col md:flex-row items-center justify-between h-[700px]">
          {" "}
          {/* Updated height */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to
              <br />
              Pop Rock Crystal Shop!
            </h1>
            <p className="text-gray-200 mb-6">
              Here you will find unique crystal accessories for your everyday
              needs!
            </p>
            <button className="bg-white text-cyan-600 px-6 py-2 rounded-full font-semibold hover:bg-cyan-100 transition">
              SHOP NOW
            </button>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-white rounded-lg shadow-lg p-4 overflow-hidden h-[554px] w-[569px]">
              {" "}
              {/* Featured item size */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevSlide}
                  className="text-cyan-600 hover:text-cyan-800"
                >
                  <ChevronLeft size={24} />
                </button>
                <h2 className="text-xl font-semibold text-center text-gray-800">
                  {featuredItems[currentSlide].name}
                </h2>
                <button
                  onClick={nextSlide}
                  className="text-cyan-600 hover:text-cyan-800"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredItems.map((item, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 flex flex-col items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-[362px] h-[362px] object-cover rounded-lg"
                    />{" "}
                    {/* Updated size */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-center mb-6">
          <button
            onClick={scrollToProducts}
            className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition"
          >
            Scroll Down
          </button>{" "}
          {/* Scroll down button */}
        </div>

        <section ref={productsRef} className="py-12 h-[1084px]">
          {" "}
          {/* Added ref for scrolling */}
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            All Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow flex flex-col items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-48 h-48 object-cover mb-4"
                />
                <h3 className="font-semibold mb-2 text-gray-800">
                  {product.name}
                </h3>
                <p className="text-cyan-600 font-bold mb-4">{product.price}</p>
                <button className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700 transition">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition">
              View All
            </button>
          </div>
        </section>

        <section className="py-12 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8">
              <h2 className="text-sm text-gray-500 mb-2">BEST PRICE</h2>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Agate Phone Grip
              </h3>
              <div className="mb-4">
                <span className="text-gray-400 line-through mr-2">44.60$</span>
                <span className="text-4xl font-bold text-red-500">19.50$</span>
              </div>
              <p className="text-gray-600 mb-6">
                These Pop Rock Crystal grips (sockets) are universal with most
                smartphones and tablets. The design is a stylish way to hold
                your phone more securely and can even prop up the video for
                hands-free viewing.
              </p>
              <button className="bg-cyan-500 text-white px-6 py-2 rounded hover:bg-cyan-600 transition">
                BUY NOW
              </button>
            </div>
            <div className="md:w-1/2 relative flex justify-center items-center">
              {/* Updated container with a 570x570 size */}
              <div className="absolute bg-cyan-100 rounded-full w-[570px] h-[570px]"></div>
              {/* Updated image size to 248x248 inside the rounded container */}
              <img
                src="https://s3-alpha-sig.figma.com/img/e983/aa18/4f2bd18d1128138bb02546cd5f590b99?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i6BwauOwY8ZZ800uY20~d8qoYjBDhaukbnFwWAAyUegiAkbG1Bo-VXN2ebknyunOGkRoJ83CTkXCKhtDDB6Xv3Ls9o2wd022tAKeZeXjnlG7GbPxXgSw41sVOePNmt9Stj4b6q7u85wOBERZAxXwoIL8sUn1rmvWyzyRqZsNew-H19E-8O5apbmQKZy540sFaNN~AYdT7s3xOSuAaCya7kkcS34mERsZp1ToeSFXtA4vdzsPBnLAqqNZYJFixV4auxYMuG9FHmSC82LWeJMaC0tRVR-qbx79jaqfYfabme~9rckkKuyRWVNToRj3YRihqX431Q9WQD4tVT6eN3R8MQ__"
                alt="Agate Phone Grip"
                className="relative z-10 w-[248px] h-[248px] object-cover"
              />
            </div>
          </div>
        </section>

        <footer className="bg-gray-800 py-6 h-[269px]">
          <div className="container mx-auto text-center">
            <p className="text-gray-400">
              © 2023 Pop Rock Crystal Shop. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
