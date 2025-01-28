import "../../lib/css/FlipCard.css";

export interface TAboutItem {
  imgUlr: string;
  sortDes: string;
  sortTitle: string;
  icon: JSX.Element;
}

interface FlipCardProps {
  item: TAboutItem;
}

const FlipCard: React.FC<FlipCardProps> = ({ item }) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner ">
        {/* Front side */}
        <div className="flip-card-front 2xl:min-h-[400px]  max-h-full">
          <img
            className="object-cover h-full w-full"
            src={item.imgUlr}
            alt=""
          />
        </div>
        {/* Back side */}
        <div className="flip-card-back 2xl:min-h-[450px]  max-h-[300px] space-y-3">
          <p className="text-primary text-2xl">{item.icon}</p>
          <h3 className="font-bold">{item.sortTitle}</h3>
          <p className="font-thin text-[13px]">{item.sortDes}</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
