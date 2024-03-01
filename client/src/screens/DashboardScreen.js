import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../App";
import React, { useEffect, useState } from "react";
import {
  useProductDetailsQuery,
  useOrderDetailsQuery,
} from "../app/api/apiSclice";
import { setUpdatedProductData } from "../app/api/features/productSlice";
import { setUpdatedOrderData } from "../app/api/features/orderSlice";
import { useForm } from "react-hook-form";
import Error from "../components/Error";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../app/api/features/productActions";

import { updateOrder } from "../app/api/features/orderActions";

const DashboardScreen = () => {
  const dispatch = useDispatch();

  const { ordersData } = useSelector((state) => state.order);
  const orderState = useSelector((state) => state.order);
  const { productData, error, loading } = useSelector((state) => state.product);
  const [item, setItem] = useState({
    name: "",
    price: "",
    description: "",
    isAvailable: false,
    id: "",
  });
  const [editOrder, setEditOrder] = useState({
    id: "",
    status: "",
  });
  const handleChange = (e) => {
    var { id, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [id]: value,
    }));
    console.log(item);
  };

  const handleChangeEditOrder = (e) => {
    var { id, value } = e.target;
    setEditOrder((prevItem) => ({
      ...prevItem,
      [id]: value,
    }));
    console.log(editOrder);
  };
  const { data } = useProductDetailsQuery("productDetails", {
    pollingInterval: 90000, // 15mins
    skip: !document.cookie,
  });

  const data2 = useOrderDetailsQuery("userOrderDetails", {
    pollingInterval: 90000, // 15mins
    skip: !document.cookie,
  });

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (data) {
      dispatch(setUpdatedProductData(data));
    }
    if (data2.data) {
      dispatch(setUpdatedOrderData(data2.data));
    }
  }, [data, data2.data, dispatch]);

  //   useEffect(() => {
  //     // window.location.reload();
  //   }, [success])

  const createItem = (data) => {
    dispatch(createProduct(data));
  };

  return (
    <>
      <Navbar />
      <header className="">
        <div className="mx-auto flex max-w-7xl  items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Catalog List
          </h1>
          <button
            type="button"
            className="justify-end btn btn-sm bg-slate-300"
            onClick={() =>
              document.getElementById("createItemModal").showModal()
            }
          >
            CREATE ITEM
          </button>
        </div>
      </header>
      {error && <Error>{error}</Error>}
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
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-4">
                      isAvailable
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productData.map((item, key) => {
                    return (
                      <tr
                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                        key={key}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {key + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.price}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.isAvailable ? "Yes" : "No"}
                        </td>
                        <td>
                          <details className="dropdown">
                            <summary className="m-1 btn bg-slate-300 btn-sm">
                              ACTION
                            </summary>
                            <ul className="p-2 shadow menu dropdown-content z-[1000] bg-base-100 rounded-box w-52">
                              <li>
                                <div
                                  onClick={() => {
                                    setItem(item);
                                    document
                                      .getElementById("editItemModal")
                                      .showModal();
                                  }}
                                >
                                  Edit Product
                                </div>
                              </li>
                              <li>
                                <div
                                  onClick={() => {
                                    dispatch(deleteProduct({ id: item._id }));
                                  }}
                                >
                                  Delete Product
                                </div>
                              </li>
                            </ul>
                          </details>
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

      <h1 className="text-3xl font-bold mx-auto text-center pt-10 tracking-tight text-gray-900">
        Restaurant Orders
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
                    <th scope="col" className="px-6 py-4">
                      Update Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ordersData.map((item, key) => {
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
                        <td>
                          <div
                            onClick={() => {
                              setEditOrder({
                                id: item._id,
                                status: item.status,
                              });
                              document
                                .getElementById("editOrderModal")
                                .showModal();
                            }}
                            className="btn btn-sm bg-slate-300"
                          >
                            Update Order
                          </div>
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
      {/* Modal for creating item */}
      <dialog id="createItemModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create Item 🎉</h3>
          <form onSubmit={handleSubmit(createItem)}>
            <input
              type="text"
              placeholder="Item Name"
              className="mt-4 input input-bordered w-full max-w-xs"
              {...register("name")}
              required
            />
            <input
              type="text"
              placeholder="Item Price"
              className="mt-4 input input-bordered w-full max-w-xs"
              {...register("price")}
              required
            />
            <textarea
              type="text"
              placeholder="Item Description"
              className="mt-4 pl-2 pt-2 input input-bordered w-full h-14 max-w-xs"
              {...register("description")}
              required
            />
            <div className="modal-action">
              <button type="submit" className="btn border-primary">
                {loading ? "Please Wait.." : "Submit"}
              </button>
            </div>
          </form>
          {error && <Error>{error}</Error>}
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>

      {/* Modal for editing item */}
      <dialog id="editItemModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Item 🎉</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(updateProduct(item));
            }}
          >
            <input
              type="text"
              placeholder="Item Name"
              className="mt-4 input input-bordered w-full max-w-xs"
              value={item.name}
              id="name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Item Price"
              className="mt-4 input input-bordered w-full max-w-xs"
              value={item.price}
              id="price"
              onChange={handleChange}
              required
            />
            <textarea
              type="text"
              placeholder="Item Description"
              className="mt-4 pl-2 pt-2 input input-bordered w-full h-14 max-w-xs"
              value={item.description}
              id="description"
              onChange={handleChange}
              required
            />
            <input
              type="checkbox"
              id="isAvailable"
              className="toggle"
              onChange={handleChange}
              checked={item.isAvailable}
            />
            <div className="modal-action">
              <button type="submit" className="btn border-primary">
                {loading ? "Please Wait.." : "Submit"}
              </button>
            </div>
          </form>
          {error && <Error>{error}</Error>}
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>

      {/* Modal for editing order */}
      <dialog id="editOrderModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Order Status 🎉</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(updateOrder(editOrder));
            }}
          >
            <select
              name="status"
              id="status"
              className="select mt-4 ml-3 select-bordered w-full max-w-xs"
              onChange={handleChangeEditOrder}
              defaultValue={editOrder.status}
            >
              <option value={"pending"}>pending</option>
              <option value={"completed"}>completed</option>
              <option value={"cancelled"}>cancelled</option>
              <option value={"in progress"}>in progress</option>
            </select>
            <div className="modal-action">
              <button type="submit" className="btn border-primary">
                {orderState.loading ? "Please Wait.." : "Update Status"}
              </button>
            </div>
          </form>
          {orderState.error && <Error>{orderState.error}</Error>}
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default DashboardScreen;
