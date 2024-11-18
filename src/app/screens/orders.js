"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import {
  Popover,
  Button,
  Typography,
  Box,
  IconButton,
  Paper,
} from "@mui/material";

export default function OrderCard({
  order,
  showPopup,
  setShowPopup,
  handleDelete,
  handleCancel,
}) {
  const popupRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowPopup]);

  const handlePopupToggle = (event) => {
    setAnchorEl(event.currentTarget); // Toggle popup under the button
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      key={order.id}
      className="relative flex items-center justify-between gap-9 p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition"
    >
      <Box className="relative bg-white w-[190px] h-[180px] rounded-lg overflow-hidden">
        <Swiper
          loop={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: `.custom-swiper-button-next-${order.id}`,
            prevEl: `.custom-swiper-button-prev-${order.id}`,
          }}
          className="mySwiper h-full"
        >
          <SwiperSlide className="h-full">
            <img
              src="/image.jfif"
              alt=""
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide className="h-full">
            <img
              src="/image.jfif"
              alt=""
              className="w-full h-[260px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide className="h-full">
            <img
              src="/image.jfif"
              alt=""
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>

        <IconButton
          className={`custom-swiper-button-prev-${order.id} absolute bottom-[10px] left-[10px] z-10`}
        >
          <img src="/left-arrow.svg" alt="left-arrow" width={20} height={20} />
        </IconButton>

        <IconButton
          className={`custom-swiper-button-next-${order.id} bg-black text-white z-50 absolute bottom-[10px] right-[10px]`}
        >
          <img
            src="/right-arrow.svg"
            alt="right-arrow"
            width={20}
            height={20}
          />
        </IconButton>
      </Box>

      <Box className="flex-grow space-y-3">
        <Box className="flex justify-between items-center">
          <Typography variant="h6" fontWeight={600}>
            {order.location}
          </Typography>
          <Box className="flex gap-3 items-center">
            <Typography variant="h6" fontWeight={600}>
              {order.amount}
            </Typography>
            <IconButton
              onClick={handlePopupToggle}
              className="px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <img src="/Vector.png" className="h-[20px] w-auto object-cover" />
            </IconButton>
          </Box>
        </Box>

        <Box className="flex gap-3 items-start">
          <Box className="space-y-2 border-r border-[#CCCCCC] pr-14">
            <Box className="flex gap-3 items-center">
              <img
                src="/group.svg"
                className="h-[20px] w-[20px] object-cover"
              />
              <Typography variant="body1" fontWeight={600}>
                {order.persons}
              </Typography>
            </Box>

            <Box className="flex gap-3 items-center">
              <img
                src="/calendar_today.svg"
                className="h-[20px] w-[20px] object-cover"
              />
              <Typography variant="body1" fontWeight={600}>
                {order.date}
              </Typography>
            </Box>

            <Box className="flex gap-3 items-center">
              <img
                src="/checklist.svg"
                className="h-[20px] w-[20px] object-cover"
              />
              <Typography variant="body1" fontWeight={600}>
                {order.meal}
              </Typography>
            </Box>
          </Box>

          <Box className="px-8">
            <Typography variant="body2" fontWeight={400}>
              {order.description}
            </Typography>
          </Box>
        </Box>

        <Box className="flex items-center justify-between">
          <Box className="flex gap-6 items-center">
            <Box
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
            </Box>
            <Box className="flex gap-3 items-center">
              <img src="/help.svg" className="h-[20px] w-auto" />
              <Typography variant="body2" fontWeight={400}>
                {order.note}
              </Typography>
            </Box>
          </Box>

          <Box className="flex gap-5 items-center">
            <IconButton>
              {order.isMessaged ? (
                <img
                  src="/chat.png"
                  className="w-[20px] h-[20px] object-cover"
                />
              ) : (
                <img
                  src="/chat (1).png"
                  className="w-[20px] h-[20px] object-cover"
                />
              )}
            </IconButton>
            <Button
              variant="contained"
              color="error"
              className="px-8 py-2 uppercase"
            >
              View Offer
            </Button>
          </Box>
        </Box>
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopup}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ zIndex: 1300 }}
      >
        <Box sx={{ padding: 2 }}>
          <Typography
            onClick={() => setShowPopup(order.id)}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 1,
              padding: 1,
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            <img src="/info.svg" className="h-[20px] w-auto" />
            View Details
          </Typography>
          {order.status !== "Confirmed" && order.status !== "Cancelled" && (
            <>
              <Button
                onClick={() => handleDelete(order)}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "start",
                  color: "black",
                  gap: 1,
                  padding: 1,
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <img src="/delete.svg" className="h-[20px] w-auto" />
                Delete
              </Button>
              <Button
                onClick={() => handleCancel(order)}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "start",
                  color: "black",
                  gap: 1,
                  padding: 1,
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <img src="/cancel.svg" className="h-[20px] w-auto" />
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Popover>
    </Box>

    
  );
}
