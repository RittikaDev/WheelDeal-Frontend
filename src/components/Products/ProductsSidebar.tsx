import { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface ProductsSidebarProps {
  filters: any;
  handleFilterChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleFilterSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  brands: string[];
  model: string[];
  category: string[];
  handleCheckboxChange: (brands: string) => void;
  handleModelChange: (model: string) => void;
  handleCatChange: (category: string) => void;
  selectedbrands: string[];
  selectedmodels: string[];
  selectedcat: string[];
  resetFilters: () => void;
  handleRadioChange: (value: string) => void;
}

const ProductsSidebar: React.FC<ProductsSidebarProps> = ({
  filters,
  handleFilterChange,
  handleFilterSubmit,
  brands,
  model,
  category,
  handleCheckboxChange,
  handleModelChange,
  handleCatChange,
  selectedbrands,
  selectedmodels,
  selectedcat,
  resetFilters,
  handleRadioChange,
}) => {
  return (
    <div className="w-full md:max-w-xs p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <form onSubmit={handleFilterSubmit}>
        {/* Search Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Search
          </h3>
          <Input
            name="search"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            type="text"
            placeholder="Search..."
            onChange={handleFilterChange}
          />
        </div>

        {/* Filters Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Filters
          </h3>
          <RadioGroup
            name="stockStatus"
            defaultValue={filters.stockStatus}
            className="space-y-2"
            onChange={(event: any) => handleRadioChange(event.target.value)}
          >
            <div className="flex items-center">
              <RadioGroupItem
                value="available"
                id="available"
                onChange={() => handleRadioChange("available")}
              />
              <Label
                htmlFor="available"
                className="ml-2 text-sm text-gray-600 dark:text-gray-300"
              >
                In Stock
              </Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem
                value="unavailable"
                id="unavailable"
                onChange={() => handleRadioChange("unavailable")}
              />
              <Label
                htmlFor="unavailable"
                className="ml-2 text-sm text-gray-600 dark:text-gray-300"
              >
                Out of Stock
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Brands Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Brands
          </h3>
          <ul className="space-y-2">
            {brands.map((b, i) => (
              <li key={i} className="flex items-center">
                <input
                  type="checkbox"
                  id={b}
                  value={b}
                  checked={selectedbrands.includes(b)}
                  onChange={() => handleCheckboxChange(b)}
                  className="h-4 w-4 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary"
                />
                <Label
                  htmlFor={b}
                  className="ml-2 text-sm text-gray-600 dark:text-gray-300"
                >
                  {b}
                </Label>
              </li>
            ))}
          </ul>
        </div>

        {/* Model Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Model
          </h3>
          <ul className="space-y-2">
            {model.map((m, i) => (
              <li key={i} className="flex items-center">
                <input
                  type="checkbox"
                  id={m}
                  value={m}
                  checked={selectedmodels.includes(m)}
                  onChange={() => handleModelChange(m)}
                  className="h-4 w-4 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary"
                />
                <Label
                  htmlFor={m}
                  className="ml-2 text-sm text-gray-600 dark:text-gray-300"
                >
                  {m}
                </Label>
              </li>
            ))}
          </ul>
        </div>

        {/* Category Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Category
          </h3>
          <ul className="space-y-2">
            {category.map((c, i) => (
              <li key={i} className="flex items-center">
                <input
                  type="checkbox"
                  id={c}
                  value={c}
                  checked={selectedcat.includes(c)}
                  onChange={() => handleCatChange(c)}
                  className="h-4 w-4 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary"
                />
                <Label
                  htmlFor={c}
                  className="ml-2 text-sm text-gray-600 dark:text-gray-300"
                >
                  {c}
                </Label>
              </li>
            ))}
          </ul>
        </div>

        {/* Clear Filters */}
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={resetFilters}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md"
          >
            Clear Filters
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductsSidebar;
