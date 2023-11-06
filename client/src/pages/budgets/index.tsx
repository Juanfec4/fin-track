import { FC } from "react";
import "./styles.scss";
import HeadingLink from "../../components/ui/misc/headingLink";

const BudgetsPage: FC = () => {
  return (
    <div className="budget-page">
      <div className="budget-page__title-section">
        <HeadingLink
          tag="h2"
          titleText="Budgets"
          linkText="new"
          target="/web-app/budgets/new"
        />
      </div>
      <div className="budget-page__top-section">TOP SECTIONL</div>
      <div className="budget-page__content-section">BUDGET</div>
      <div className="budget-page__content-section">TRANSACTIONS</div>
    </div>
  );
};

export default BudgetsPage;
