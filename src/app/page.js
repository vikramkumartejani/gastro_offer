'use client';
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Popup states
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Static JSON data (fallback)
  const staticOrders = [
    {
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
    // Other static data...
  ];

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders");

        if (!res.ok) {
          throw new Error("Failed to fetch API data");
        }

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load API data, using static data instead.");
        setOrders(staticOrders); // Fall back to static data
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
        {orders.map((order, index) => (
          <div
            key={index}
            className="relative flex items-center justify-between p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <div className="flex space-x-6 w-full">
              {/* Order Image Placeholder */}
              <img src={order.image || "/image.jfif"} className="w-[190px] h-[166px] bg-gray-200 rounded-sm" />

              <div className="flex-grow space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-[18px] font-[600]">{order.location}</h2>
                  <div className="flex gap-3 items-center">
                    <span className="text-[18px] font-[600]">{order.amount}</span>
                    <button onClick={() => setShowPopup(!showPopup)}>
                      <img src="/Vector.png" className="h-[20px] w-auto object-cover" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div className="space-y-2 border-r border-[#CCCCCC] pr-14">
                    <div className="flex gap-3 items-center">
                      <img src="/group.svg" className="h-[20px] w-[20px] object-cover" />
                      <p className="text-[16px] font-[600]">{order.persons}</p>
                    </div>

                    <div className="flex gap-3 items-center">
                      <img src="/calendar_today.svg" className="h-[20px] w-[20px] object-cover" />
                      <p className="text-[16px] font-[600]">{order.date}</p>
                    </div>

                    <div className="flex gap-3 items-center">
                      <img src="/checklist.svg" className="h-[20px] w-[20px] object-cover" />
                      <p className="text-[16px] font-[600]">{order.meal}</p>
                    </div>
                  </div>

                  <div>
                    <p className="px-8 text-[14px] font-[400]">{order.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <span
                      className={`px-3 py-2 rounded-full text-[14px] font-bold w-[150px] text-center ${
                        order.status === "Confirmed"
                          ? "bg-[#28FF4833]/20 text-[#00B61B]"
                          : order.status === "In Review"
                          ? "bg-[#FFA11426]/15 text-[#D88C1C]"
                          : order.status === "Adjusted"
                          ? "bg-[#FFA11426]/15 text-[#D88C1C]"
                          : order.status === "Accepted"
                          ? "bg-[#FFA11426]/15 text-[#D88C1C]"
                          : "bg-[#E65100]/20 text-[#E65100]"
                      }`}
                    >
                      {order.status}
                    </span>
                    <div className="flex gap-3 items-center">
                      <img src="/help.svg" className="h-[20px] w-auto" />
                      <p className="text-[14px] font-[400]">{order.note}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex gap-5 items-center">
                      <button>
                        {
                          order.isMessaged? (
                            <img
                              src="/chat.png"
                              className="w-[20px] h-[20px] object-cover"
                            />
                          ) : (
                            <img
                              src="/chat (1).png"
                              className="w-[20px] h-[20px] object-cover"
                            />
                          )
                        }
                      </button>
                      <button className="px-8 py-2 bg-[#821101] uppercase text-white transition">
                        View Offer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dropdown */}
            {showPopup && (
              <div className="absolute bg-white border rounded-lg text-[black]/70 shadow-lg p-3 mt-2 w-[200px] top-12 right-4">
                <div
                  onClick={() => setShowDeletePopup(true)}
                  className="flex items-center gap-[12px] cursor-pointer py-2 px-4 hover:bg-gray-100"
                >
                  <img src="/info.svg" className="h-[20px] w-auto" />
                  <span>View Details</span>
                </div>
                <div
                  onClick={() => handleDelete(order)}
                  className="flex items-center gap-[12px] cursor-pointer py-2 px-4 hover:bg-gray-100"
                >
                  <img src="/delete.svg" className="h-[20px] w-auto" />
                  <span>Delete</span>
                </div>
                <div
                  onClick={() => handleCancel(order)}
                  className="flex items-center gap-2 cursor-pointer py-2 px-4 hover:bg-gray-100"
                >
                  <img src="/cancel.svg" className="h-[20px] w-auto" />
                  <span>Cancel</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Delete?</h3>
            <p>Are you sure to delete the item? Make sure this action will not be reversible.</p>
            <div className="flex gap-4 mt-4">
              <button onClick={handleClosePopup} className="px-4 py-2 bg-gray-400 text-white rounded-md">
                CANCEL
              </button>
              <button onClick={() => {
                // Handle delete action here
                setShowDeletePopup(false);
              }} className="px-4 py-2 bg-red-600 text-white rounded-md">
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Popup */}
      {showCancelPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Cancel?</h3>
            <p>Are you sure to cancel your order?</p>
            <div className="flex gap-4 mt-4">
              <button onClick={handleClosePopup} className="px-4 py-2 bg-gray-400 text-white rounded-md">
                NO
              </button>
              <button onClick={() => {
                // Handle cancel action here
                setShowCancelPopup(false);
              }} className="px-4 py-2 bg-yellow-600 text-white rounded-md">
                YES
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
