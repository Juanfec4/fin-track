import { FC } from "react";
import { Category } from "../../../../redux/features/categorySlice";
import HeadingLink from "../headingLink";
import CategoryCard from "../../cards/categoryCard";
import "./styles.scss";

interface CategoryGroupProps {
  categories: Category[];
  type: string;
  title: string;
  handleNew: (type: string) => void;
}
const CategoryGroup: FC<CategoryGroupProps> = ({
  categories,
  type,
  title,
  handleNew,
}) => {
  const getTotal = (categories: Category[]) => {
    let sum = 0;
    for (let category of categories) {
      if (category.type === type) {
        sum += category.allocated_amount;
      }
    }
    return sum;
  };
  return (
    <div className="category-group">
      <HeadingLink
        tag="h4"
        titleText={title}
        linkText="add"
        handleClick={() => handleNew(type)}
      />
      <div className="category-group__content">
        <div className="category-group__content-title">
          <h6 className="category-group__header">Category name</h6>
          <h6 className="category-card__header">Monthly amount</h6>
        </div>
        {categories.map((category) => {
          return category.type === type ? (
            <CategoryCard key={category.id} category={category} />
          ) : null;
        })}
      </div>
      <div className="category-group__total">
        <p className="category-group__total-source">
          Total {title.toLowerCase()}:
        </p>
        <p className="category-group__total-source">
          ${getTotal(categories).toLocaleString()}
        </p>
      </div>
    </div>
  );
};
export default CategoryGroup;
