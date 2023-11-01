import { FC, MouseEvent } from "react";

import "./styles.scss";

interface PrimaryButtonProps {
  text: string;
  handleClick: (e: MouseEvent<HTMLElement>) => void;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick} className="button--primary">
      {text}
    </button>
  );
};

export default PrimaryButton;
