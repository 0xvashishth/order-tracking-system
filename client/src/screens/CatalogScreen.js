import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "../App";
import {
  // useGetDetailsQuery,
  useProductDetailsQuery,
  useUserOrderDetailsQuery,
} from "../app/api/apiSclice";
import { setUpdatedProductData } from "../app/api/features/productSlice";
import { setUpdatedUsersOrderData } from "../app/api/features/orderSlice";
import React, { useEffect } from "react";
import Error from "../components/Error";
import { createOrder } from "../app/api/features/orderActions";

const CatalogScreen = () => {
  const dispatch = useDispatch();

  // const { userInfo } = useSelector((state) => state.auth);
  const { productData } = useSelector((state) => state.product);
  const { loading, error, userOrdersData } = useSelector(
    (state) => state.order
  );

  const styles1 = {
    background: "radial-gradient(black, transparent 60%)",
    transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
    opacity: 0.2,
  };

  const data1 = useProductDetailsQuery("productDetails", {
    pollingInterval: 90000, // 15mins
    skip: !document.cookie,
  });

  const data2 = useUserOrderDetailsQuery("userOrderDetails", {
    pollingInterval: 90000, // 15mins
    skip: !document.cookie,
  });

  console.log(data1.data);
  console.log(data2.data);

  useEffect(() => {
    if (data2.data) {
      dispatch(setUpdatedUsersOrderData(data2.data));
    }
    if (data1.data) {
      dispatch(setUpdatedProductData(data1.data));
    }
  }, [data2.data, data1.data, dispatch]);

  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold mx-auto text-center pt-10 tracking-tight text-gray-900">
        Catalog Items
      </h1>
      <div className="p-1 flex flex-wrap items-center justify-center">
        {error && <Error>{error}</Error>}
        {productData.map((item, key) => {
          return (
            <div className="flex-shrink-0 m-6 relative overflow-hidden  rounded-lg max-w-xs shadow-lg">
              <div className="relative pt-10 px-10 flex items-center justify-center">
                <div
                  className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                  style={styles1}
                ></div>
                <img className="relative w-40" src="/logo.png" alt="" />
              </div>
              <div className="mx-auto text-center pt-4 font-semibold text-xl items-center justify-center">
                {item.name}
              </div>
              <div className=" px-6 pb-6 mt-6">
                <span className=" p-2 opacity-75 -mb-1">
                  {item.description}
                </span>
                <button className="btn btn-sm text-orange-500 mx-auto justify-center  text-center">
                  ${item.price}
                </button>
              </div>
              <a
                href="#yes"
                className="btn m-3 cursor-pointer bg-slate-300"
                onClick={() => {
                  dispatch(
                    createOrder({ product: item, totalAmount: item.price })
                  );
                }}
              >
                {loading ? "Please Wait.." : "Buy"}
              </a>
            </div>
          );
        })}
      </div>
      <h1 className="text-3xl font-bold mx-auto text-center pt-10 tracking-tight text-gray-900">
        Your Orders
      </h1>
      <div className="flex sm:w-11/12 md:w-3/4 lg:w-2/3 w-1/3 mx-auto flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full mb-28 text-left text-sm font-light">
                <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Ordered At
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Total Amount
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userOrdersData.map((item, key) => {
                    return (
                      <tr
                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                        key={key}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {key + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.createdAt}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.totalAmount}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.status}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogScreen;
