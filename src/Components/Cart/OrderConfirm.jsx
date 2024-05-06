import React from 'react';

const OrderConfirm = ({res}) => {
    console.log(res)
  return (
    <div className="bg-blue-100 p-10 rounded-lg shadow-md text-center mt-10">
      <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.293 17.707a1 1 0 0 1-1.414 0l-7-7a1 1 0 1 1 1.414-1.414L8 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7z" clipRule="evenodd" />
        </svg>
      </div>
      <h1 className="text-3xl font-semibold text-green-600 mb-2">Order Confirm</h1>
      <p>Order id:{res.orderId}</p>
      <p>Payment id:{res.paymentId}</p>

      <p className="text-gray-700">We received your purchase request; we'll be in touch shortly!</p>
    </div>
  );
};

export default OrderConfirm;
