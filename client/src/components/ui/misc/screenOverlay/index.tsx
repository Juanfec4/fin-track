import { FC, ReactNode } from "react";
import { IconX } from "@tabler/icons-react";

import "./styles.scss";
import useDisableScroll from "../../../../hooks/useDisableScroll";
interface ScreenOverlayProps {
  children: ReactNode;
  handleClose: () => void;
}
const ScreenOverlay: FC<ScreenOverlayProps> = ({ children, handleClose }) => {
  useDisableScroll();
  return (
    <div className="overlay">
      <IconX onClick={handleClose} className="overlay__close" />
      <div className="overlay__content">{children}</div>
    </div>
  );
};
export default ScreenOverlay;
