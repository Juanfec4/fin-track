import { FC, useEffect } from "react";
import "./styles.scss";
interface PopUpCardProps {
  popUpMessage: string;
  handleClearMessage: () => void;
}
const PopUpCard: FC<PopUpCardProps> = ({
  popUpMessage,
  handleClearMessage,
}) => {
  useEffect(() => {
    const timeout = setTimeout(handleClearMessage, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="pop-up">
      <p className="pop-up__message">{popUpMessage}</p>
    </div>
  );
};
export default PopUpCard;
