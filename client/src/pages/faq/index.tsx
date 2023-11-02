import { FC } from "react";
import "./styles.scss";
import ScrollMenu from "../../components/ui/menus/scrollMenu";

const FaqPage: FC = () => {
  return (
    <div className="faq-page">
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
          <h1 className="faq-section__title">FAQ</h1>
          <div className="faq-section" id="pos-1">
            <h4 className="faq-section__title">Getting started</h4>
            <p className="faq-section__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              consectetur eius, delectus odio, expedita repellendus qui iusto
              obcaecati libero at perferendis cupiditate enim placeat laudantium
              mollitia fugiat quis! Id, perferendis.
            </p>
          </div>
          <div className="faq-section" id="pos-2">
            <h4 className="faq-section__title">Making a budget</h4>
            <p className="faq-section__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              consectetur eius, delectus odio, expedita repellendus qui iusto
              obcaecati libero at perferendis cupiditate enim placeat laudantium
              mollitia fugiat quis! Id, perferendis.
            </p>
          </div>
          <div className="faq-section" id="pos-3">
            <h4 className="faq-section__title">How to use the app</h4>
            <p className="faq-section__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              consectetur eius, delectus odio, expedita repellendus qui iusto
              obcaecati libero at perferendis cupiditate enim placeat laudantium
              mollitia fugiat quis! Id, perferendis.
            </p>
          </div>
          <div className="faq-section" id="pos-4">
            <h4 className="faq-section__title">Adding users</h4>
            <p className="faq-section__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              consectetur eius, delectus odio, expedita repellendus qui iusto
              obcaecati libero at perferendis cupiditate enim placeat laudantium
              mollitia fugiat quis! Id, perferendis.
            </p>
          </div>
          <div className="faq-section" id="pos-5">
            <h4 className="faq-section__title">Categories</h4>
            <p className="faq-section__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              consectetur eius, delectus odio, expedita repellendus qui iusto
              obcaecati libero at perferendis cupiditate enim placeat laudantium
              mollitia fugiat quis! Id, perferendis.
            </p>
          </div>
          <div className="faq-section" id="pos-6">
            <h4 className="faq-section__title">Transactions</h4>
            <p className="faq-section__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              consectetur eius, delectus odio, expedita repellendus qui iusto
              obcaecati libero at perferendis cupiditate enim placeat laudantium
              mollitia fugiat quis! Id, perferendis.
            </p>
          </div>
          <div className="faq-section" id="pos-7">
            <h4 className="faq-section__title">Reports</h4>
            <p className="faq-section__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              consectetur eius, delectus odio, expedita repellendus qui iusto
              obcaecati libero at perferendis cupiditate enim placeat laudantium
              mollitia fugiat quis! Id, perferendis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
