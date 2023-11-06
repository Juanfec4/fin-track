import { FC, useState } from "react";
import "./styles.scss";
import HeadingLink from "../../components/ui/misc/headingLink";
import BudgetForm from "../../components/ui/forms/budgetForm";
import ScreenOverlay from "../../components/ui/misc/screenOverlay";
import BudgetsGallery from "../../components/ui/galleries/budgetsGallery/index";

const BudgetsPage: FC = () => {
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  return (
    <div className="budget-page">
      <div className="budget-page__title-section">
        <HeadingLink
          tag="h2"
          titleText="Budgets"
          linkText="create new"
          handleClick={() => {
            setShowBudgetForm(true);
          }}
        />
      </div>
      <div className="budget-page__top-section">
        <h4 className="budget-page__section-title">My budgets</h4>
        <BudgetsGallery />
      </div>
      <div className="budget-page__content-section">
        <h4 className="budget-page__section-title">Budget My s as (#SDASAS)</h4>
      </div>
      <div className="budget-page__content-section">TRANSACTIONS</div>
      {showBudgetForm ? (
        <ScreenOverlay
          children={<BudgetForm handleClose={() => setShowBudgetForm(false)} />}
          handleClose={() => setShowBudgetForm(false)}
        />
      ) : null}
    </div>
  );
};

export default BudgetsPage;
