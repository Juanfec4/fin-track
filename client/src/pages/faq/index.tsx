import { FC } from "react";
import "./styles.scss";

const FaqPage: FC = () => {
  return (
    <div className="faq-page">
      <h1 className="faq-page__title">Frequently asked questions</h1>
      <div className="faq-page__content">
        <div className="faq-page__layout-section--left"></div>
        <div className="faq-page__layout-section--right"></div>
      </div>
    </div>
  );
};

export default FaqPage;
