import { FC } from "react";
import PrimaryButton from "../../buttons/primaryButton";
import AccentButton from "../../buttons/accentButton";
import "./styles.scss";

interface DeleteCategoryCardProps {
  categoryName: string;
  categoryType: string;
  handleDelete: () => void;
  handleCancel: () => void;
}

const DeleteCategoryCard: FC<DeleteCategoryCardProps> = ({
  handleDelete,
  handleCancel,
  categoryName,
  categoryType,
}) => {
  return (
    <div className="delete-category-card">
      <h2 className="delete-category-card__title">Confirm deletion</h2>
      <p className="delete-category-card__text">
        Are you sure you want to delete {categoryType} category "{categoryName}
        "?
      </p>
      <div className="delete-category-card__actions">
        <PrimaryButton handleClick={handleDelete} text="Delete" />
        <AccentButton handleClick={handleCancel} text="Cancel" />
      </div>
    </div>
  );
};

export default DeleteCategoryCard;
