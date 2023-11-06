import { FC, MouseEvent } from "react";

import "./styles.scss";

interface AccentButtonProps {
  text: string;
  handleClick: (e: MouseEvent<HTMLElement>) => void;
}

const AccentButton: FC<AccentButtonProps> = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick} className="button--accent">
      {text}
    </button>
  );
};

export default AccentButton;
