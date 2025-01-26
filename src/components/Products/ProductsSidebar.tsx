import { ChangeEvent, useState } from "react";
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
  handleCheckboxChange: (category: string) => void;
  selectedbrands: string[];
  resetFilters: () => void;
}

const ProductsSidebar: React.FC<ProductsSidebarProps> = ({
  filters,
  handleFilterChange,
  handleFilterSubmit,
  brands,
  handleCheckboxChange,
  selectedbrands,
  resetFilters,
}) => {
  const [openMenus, setOpenMenus] = useState(false);

  return (
    <div className="w-full md:max-w-xs p-4 bg-gray-100 rounded-lg shadow-md">
      <form onSubmit={handleFilterSubmit}>
        {/* Search Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Search</h3>
          <Input
            name="search"
            className="w-full border border-gray-300 rounded-md p-2"
            type="text"
            placeholder="Search..."
            onChange={handleFilterChange}
          />
        </div>

        {/* Filters Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Filters</h3>
          <RadioGroup
            name="stockStatus"
            defaultValue={filters.stockStatus}
            className="space-y-2"
          >
            <div className="flex items-center">
              <RadioGroupItem value="inStock" id="inStock" />
              <Label htmlFor="inStock" className="ml-2 text-sm text-gray-600">
                In Stock
              </Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem value="outOfStock" id="outOfStock" />
              <Label
                htmlFor="outOfStock"
                className="ml-2 text-sm text-gray-600"
              >
                Out of Stock
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* brands Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">brands</h3>
          <ul className="space-y-2">
            {brands.map((category, i) => (
              <li key={i} className="flex items-center">
                <input
                  type="checkbox"
                  id={category}
                  value={category}
                  checked={selectedbrands.includes(category)}
                  onChange={() => handleCheckboxChange(category)}
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <Label
                  htmlFor={category}
                  className="ml-2 text-sm text-gray-600"
                >
                  {category}
                </Label>
              </li>
            ))}
          </ul>
        </div>

        {/* Expandable Section (Example) */}
        <div className="mb-6">
          <h3
            className="text-lg font-semibold text-gray-700 mb-2 flex justify-between items-center cursor-pointer"
            onClick={() => setOpenMenus(!openMenus)}
          >
            Equipments <span>{openMenus ? "-" : "+"}</span>
          </h3>
          {openMenus && (
            <div className="pl-4">
              {brands.map((category, i) => (
                <div key={i} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`equip-${category}`}
                    value={category}
                    checked={selectedbrands.includes(category)}
                    onChange={() => handleCheckboxChange(category)}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <Label
                    htmlFor={`equip-${category}`}
                    className="ml-2 text-sm text-gray-600"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          )}
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
