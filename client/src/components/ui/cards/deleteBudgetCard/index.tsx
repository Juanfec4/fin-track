import { FC } from "react";
import PrimaryButton from "../../buttons/primaryButton";
import AccentButton from "../../buttons/accentButton";
import "./styles.scss";

interface DeleteBudgetCardProps {
  budgetName: string;
  handleDelete: () => void;
  handleCancel: () => void;
}

const DeleteBudgetCard: FC<DeleteBudgetCardProps> = ({
  handleDelete,
  handleCancel,
  budgetName,
}) => {
  return (
    <div className="delete-budget-card">
      <h2 className="delete-budget-card__title">Confirm deletion</h2>
      <p className="delete-budget-card__text">
        Are you sure you want to delete budget "{budgetName}"?
      </p>
      <div className="delete-budget-card__actions">
        <PrimaryButton handleClick={handleDelete} text="Delete" />
        <AccentButton handleClick={handleCancel} text="Cancel" />
      </div>
    </div>
  );
};

export default DeleteBudgetCard;
