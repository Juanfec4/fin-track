import { FC, MouseEvent } from "react";
import "./styles.scss";
import PrimaryButton from "../../buttons/primaryButton";

interface CallToActionCardProps {
  title: string;
  text: string;
  image: any | undefined;
  buttonText: string;
  handleClick: (e: MouseEvent<HTMLElement>) => void;
}

const CallToActionCard: FC<CallToActionCardProps> = ({
  title,
  text,
  image,
  buttonText,
  handleClick,
}) => {
  return (
    <div className="call-to-action">
      <div className="call-to-action__container">
        <img src={image} className="call-to-action__image" />
        <div className="image-placeholder call-to-action__image"></div>
      </div>
      <div className="call-to-action__container">
        <h2 className="call-to-action__title">{title}</h2>
        <p className="call-to-action__text">{text}</p>
        <PrimaryButton text={buttonText} handleClick={handleClick} />
      </div>
    </div>
  );
};

export default CallToActionCard;
