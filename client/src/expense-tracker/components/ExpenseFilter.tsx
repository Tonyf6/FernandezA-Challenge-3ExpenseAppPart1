import categories from "../categories";

interface FilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ selectedCategory, onSelectCategory }: FilterProps) => {
  return (
    <select
      className="form-select"
      value={selectedCategory}
      onChange={(e) => onSelectCategory(e.target.value)}
    >
      <option value="All">All</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default ExpenseFilter;
