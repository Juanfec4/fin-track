import { FC } from "react";
import "./styles.scss";
interface PopUpCardProps {
  popUpMessage: string;
}
const PopUpCard: FC<PopUpCardProps> = ({ popUpMessage }) => {
  return (
    <div className="pop-up">
      <p className="pop-up__message">{popUpMessage}</p>
    </div>
  );
};
export default PopUpCard;
