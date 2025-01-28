import Subheader from "../reusableComponents/SubHeader";
import BenefitCard from "./BanefitCard";

const BenefitSection = () => {
  const benefits = [
    {
      id: 1,
      title: "High-Quality and Durable",
      description:
        "Our fitness equipment is made from top-grade materials that ensure longevity and durability. You can trust our products to withstand rigorous workouts and provide consistent performance.",
      image:
        "https://dt-fitfinity.myshopify.com/cdn/shop/files/Fin-abou2.jpg?v=1707216535&width=360",
    },
    {
      id: 2,
      title: "Ergonomically Designed",
      description:
        "Each piece of equipment is designed with user comfort and safety in mind. Our ergonomic designs help prevent injuries and ensure that you get the most out of your workouts.",
      image:
        "https://dt-fitfinity.myshopify.com/cdn/shop/files/Fin-abou1.jpg?v=1707216535&width=535",
    },
    {
      id: 3,
      title: "Wide Range of Products",
      description:
        "From treadmills and ellipticals to dumbbells and resistance bands, we offer a comprehensive selection of fitness equipment to meet all your workout needs. Whether you're a beginner or a seasoned athlete, we have something for everyone.",
      image:
        "https://dt-fitfinity.myshopify.com/cdn/shop/files/Fin-About3.jpg?v=1707216535",
    },
    {
      id: 4,
      title: "Affordable Prices",
      description:
        "We believe that everyone should have access to high-quality fitness equipment. That's why we offer our products at competitive prices without compromising on quality.",
      image:
        "https://dt-fitfinity.myshopify.com/cdn/shop/files/Fin-About2.jpg?v=1707216535",
    },
    {
      id: 5,
      title: "Expert Support",
      description:
        "Our team of fitness experts is always available to provide you with the support and guidance you need. Whether you have questions about product features or need help with setting up your equipment, we're here to assist you.",
      image:
        "https://dt-fitfinity.myshopify.com/cdn/shop/files/Fin-abou.jpg?v=1707216535&width=1920",
    },
    {
      id: 6,
      title: "Customer Satisfaction",
      description:
        "Your satisfaction is our top priority. We strive to provide exceptional customer service and a seamless shopping experience. Our positive reviews and loyal customer base speak for themselves.",
      image:
        "https://dt-fitfinity.myshopify.com/cdn/shop/files/Fin-About5.jpg?v=1707216544",
    },
  ];

  return (
    <div className="container mt-10   mx-auto">
      <Subheader className="text-center" heading={"Featured Products"} />

      <div className="mt-14">
        <BenefitCard benefits={benefits} />
      </div>
    </div>
  );
};

export default BenefitSection;
