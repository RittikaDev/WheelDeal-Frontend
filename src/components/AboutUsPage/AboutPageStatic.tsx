import { CarIcon } from "lucide-react";

interface TeamImage {
  key: number;
  empImage: string;
  designation: string;
  empName: string;
  icon: JSX.Element;
  quote: string;
}

export const teamDetails: TeamImage[] = [
  {
    key: 1,
    empImage:
      "https://media.istockphoto.com/id/1435745704/photo/portrait-of-smiling-mid-adult-businessman-standing-at-corporate-office.jpg?s=612x612&w=0&k=20&c=NtTebZxpAfw964hJJut8WFa__eZEfO07CAKdqeFBrFU=",

    designation: "CFO",
    empName: "JAMES MORRIS",
    icon: <CarIcon />,
    quote: "Keeping your bank balance in top shape is what I do best.",
  },
  {
    key: 2,
    empImage:
      "https://media.istockphoto.com/id/1444490810/photo/confident-businesswoman-in-modern-office.jpg?s=612x612&w=0&k=20&c=9eRJr0051v497YAvCffJLxFUcBeHC5s5Pe3klt2bUQQ=",
    designation: "FINANCE HEAD",
    empName: "SARAH JONES",
    icon: <CarIcon />,
    quote: "Restoring cars to their former glory, one panel at a time.",
  },
  {
    key: 3,
    empImage:
      "https://media.istockphoto.com/id/891418990/photo/confident-businessman-posing-in-the-office.jpg?s=612x612&w=0&k=20&c=a3PcRJAN9QTIfOUJj566B_I4xx2LANZFnX90_-Oe7CI=",
    designation: "PAYROLL MANAGER",
    empName: "DAVID WILLIAMS",
    icon: <CarIcon />,
    quote: "A good car is the foundation of a smooth life.",
  },
  {
    key: 4,
    empImage:
      "https://media.istockphoto.com/id/862596588/photo/its-got-all-of-my-ceo-duties-covered.jpg?s=612x612&w=0&k=20&c=9T_aTHeL4fRQ1VA-eTN5mPe8R6IVHlsdDJU2R0Dtw8M=",
    designation: "CUSTOMIZATION SPECIALIST",
    empName: "MELISSA BROWN",
    icon: <CarIcon />,
    quote: "Make your car stand out on the road.",
  },
];

const AboutPageStatic = () => {
  return <div></div>;
};

export default AboutPageStatic;
