import { FC, useEffect, useState } from "react";
import Input, { InputType } from "../../inputs/textInput";
import PrimaryButton from "../../buttons/primaryButton";
import "./styles.scss";

interface EditCategoryFormProps {
  handleEdit: (categoryName: string, amount: number) => void;
  oldCategoryName: string;
  oldAmount: number;
}

const EditCategoryForm: FC<EditCategoryFormProps> = ({
  handleEdit,
  oldCategoryName,
  oldAmount,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [allocatedAmount, setAllocatedAmount] = useState(0);

  useEffect(() => {
    setCategoryName(oldCategoryName);
    setAllocatedAmount(oldAmount);
  }, []);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEdit(categoryName, Number(allocatedAmount));
        }}
        className="edit-category-form"
      >
        <h1 className="edit-category-form__title">Edit Category</h1>
        <div className="edit-category-form__content">
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
            handleChange={(e) => setAllocatedAmount(Number(e.target.value))}
            value={String(allocatedAmount)}
          />
          <PrimaryButton text="Save" handleClick={() => ""} />
        </div>
      </form>
    </>
  );
};
export default EditCategoryForm;
