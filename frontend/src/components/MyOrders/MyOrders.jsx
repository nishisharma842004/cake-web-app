import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../redux/actions/orderAction";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";


const MyOrders = () => {
  const { orders, loading, error } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  console.log(orders);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
 
    dispatch(getMyOrders());
  }, [dispatch]);
  return (
    <section className="tableClass">
      {loading === false ? (
        <main>
          <table>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Order Status</th>
                <th>Item Quantity</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders &&
                orders.map((i) => (
                  <tr key={i._id}>
                    <Link to={`/feedback`}> {i._id}</Link>
                    <td>{i.orderStatus}</td>
                    <td>
                      {i.orderItems.cheeseCake.quantity +
                        i.orderItems.blackForestCake.quantity +
                        i.orderItems.pineAppleCake.quantity}
                    </td>
                    <td>₹{i.totalAmount}</td>
                    <td>{i.paymentMethod}</td>
                    <td>
                      <Link to={`/order/${i._id}`}>
                        <AiOutlineEye />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </main>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default MyOrders;
