import React from "react";
import {
  Heart,
  Info,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Omar Sundaram",
      time: "9 hours ago",
      stars: 3,
      review:
        "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    },
    {
      id: 2,
      name: "Omar Sundaram",
      time: "9 hours ago",
      stars: 4,
      review:
        "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    },
    {
      id: 3,
      name: "Omar Sundaram",
      time: "9 hours ago",
      stars: 5,
      review:
        "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    },
    {
      id: 4,
      name: "Omar Sundaram",
      time: "9 hours ago",
      stars: 4,
      review:
        "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    },
  ];

  const renderStars = (filledStars) => {
    return (
      <>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < filledStars
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </>
    );
  };

  const renderReviewCard = (review, isGoogle = false) => (
    <div className="p-4 border rounded-lg bg-white">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          {!isGoogle ? (
            review.name.charAt(0)
          ) : (
            <img
              src="/avatar.jpeg"
              alt={review.name}
              className="w-full h-full rounded-full"
            />
          )}
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <div className="font-medium">{review.name}</div>
            {isGoogle && (
              <img src="/google.svg" alt="Google" className="w-5 h-5" />
            )}
          </div>
          <div className="text-sm text-gray-500">{review.time}</div>
        </div>
      </div>
      <div className="flex gap-1 mb-2">{renderStars(review.stars)}</div>
      <p className="text-gray-600">{review.review}</p>
    </div>
  );

  const NavigationButtons = ({ prevClass, nextClass }) => (
    <div className="flex items-center gap-4">
      <button className={prevClass}>
        <ArrowLeft className="w-auto h-7 text-gray-600" />
      </button>
      <button className={nextClass}>
        <ArrowRight className="w-auto h-7 text-gray-600" />
      </button>
    </div>
  );

  return (
    <div>
      {/* Gestro-offer Reviews Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Gestro-offer Reviews</h2>
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">4.7</span>
              <span className="text-gray-600">(591)</span>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <NavigationButtons prevClass="gestro-prev" nextClass="gestro-next" />
        </div>
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            navigation={{
              prevEl: ".gestro-prev",
              nextEl: ".gestro-next",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                {renderReviewCard(review)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Google Reviews Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Google Reviews</h2>
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">4.7</span>
              <span className="text-gray-600">(591)</span>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <NavigationButtons prevClass="google-prev" nextClass="google-next" />
        </div>
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            navigation={{
              prevEl: ".google-prev",
              nextEl: ".google-next",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                {renderReviewCard(review, true)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
