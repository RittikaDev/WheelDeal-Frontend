import { Star, StarHalf, User } from "lucide-react";
import Header from "../reusableComponents/Header";

export interface CustomerReview {
  key: number;
  customerName: string;
  rating: number;
  review?: string; // New property for a short quote
}
const Testimonial = () => {
  const customerReviews: CustomerReview[] = [
    {
      key: 1,
      customerName: "Joey Tribbiani",
      rating: 5,
      review:
        "The service was outstanding! My car has never run better, and the team was incredibly professional. Highly recommend!",
    },
    {
      key: 2,
      customerName: "Emily Jones",
      rating: 4,
      review:
        "Great experience! The staff was friendly, and the quality of work exceeded my expectations. Will definitely return.",
    },
    {
      key: 3,
      customerName: "Scarlet Brown",
      rating: 5,
      review:
        "I was impressed with the attention to detail. My tires were replaced quickly, and the ride feels amazing now!",
    },
    {
      key: 4,
      customerName: "April LeDay",
      rating: 4.5,
      review:
        "Fantastic customization work! My car looks stunning, and I couldn’t be happier with the result. Worth every penny!",
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 !== 0; // Check for half star

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="text-yellow-500 w-5 h-5" fill="currentColor" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="text-yellow-500 w-5 h-5"
          fill="currentColor"
        />
      );
    }

    return stars;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 ">
      <div className="text-center mb-10">
        <Header header="Customer Testimonials" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {customerReviews.map((item) => (
          <div
            key={item.key}
            className="p-6 border border-yellow-300 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl shadow-xl text-center"
          >
            <div className="flex justify-center items-center">
              <User className="text-yellow-600 dark:text-primary text-5xl drop-shadow-md" />
            </div>
            <h3 className="font-extrabold text-xl mt-3 text-yellow-700 dark:text-gray-200">
              {item.customerName}
            </h3>

            {/* Rating Stars */}
            <div className="flex justify-center mt-2">
              {renderStars(item.rating)}
            </div>

            {item.review && (
              <p className="mt-4 text-xs italic text-yellow-600 dark:text-gray-400">
                “{item.review}”
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
