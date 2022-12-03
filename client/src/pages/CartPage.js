// import React, { useState } from "react";
// import { BsArrowLeftCircle } from "react-icons/bs";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import "../components/Custom.css";
// function CartPage() {
//     const [show, setShow] = useState(false);
//     return (
//         <>
//             <div>
//                 <div className="flex items-center justify-center py-8">
//                     <button onClick={() => setShow(!show)} className="  py-2 px-10 rounded    ">
//                         <AiOutlineShoppingCart className="text-2xl"/>
//                     </button>
//                 </div>
//                 {show && (
//                     <div className="w-full h-full bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0" id="chec-div">
//                         <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
//                             <div className="flex md:flex-row flex-col justify-end" id="cart">
//                                 <div className="lg:w-1/2 bg-backgound_white w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8  overflow-y-auto overflow-x-hidden h-screen" id="scroll">
//                                     <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer" onClick={() => setShow(!show)}>
//                                         <p className="text-sm text-text_color pl-2 leading-none">
//                                         <BsArrowLeftCircle className="text-2xl "/>
//                                         </p>
//                                     </div>
//                                     <p className="text-5xl font-black leading-10  mb-10  text-primary pt-3">Bag</p>

//                                     <div className="md:flex items-center mt-18 py-8    border-t  border-backgound_white ">
//                                         <div className="w-1/4">
//                                             <img src="https://cdn.tuk.dev/assets/templates/e-commerce-kit/bestSeller3.png" alt className="w-full h-full object-center object-cover" />
//                                         </div>
//                                         <div className="md:pl-3 md:w-3/4">
//                                             <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">Product Id..</p>
//                                             <div className="flex items-center justify-between w-full pt-1">
//                                                 <p className="text-base font-black leading-none text-gray-800">This Is Bag </p>
                                               
//                                             </div>
//                                             <p className="text-xs leading-3 text-text_color pt-2">Product Name: Will Here</p>
//                                             <p className="text-xs leading-3 text-text_color py-4">About Prosuct is Here :  Little Bit</p>
//                                             <p className="w-96 text-xs leading-3 text-text_color">Product Detailes here: only two lines</p>
//                                             <div className="flex items-center justify-between pt-5 pr-6">
//                                                 <div className="flex itemms-center">
            
//                                                     <p className="text-xs leading-3 flex flex-col-reverse gap-2 underline text-secondry pl-5 cursor-pointer">
//                                                         Remove:<RiDeleteBin6Line className="text-2xl"/>
//                                                      </p>
//                                                 </div>
//                                                 <p className="text-xl font-black leading-none text-gray-800">2999.00INR</p>
//                                             </div>
//                                         </div>
//                                     </div>
                                 


//                                 </div>
//                                 <div className="xl:w-1/2 md:w-1/3 w-full bg-gray-100 h-full ">
//                                     <div className="flex flex-col md:h-screen px-16 py-20 justify-between overflow-y-auto">
//                                         <div>
//                                             <p className="text-4xl font-black leading-9 text-primary">Order Summary:</p>
//                                             <div className="flex items-center justify-between pt-16">
//                                                 <p className="text-base leading-none text-text_color">Subtotal</p>
//                                                 <p className="text-base leading-none text-text_color">9,000 INR</p>
//                                             </div>
//                                             <div className="flex items-center justify-between pt-5">
//                                                 <p className="text-base leading-none text-text_color">Shipping</p>
//                                                 <p className="text-base leading-none text-text_color">30 INR</p>
//                                             </div>
                                           
//                                         </div>
//                                         <div>
//                                             <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
//                                                 <p className="text-2xl leading-normal  text-text_color">Total Amount</p>
//                                                 <p className="text-2xl font-bold leading-normal text-right text-text_color">9030 INR</p>
//                                             </div>
//                                             <button onClick={() => setShow(!show)} className="text-base leading-none w-full py-5 hover:bg-primary border border-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-primary  hover:text-text_color duration-700 ">
//                                                 Checkout
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             <style>
//                 {` /* width */
//                 #scroll::-webkit-scrollbar {
//                     width: 1px;
//                 }

//                 /* Track */
//                 #scroll::-webkit-scrollbar-track {
//                     background: #f1f1f1;
//                 }

//                 /* Handle */
//                 #scroll::-webkit-scrollbar-thumb {
//                     background: rgb(133, 132, 132);
//                 }
// `}
//             </style>
//         </>
//     );
// }
import React from "react";
import Cart from "../features/Cart/Cart";

const CartPage = () => {
  return (
    <>
      <Cart />
      <div>Card Page</div>
    </>
  );
};

export default CartPage;
