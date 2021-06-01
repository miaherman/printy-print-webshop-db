import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { OrderContext } from "../contexts/OrderContext";
import { UserContext } from "../contexts/UserContext";

const Orderinfo = () => {
  const { cart, orderPrice, payment } = useContext(CartContext);
  const { customer } = useContext(UserContext);
  const { delivery } = useContext(OrderContext);

  return (
    <div>
      <h1>View your order: </h1>

      <div>
        <h3>Customer information:</h3>
        <p>
          {customer.firstName}&nbsp;{customer.lastName}
        </p>
        <p>{customer.address}</p>
        <p>{customer.zipCode}</p>
        <p>{customer.city}</p>
        <p>{customer.phoneNr}</p>
        <p>{customer.email}</p>
      </div>

      <div>
        <h3>Shipping:</h3>
        <p>{delivery.shippingMethod}</p>
        <p>Pris: {delivery.price} kr</p>
      </div>

      <div>
        <h3>Payment information:</h3>
        <p>{payment.paymentType}</p>
      </div>

      <h3>Products:</h3>
      {cart.map((product) => (
        <div key={product.title}>
          <p>
            {product.title} {product.quantity}&nbsp;st
          </p>
        </div>
      ))}
      <p>
        Total price (including shipping): {orderPrice + delivery.price}&nbsp;SEK
      </p>
    </div>
  );
};

export default Orderinfo;
