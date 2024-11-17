'use client';
import { useState } from "react";
import OrderCard from "./screens/orders";
import DeletePopup from "./components/popups/delete";
import CancelPopup from "./components/popups/cancel";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: 1, // Added unique id for each order
      location: "Marriage Function 4 Dishes",
      persons: "x10",
      date: "11/01/2024",
      meal: "Lunch",
      status: "Confirmed",
      amount: "CHF 1500",
      description: "There will be any sort of internal notes which anyone can put there for remembrance and it will be shown to restaurants.",
      note: "The offer has been accepted by the restaurant.",
      isMessaged: true
    },
    {
      id: 2, // Added unique id for each order
      location: "Marriage Function 4 Dishes",
      persons: "x10",
      date: "11/01/2024",
      meal: "Lunch",
      status: "Reviewed",
      amount: "CHF 1500",
      description: "There will be any sort of internal notes which anyone can put there for remembrance and it will be shown to restaurants.",
      note: "The offer has been accepted by the restaurant.",
      isMessaged: false
    },
    // Other static data...
  ];

  const handleDelete = (order) => {
    setSelectedOrder(order);
    setShowPopup(true);
    setShowDeletePopup(true);
  };

  const handleCancel = (order) => {
    setSelectedOrder(order);
    setShowPopup(true);
    setShowCancelPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowDeletePopup(false);
    setShowCancelPopup(false);
    setSelectedOrder(null);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard
            key={order.id} // Use unique id for each order
            order={order}
            setShowPopup={setShowPopup}
            showPopup={showPopup}
            setShowDeletePopup={setShowDeletePopup}
            setShowCancelPopup={setShowCancelPopup}
            handleDelete={handleDelete}
            handleCancel={handleCancel}
          />
        ))}
      </div>

      {/* Delete Popup */}
      {showDeletePopup && selectedOrder && selectedOrder.id === showDeletePopup && (
        <DeletePopup
          handleClosePopup={handleClosePopup}
          selectedOrder={selectedOrder}
          setShowDeletePopup={setShowDeletePopup}
        />
      )}

      {/* Cancel Popup */}
      {showCancelPopup && selectedOrder && selectedOrder.id === showCancelPopup && (
        <CancelPopup
          handleClosePopup={handleClosePopup}
          selectedOrder={selectedOrder}
          setShowCancelPopup={setShowCancelPopup}
        />
      )}
    </div>
  );
}
