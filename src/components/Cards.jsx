import React, { useEffect, useState } from "react";
import axios from "axios";

const Cards = () => {
  const [allusers, setallusers] = useState([]);
  const [fav, setfav] = useState([]);

  useEffect(() => {
    const data = async () => {
      const reponse = await axios.get("https://fakestoreapi.com/products");

      setallusers(reponse.data);
    };
    data();
  }, []);


    

  const carthandler = (e, idx) => {
    const newArr = [...fav, allusers[idx]];
    setfav(newArr);
    // console.log(newArr);
  };
  const cartappear = () => {
      
      const cart = document.querySelector(".cart-items");
    cart.style.display = "block";
  }
  const cartdisplay = () => {
    const cart = document.querySelector(".cart-items");
    cart.style.display = "none";
  }
  const cartdeletehandler = (e,idx) => {
    const newArr = [...fav];
    newArr.splice(idx, 1);
    setfav(newArr);
  }

  return (
    <div className="main w-full h-screen bg-[#F1F2F4] relative">
      <div className="navbar w-full h-[5vw] bg-[#FFFFFF] flex justify-between items-center px-[5vw]">
        <div className="flex gap-[3vw] w-[80%]">
          <div className="text-4xl w-[1.8vw] h-[1.8vw]">
            <i className="ri-shopping-cart-2-line text-blue-500 w-[1vw] h-[1vw]"></i>
          </div>
          <div className="text-lg w-full">
            <input
              className="shadow-lg border-[2px] cursor-pointer  bg-[#F1F2F4] px-[1.5vw] py-[.5vw] w-full rounded-lg"
              type="text"
              placeholder="Search for the products, Brands and more"
            />
          </div>
        </div>
        <div className="flex gap-[2vw]">
          <div className="flex items-center cursor-pointer gap-[.4vw] border-[1px] border-solid border-gray-300 px-[.8vw] py-[.2vw] rounded-full bg-gray-100">
            <i className="ri-user-line font-semibold"></i>
            <h3 className="text-lg font-semibold">Login</h3>
          </div>
          <div onClick={cartappear} className="flex items-center cursor-pointer gap-[.4vw]">
            <i className="ri-shopping-basket-line"></i>
            <h3 className="text-xl font-semibold relative">
              Cart
              {fav.length > 0 ? (
                <div className="bg-red-500 absolute top-[-10%] right-[-50%] text-sm text-black text-center rounded-full w-[1.5vw] h-[1.5vw]">
                  {fav.length}
                </div>
              ) : (
                <div></div>
              )}
            </h3>
          </div>
        </div>
      </div>
      <div className="cards w-full h-fit-content mt-[1vw] px-[2vw] flex flex-wrap justify-between py-[1.3vw] bg-white text-center">
        {allusers.map((user, idx) => {
          return (
            <div
              key={user.id}
              className="shadow-xl card w-[16vw] h-[24vw] bg-[#F1F2F4] rounded-[1vw] mb-[1vw] py-[1vw] flex flex-col items-center justify-between"
            >
              <img
                className="w-[90%] h-[66%] object-cover object-top rounded-md"
                src={user.image}
                alt=""
              />
              <h2 className="title w-[90%] h-[1.7vw]  font-semibold text-[1.1vw] truncate">
                {user.title}
              </h2>
              <p className="category w-[70%] h-[1vw]  text-[0.9vw] text-gray-600">
                {user.category}
              </p>
              <h1 className="w-[50%] h-[1.5vw] price">${user.price}</h1>
              <button
                onClick={(e) => {
                  carthandler(e, idx);
                }}
                className="shadow-lg w-[90%] h-[2.5vw] bg-black text-white rounded-xl"
              >
                Add to cart
              </button>
            </div>
          );
        })}
      </div>

      <div className="cart-items hidden  fixed top-1/2 left-1/2 shadow-lg  -translate-x-1/2 -translate-y-1/2 w-[85%] h-fit-content bg-gray-300 z-10 rounded-lg">
      <div className="cursor-pointer cart-items-container w-full max-h-[90vh] overflow-auto  relative  rounded-lg px-[1vw] py-[3vw]">
      <i onClick={cartdisplay} className="ri-close-large-line fixed top-[3%] right-[1%] font-semibold px-[.7vw] py-[.4vw] rounded-full bg-black text-white text-center"></i>
      {fav.length == 0 ? (<h1 className="text-black text-xl px-[2vw]">No items in the cart....😕</h1>) : (<h1></h1>)}
        {fav.map((users,idx)=>{
            return(
                <div key={idx} className="cart-item w-full h-fit bg-white rounded-lg flex justify-between items-center px-[1vw] py-[.5vw] mb-[1vw]">
                <img className="w-[20vw] h-[15vw] object-cover object-center rounded-lg mr-[2vw]" src={users.image} alt=""/>
                <h2 className="title w-[50%] h-[1.5vw]  font-semibold text-[1.1vw] truncate">
                    {users.title}
                </h2>
                <h1 className="w-[20%] h-[1.5vw] price">${users.price}</h1>
                <button onClick={()=>{
                    cartdeletehandler(users,idx)
                }} className="cursor-pointer w-[10%] h-[2.5vw] bg-black text-white rounded-xl">
                    Remove
                </button>
                </div>
            )
        })}
      </div>
      </div>
    </div>
  );
};

export default Cards;
