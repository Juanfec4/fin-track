import { FC } from "react";
import "./styles.scss";
import VerticalDivider from "../../dividers/verticalDivider";
import ThemeToggle from "../../buttons/themeToggle";
const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer__center-container">
        <div className="footer__container">
          <h5 className="footer__title">Fin Track</h5>
          <p className="footer__text">
            Fin track is a web application built for young couples that want to
            achieve their financial goals. Our goal is to provide a tool that
            will let users track, measure and customize budget plans.
          </p>
        </div>
        <VerticalDivider />
        <div className="footer__container">
          <h5 className="footer__title">About the author</h5>
          <p className="footer__text">
            Juan Felipe is a web developer with some accounting experience,
            passionate about solving real problems.
          </p>
        </div>
        <VerticalDivider />
        <div className="footer__container">
          <p className="footer__text">Swap the current theme:</p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
