import { FC, useEffect, useState } from "react";
import "./styles.scss";
import HeadingLink from "../../components/ui/misc/headingLink";
import CreateBudgetForm from "../../components/ui/forms/createBudgetForm";
import ScreenOverlay from "../../components/ui/misc/screenOverlay";
import BudgetsGallery from "../../components/ui/galleries/budgetsGallery/index";
import { useAppSelector } from "../../redux/store";
import { getBudgetById } from "../../services/apiService";
import BudgetSummaryCard from "../../components/ui/cards/budgetSummary";

type ActiveBudget = {
  budget_name: string;
  id: number;
  members: any[];
  owner_id: number;
  uuid: string;
};

const initialState: ActiveBudget = {
  budget_name: "",
  id: 0,
  members: [],
  owner_id: 999,
  uuid: "",
};

const BudgetsPage: FC = () => {
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const activeBudgetId = useAppSelector((state) => state.budget.activeId);
  const budgets = useAppSelector((state) => state.budget.budgets);
  const userToken = useAppSelector(
    (state) => state.user.loginInformation.accessToken
  );
  const [activeBudget, setActiveBudget] = useState<ActiveBudget>(initialState);

  useEffect(() => {
    if (activeBudgetId) {
      getBudgetById(userToken, activeBudgetId)
        .then((response) => {
          setActiveBudget(response.data);
        })
        .catch((error) => {
          console.log(error);
          setActiveBudget(initialState);
        });
    }
  }, [activeBudgetId, budgets]);
  return (
    <div className="budget-page">
      <div className="budget-page__title-section">
        <HeadingLink
          tag="h2"
          titleText="Budgets"
          linkText="new"
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
        <h4 className="budget-page__section-title">
          Budget: {activeBudget.budget_name} (#{activeBudget.uuid})
        </h4>
        <BudgetSummaryCard />
      </div>
      <div className="budget-page__content-section">
        <HeadingLink
          tag="h2"
          titleText="Transactions"
          linkText="new"
          handleClick={() => ""}
        />
      </div>
      {showBudgetForm ? (
        <ScreenOverlay
          children={
            <CreateBudgetForm handleClose={() => setShowBudgetForm(false)} />
          }
          handleClose={() => setShowBudgetForm(false)}
        />
      ) : null}
    </div>
  );
};

export default BudgetsPage;
