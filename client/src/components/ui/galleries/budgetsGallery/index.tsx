import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { Budget, fetchBudgets } from "../../../../redux/features/budgetSlice";
import BudgetCard from "../../cards/budgetCard";
import "./styles.scss";

const BudgetsGallery: FC = () => {
  const userToken = useAppSelector(
    (state) => state.user.loginInformation.accessToken
  );
  const budgets = useAppSelector((state) => state.budget.budgets);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBudgets(userToken));
  }, []);

  return (
    <div className="budgets-gallery">
      <div className="budgets-gallery__content">
        {budgets
          ? budgets.map((budget: Budget) => {
              return <BudgetCard key={budget.id} budget={budget} />;
            })
          : null}
      </div>
    </div>
  );
};

export default BudgetsGallery;
