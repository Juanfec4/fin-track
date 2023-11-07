import { FC, useState } from "react";
import Input, { InputType } from "../../inputs/textInput";
import PrimaryButton from "../../buttons/primaryButton";
import "./styles.scss";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import PopUpCard from "../../cards/popUpCard";
import { createCategory } from "../../../../services/apiService";
import { fetchCategories } from "../../../../redux/features/categorySlice";

interface CreateBudgetFormProps {
  handleClose: () => void;
  type: string;
}

const CreateCategoryForm: FC<CreateBudgetFormProps> = ({
  handleClose,
  type,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [allocatedAmount, setAllocatedAmount] = useState("");
  const [status, setStatus] = useState("");
  const userToken = useAppSelector(
    (state) => state.user.loginInformation.accessToken
  );
  const budgetId = useAppSelector((state) => state.budget.activeId);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (budgetId) {
      createCategory(userToken, {
        type,
        categoryName,
        allocatedAmount: Number(allocatedAmount),
        budgetId,
      })
        .then((response) => {
          setStatus(response.statusText);
          dispatch(fetchCategories({ accessToken: userToken, budgetId }));
          setTimeout(() => handleClose(), 1000);
        })
        .catch((error) => {
          setStatus(error.response.data);
        });
    }
    handleClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="new-category-form">
        <h1 className="new-category-form__title">New Category</h1>
        <div className="new-category-form__content">
          <Input
            fieldName="category-name"
            placeholder="category name"
            label="Category name"
            inputType={InputType.Text}
            handleChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
          />
          <Input
            fieldName="category-amount"
            placeholder="allocated amount"
            label="Allocated amount"
            inputType={InputType.Text}
            handleChange={(e) => setAllocatedAmount(e.target.value)}
            value={allocatedAmount}
          />
          <PrimaryButton text="Create" handleClick={() => ""} />
        </div>
      </form>
      {status ? (
        <PopUpCard
          popUpMessage={status}
          handleClearMessage={() => setStatus("")}
        />
      ) : null}
    </>
  );
};
export default CreateCategoryForm;
