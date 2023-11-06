import { FC, FormEvent, useEffect, useState } from "react";
import Input, { InputType } from "../../inputs/textInput";
import PrimaryButton from "../../buttons/primaryButton";
import "./styles.scss";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { createBudget, getBudgetById } from "../../../../services/apiService";
import PopUpCard from "../../cards/popUpCard";
import { fetchBudgets } from "../../../../redux/features/budgetSlice";

interface EditBudgetFormProps {
  handleClose: () => void;
  budgetId: number;
  originalBudgetName: string;
}

const EditBudgetForm: FC<EditBudgetFormProps> = ({
  handleClose,
  budgetId,
  originalBudgetName,
}) => {
  const [budgetName, setBudgetName] = useState("");
  const [status, setStatus] = useState("");
  const userToken = useAppSelector(
    (state) => state.user.loginInformation.accessToken
  );
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //TODO:
    //Post new budget name
    //Re-fetch
    setTimeout(() => handleClose(), 1000);
  };

  useEffect(() => {
    setBudgetName(originalBudgetName);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="new-budget-form">
        <h1 className="new-budget-form__title">Edit Budget</h1>
        <div className="new-budget-form__content">
          <Input
            fieldName="budget-name"
            placeholder="name"
            label="New budget name"
            inputType={InputType.Text}
            handleChange={(e) => setBudgetName(e.target.value)}
            value={budgetName}
          />
          <PrimaryButton text="Save" handleClick={() => ""} />
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
export default EditBudgetForm;
