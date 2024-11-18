"use client";
import { useState, useMemo } from "react";
import { Box, Container, Typography } from "@mui/material";
import OrderCard from "./screens/orders";
import DeletePopup from "./components/popups/delete";
import CancelPopup from "./components/popups/cancel";

const initialOrders = [
  {
    id: 1,
    location: "Marriage Function 4 Dishes",
    persons: "x10",
    date: "11/01/2024",
    meal: "Lunch",
    status: "Confirmed",
    amount: "CHF 1500",
    description:
      "There will be any sort of internal notes which anyone can put there for remembrance and it will be shown to restaurants.",
    note: "The offer has been accepted by the restaurant.",
    isMessaged: true,
    city: "Zürich",
  },
  {
    id: 2,
    location: "Marriage Function 4 Dishes",
    persons: "x10",
    date: "11/02/2024",
    meal: "Lunch",
    status: "In Review",
    amount: "CHF 1500",
    description:
      "There will be any sort of internal notes which anyone can put there for remembrance and it will be shown to restaurants.",
    note: "The offer has been accepted by the restaurant.",
    isMessaged: true,
    city: "Zürich",
  },
  {
    id: 3,
    location: "Marriage Function 4 Dishes",
    persons: "x10",
    date: "11/01/2024",
    meal: "Lunch",
    status: "In Review",
    amount: "CHF 1500",
    description:
      "There will be any sort of internal notes which anyone can put there for remembrance and it will be shown to restaurants.",
    note: "The offer has been accepted by the restaurant.",
    isMessaged: false,
    city: "Las Vegas",
  },
  {
    id: 4,
    location: "Marriage Function 4 Dishes",
    persons: "x10",
    date: "11/01/2024",
    meal: "Lunch",
    status: "Adjusted",
    amount: "CHF 1500",
    description:
      "There will be any sort of internal notes which anyone can put there for remembrance and it will be shown to restaurants.",
    note: "The offer has been accepted by the restaurant.",
    isMessaged: false,
    city: "Las Vegas",
  },
  {
    id: 5,
    location: "Marriage Function 4 Dishes",
    persons: "x10",
    date: "11/01/2024",
    meal: "Lunch",
    status: "Accepted",
    amount: "CHF 1500",
    description:
      "There will be any sort of internal notes which anyone can put there for remembrance and it will be shown to restaurants.",
    note: "The offer has been accepted by the restaurant.",
    isMessaged: false,
    city: "Las Vegas",
  },
];

export default function Home() {
  const [orders, setOrders] = useState(initialOrders);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showPopup, setShowPopup] = useState(null);

  const sortedOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => a.city.localeCompare(b.city))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [orders]);

  const groupedOrders = useMemo(() => {
    return sortedOrders.reduce((acc, order) => {
      if (!acc[order.city]) {
        acc[order.city] = [];
      }
      acc[order.city].push(order);
      return acc;
    }, {});
  }, [sortedOrders]);

  const handleDelete = (order) => {
    setSelectedOrder(order);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    setOrders((prevOrders) =>
      prevOrders.filter((o) => o.id !== selectedOrder.id)
    );
    setShowDeletePopup(false);
    setSelectedOrder(null);
  };

  const handleCancel = (order) => {
    setSelectedOrder(order);
    setShowCancelPopup(true);
  };

  const confirmCancel = () => {
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.id === selectedOrder.id ? { ...o, status: "Cancelled" } : o
      )
    );
    setShowCancelPopup(false);
    setSelectedOrder(null);
  };

  const handleClosePopup = () => {
    setShowDeletePopup(false);
    setShowCancelPopup(false);
    setSelectedOrder(null);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 4 }}>
        Orders
      </Typography>

      {Object.keys(groupedOrders).map((city) => (
        <Box key={city} sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 4, mb: 2 }}>
            {city} -{" "}
            {new Date(groupedOrders[city][0].date).toLocaleDateString()}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {groupedOrders[city].map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                showPopup={showPopup}
                setShowPopup={setShowPopup}
                handleDelete={handleDelete}
                handleCancel={handleCancel}
              />
            ))}
          </Box>
        </Box>
      ))}

      {showDeletePopup && selectedOrder && (
        <DeletePopup
          handleClosePopup={handleClosePopup}
          confirmDelete={confirmDelete}
        />
      )}

      {showCancelPopup && selectedOrder && (
        <CancelPopup
          handleClosePopup={handleClosePopup}
          confirmCancel={confirmCancel}
        />
      )}
    </Container>
  );
}
