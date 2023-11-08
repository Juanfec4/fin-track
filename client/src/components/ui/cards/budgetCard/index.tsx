import { FC, useState } from "react";
import "./styles.scss";
import {
  Budget,
  fetchBudgets,
  setActiveBudgetId,
} from "../../../../redux/features/budgetSlice";
import IconButton from "../../buttons/iconButton";
import { IconStarFilled } from "@tabler/icons-react";
import { IconStar } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import ScreenOverlay from "../../misc/screenOverlay";
import DeleteBudgetCard from "../deleteBudgetCard";
import { deleteBudgetById } from "../../../../services/apiService";
import PopUpCard from "../popUpCard";
import EditBudgetForm from "../../forms/editBudgetForm";

interface BudgetCardProps {
  budget: Budget;
}

const BudgetCard: FC<BudgetCardProps> = ({ budget }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditBudgetForm, setShowEditBudgetForm] = useState(false);
  const [status, setStatus] = useState("");
  const userToken = useAppSelector(
    (state) => state.user.loginInformation.accessToken
  );
  const activeId = useAppSelector((state) => state.budget.activeId);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    deleteBudgetById(userToken, budget.id)
      .then((response) => {
        setStatus(response.data);
      })
      .catch((error) => {
        setStatus(error.response.data);
      })
      .finally(() => dispatch(fetchBudgets(userToken)));
    setShowDeleteConfirmation(false);
  };
  return (
    <div className="budget-card">
      <div className="budget-card__head-container">
        <h5 className="budget-card__title">{budget.budget_name}</h5>
        <p className="budget-card__code">#{budget.uuid}</p>
      </div>
      <div className="budget-card__actions">
        <IconButton
          tooltipText="Make active"
          icon={budget.id === activeId ? <IconStarFilled /> : <IconStar />}
          handleClick={() => dispatch(setActiveBudgetId(budget.id))}
        />
        <IconButton
          tooltipText="Edit"
          icon={<IconPencil />}
          handleClick={() => setShowEditBudgetForm(true)}
        />
        <IconButton
          tooltipText="Delete"
          icon={<IconTrash />}
          handleClick={() => setShowDeleteConfirmation(true)}
        />
        {showDeleteConfirmation ? (
          <ScreenOverlay
            children={
              <DeleteBudgetCard
                budgetName={budget.budget_name}
                handleCancel={() => setShowDeleteConfirmation(false)}
                handleDelete={handleDelete}
              />
            }
            handleClose={() => setShowDeleteConfirmation(false)}
          />
        ) : null}
        {showEditBudgetForm ? (
          <ScreenOverlay
            children={
              <EditBudgetForm
                budgetId={budget.id}
                originalBudgetName={budget.budget_name}
                handleClose={() => setShowEditBudgetForm(false)}
              />
            }
            handleClose={() => setShowEditBudgetForm(false)}
          />
        ) : null}
        {status ? (
          <PopUpCard
            popUpMessage={status}
            handleClearMessage={() => setStatus("")}
          />
        ) : null}
      </div>
    </div>
  );
};
export default BudgetCard;
