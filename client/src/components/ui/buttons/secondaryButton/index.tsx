import { FC, MouseEvent } from "react";

import "./styles.scss";

interface SecondaryButtonProps {
  text: string;
  handleClick: (e: MouseEvent<HTMLElement>) => void;
}

const SecondaryButton: FC<SecondaryButtonProps> = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick} className="button--secondary">
      {text}
    </button>
  );
};

export default SecondaryButton;
