import { FC } from "react";
import "./styles.scss";
import ScrollMenu from "../../components/ui/menus/scrollMenu";

const FaqPage: FC = () => {
  return (
    <div className="faq-page">
      <h1 className="faq-page__title">Frequently asked questions</h1>
      <div className="faq-page__content">
        <div className="faq-page__layout-section--left">
          <ScrollMenu
            title="FAQ Contents"
            links={[
              { target: "pos-1", text: "Getting started" },
              { target: "pos-2", text: "Making a budget" },
              { target: "pos-3", text: "How to use the app" },
              { target: "pos-4", text: "Adding users" },
              { target: "pos-5", text: "Categories" },
              { target: "pos-6", text: "Transactions" },
              { target: "pos-7", text: "Reports" },
            ]}
          />
        </div>
        <div className="faq-page__layout-section--right">
          <div className="faq-section" id="pos-1">
            <h4>Getting started</h4>
          </div>
          <div className="faq-section" id="pos-2">
            <h4>Making a budget</h4>
          </div>
          <div className="faq-section" id="pos-3">
            <h4>How to use the app</h4>
          </div>
          <div className="faq-section" id="pos-4">
            <h4>Adding users</h4>
          </div>
          <div className="faq-section" id="pos-5">
            <h4>Categories</h4>
          </div>
          <div className="faq-section" id="pos-6">
            <h4>Transactions</h4>
          </div>
          <div className="faq-section" id="pos-6">
            <h4>Reports</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
