import { FC, useState } from "react";
import {
  Category,
  fetchCategories,
} from "../../../../redux/features/categorySlice";
import "./styles.scss";
import IconButton from "../../buttons/iconButton";
import { IconTrash } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
import ScreenOverlay from "../../misc/screenOverlay";
import DeleteCategoryCard from "../deleteCategoryCard";
import { deleteCategory, editCategory } from "../../../../services/apiService";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import PopUpCard from "../popUpCard";
import EditCategoryForm from "../../forms/editCategoryForm";
interface CategoryCardProps {
  category: Category;
}
const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditCategoryForm, setShowEditCategoryForm] = useState(false);
  const [status, setStatus] = useState("");
  const userToken = useAppSelector(
    (state) => state.user.loginInformation.accessToken
  );
  const budgetId = useAppSelector((state) => state.budget.activeId);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (budgetId) {
      deleteCategory(userToken, budgetId, category.id)
        .then((response) => {
          setStatus(response.data);
        })
        .catch((error) => {
          setStatus(error.response.data);
        })
        .finally(() =>
          dispatch(fetchCategories({ accessToken: userToken, budgetId }))
        );
    }
    setShowDeleteConfirmation(false);
  };

  const handleEdit = (categoryName: string, allocatedAmount?: number) => {
    if (budgetId) {
      editCategory(userToken, category.id, {
        budgetId,
        categoryName,
        allocatedAmount,
      })
        .then((response) => {
          setStatus(response.statusText);
        })
        .catch((error) => {
          setStatus(error.response.data);
        })
        .finally(() => {
          dispatch(fetchCategories({ accessToken: userToken, budgetId }));
        });
    }
    setShowEditCategoryForm(false);
  };

  return (
    <>
      <div className="category-card">
        <div className="category-card__text-container">
          <p className="category-card__name">{category.category_name}</p>
          <p className="category-card__amount">
            {category.allocated_amount.toLocaleString()}
          </p>
        </div>
        <div className="category-card__action-container">
          <IconButton
            icon={<IconPencil />}
            tooltipText="Edit"
            handleClick={() => setShowEditCategoryForm(true)}
          />
          <IconButton
            icon={<IconTrash />}
            tooltipText="Delete"
            handleClick={() => setShowDeleteConfirmation(true)}
          />
        </div>
      </div>
      {showDeleteConfirmation ? (
        <ScreenOverlay
          handleClose={() => setShowDeleteConfirmation(false)}
          children={
            <DeleteCategoryCard
              handleDelete={handleDelete}
              handleCancel={() => setShowDeleteConfirmation(false)}
              categoryType={category.type}
              categoryName={category.category_name}
            />
          }
        />
      ) : null}
      {showEditCategoryForm ? (
        <ScreenOverlay
          handleClose={() => setShowEditCategoryForm(false)}
          children={
            <EditCategoryForm
              handleEdit={handleEdit}
              oldAmount={category.allocated_amount}
              oldCategoryName={category.category_name}
            />
          }
        />
      ) : null}
      {status ? (
        <PopUpCard
          popUpMessage={status}
          handleClearMessage={() => setStatus("")}
        />
      ) : null}
    </>
  );
};
export default CategoryCard;
