import React from "react";
import { AiOutlineMail } from "react-icons/ai";
const OrdersPage = () => {
  return (
    <div className="py-18 px-4 bg-backgound_white h-screen md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col ">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-primary">
          Order #13432
        </h1>
        <p className="text-base font-medium leading-6 text-text_color">
          30Nov 2022 at 12:04 AM
        </p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
              Customer’s Cart
            </p>

            <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row  items-start md:items-center space-y-4  md:space-x-6 xl:space-x-8 w-full ">
              <div className="w-full md:w-40 h-40">
                <img
                  className="w-full hidden bg-white md:block"
                  src="../features/Shop/View-1.jpg"
                  alt="ProductImage"
                />
                {/* <img
                  className="w-full md:hidden"
                  src="../features/Shop/View-1.jpg"
                  alt="Product Image"
                /> */}
              </div>
              <div className="  flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0  ">
                <div className="w-full flex flex-col justify-start items-start space-y-8">
                  <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                    ProductName Will Here
                  </h3>
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-sm leading-none text-text_color">
                      <span className="text-text_color">Type: </span> Product
                      Type
                    </p>
                  </div>
                </div>
                <div className="flex justify-between space-x-8 items-start w-full">
                  {/* <p className="text-base xl:text-lg leading-6">$20.00 </p> */}

                  <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                    $20.00
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
              <h3 className="text-xl font-semibold leading-5 text-text_color">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-text_color border-b pb-4">
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-text_color">
                    Subtotal
                  </p>
                  <p className="text-base leading-4 text-text">$56.00</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-text_color">
                  Total
                </p>
                <p className="text-base font-semibold leading-4 text-text_color">
                  $36.00
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
              <h3 className="text-xl font-semibold leading-5 text-text_color">
                SoftCopy
              </h3>
              <div className="flex justify-between items-start w-full">
                <div className="flex justify-center items-center space-x-4">
                  <div className="flex flex-col justify-start items-center">
                    <p>Downlaoding Your Bill Click Below</p>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center items-center">
                <button className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full  duration-700 border border-primary text-primary hover:bg-primary hover:text-text_color font-medium leading-4 ">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
          <h3 className="text-xl font-semibold leading-5 text-gray-800">
            Customer’s Details
          </h3>
          <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                {/* <img
                  src=" "
                  alt="avatar"
                /> */}
                <div className=" flex justify-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4 text-left text-gray-800">
                    Aman Trivedi
                  </p>
                  <p className="text-base font-semibold leading-4 text-left text-gray-800">
                    Id: 29488
                  </p>
                </div>
              </div>

              <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <AiOutlineMail className="text-xl" />
                <p className="cursor-pointer text-sm leading-5 text-gray-800">
                  amantrivedi598@gmail.com
                </p>
              </div>
            </div>
            <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                  <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                    Billing Address
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    180 North King Street, Northhampton MA 1060
                  </p>
                </div>
              </div>
              <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                <button className="px-4 py-2  hover:text-text_color hover:bg-primary duration-700  text-base border border-primary text-primary ">
                  Order Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
