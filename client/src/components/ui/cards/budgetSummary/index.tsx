import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { fetchCategories } from "../../../../redux/features/categorySlice";
import CategoryGroup from "../../misc/categoryGroup";
import ScreenOverlay from "../../misc/screenOverlay";
import CreateCategoryForm from "../../forms/createCategoryForm";
import "./styles.scss";

const BudgetSummaryCard: FC = () => {
  const userToken = useAppSelector(
    (state) => state.user.loginInformation.accessToken
  );
  const budgetId = useAppSelector((state) => state.budget.activeId);
  const categories = useAppSelector((state) => state.category.categories);
  const [categoryType, setCategoryType] = useState("");
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (budgetId) {
      dispatch(fetchCategories({ accessToken: userToken, budgetId }));
    }
  }, [budgetId]);

  const handleNew = (type: string) => {
    setCategoryType(type);
    setShowNewCategoryForm(true);
  };

  return (
    <>
      <div className="budget-summary">
        <CategoryGroup
          type="income"
          title="Income"
          categories={categories}
          handleNew={handleNew}
        />

        <CategoryGroup
          type="expense"
          title="Expenses"
          categories={categories}
          handleNew={handleNew}
        />

        <CategoryGroup
          type="saving"
          title="Savings"
          categories={categories}
          handleNew={handleNew}
        />

        <CategoryGroup
          type="investment"
          title="Investments"
          categories={categories}
          handleNew={handleNew}
        />
      </div>
      {showNewCategoryForm ? (
        <ScreenOverlay
          children={
            <CreateCategoryForm
              type={categoryType}
              handleClose={() => setShowNewCategoryForm(false)}
            />
          }
          handleClose={() => setShowNewCategoryForm(false)}
        />
      ) : null}
    </>
  );
};
export default BudgetSummaryCard;
