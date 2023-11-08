import React from "react";
import { FaUser, FaShoppingCart, FaDollarSign, FaMoneyCheckAlt } from "react-icons/fa";

const Billing = () => {
  const membership = 0; // placeholder value, replace with actual membership fee
  const deliveryFee = 0; // placeholder value, replace with actual delivery fee
  const totalAmountDue = membership + deliveryFee; // calculate total amount due

  return (
    <div className="billing-page">
      <div className="membership-section">
        <FaUser className="icon" />
        <span>Membership:</span>
        <span>R{membership}</span>
      </div>
      <div className="delivery-fee-section">
        <FaShoppingCart className="icon" />
        <span>Delivery Fee:</span>
        <span>R{deliveryFee}</span>
      </div>
      <div className="total-amount-section">
        <FaDollarSign className="icon" />
        <span>Total Amount Due:</span>
        <span>R{totalAmountDue}</span>
      </div>
      <div className="payment-icon-section">
        <FaMoneyCheckAlt className="payment-icon" />
        <span>Select a payment method:</span>
        {/* Add your payment method selection UI here */}
      </div>
      {/* Add payment processing and confirmation UI here */}
    </div>
  );
};

export default Billing;