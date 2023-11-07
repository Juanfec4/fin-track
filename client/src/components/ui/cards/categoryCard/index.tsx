import { FC } from "react";
import { Category } from "../../../../redux/features/categorySlice";
import "./styles.scss";
import IconButton from "../../buttons/iconButton";
import { IconTrash } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
interface CategoryCardProps {
  category: Category;
}
const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  return (
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
          handleClick={() => ""}
        />
        <IconButton
          icon={<IconTrash />}
          tooltipText="Delete"
          handleClick={() => ""}
        />
      </div>
    </div>
  );
};
export default CategoryCard;
