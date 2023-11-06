import { FC, FormEvent, useState } from "react";
import Input, { InputType } from "../../inputs/textInput";
import PrimaryButton from "../../buttons/primaryButton";
import "./styles.scss";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { createBudget } from "../../../../services/apiService";
import PopUpCard from "../../cards/popUpCard";
import { fetchBudgets } from "../../../../redux/features/budgetSlice";

interface BudgetFormProps {
  handleClose: () => void;
}

const BudgetForm: FC<BudgetFormProps> = ({ handleClose }) => {
  const [budgetName, setBudgetName] = useState("");
  const [status, setStatus] = useState("");
  const userToken = useAppSelector(
    (state) => state.user.loginInformation.accessToken
  );
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createBudget({ budgetName }, userToken)
      .then((response) => {
        setStatus(response.statusText);
        dispatch(fetchBudgets(userToken));
        setTimeout(() => handleClose(), 1000);
      })
      .catch((error) => {
        setStatus(error.response.data);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="new-budget-form">
        <h1 className="new-budget-form__title">New Budget</h1>
        <div className="new-budget-form__content">
          <Input
            fieldName="budget-name"
            placeholder="name"
            label="Budget name"
            inputType={InputType.Text}
            handleChange={(e) => setBudgetName(e.target.value)}
            value={budgetName}
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
export default BudgetForm;
