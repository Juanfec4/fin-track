import { FC, ReactNode, useState } from "react";
import "./styles.scss";

interface IconButtonProps {
  icon: ReactNode;
  handleClick: () => void;
  tooltipText: string | undefined;
}
const IconButton: FC<IconButtonProps> = ({
  icon,
  handleClick,
  tooltipText,
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  return (
    <div
      className="icon-button"
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      <button onClick={handleClick} className="icon-button__button">
        {icon}
      </button>
      {isTooltipVisible ? (
        <div className="icon-button__tooltip">{tooltipText}</div>
      ) : null}
    </div>
  );
};
export default IconButton;
