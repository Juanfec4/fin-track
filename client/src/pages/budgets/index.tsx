import { FC, useState } from "react";
import "./styles.scss";
import HeadingLink from "../../components/ui/misc/headingLink";
import BudgetForm from "../../components/ui/forms/budgetForm";
import ScreenOverlay from "../../components/ui/misc/screenOverlay";

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
      <div className="budget-page__top-section">TOP SECTION</div>
      <div className="budget-page__content-section">BUDGET</div>
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
