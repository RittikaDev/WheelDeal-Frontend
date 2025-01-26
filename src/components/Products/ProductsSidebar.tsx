import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TFilterValues } from "@/pages/ProductsPage";

interface ProductsSidebarProps {
	filters: TFilterValues;
	handleFilterChange: (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void;
	handleFilterSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	categories: string[];
	handleCheckboxChange: (caregory: string) => void;
	selectedCategories: string[];
	resetFilters: () => void;
}

const ProductsSidebar: React.FC<ProductsSidebarProps> = ({
	filters,
	handleFilterChange,
	handleFilterSubmit,
	categories,
	handleCheckboxChange,
	selectedCategories,
	resetFilters,
}) => {
	const [openMenus, setOpenMenus] = useState(false);

	return (
		<div className="md:max-w-72 w-full ">
			<form onSubmit={handleFilterSubmit}>
				<div className="shadow-xl p-1 mb-5 rounded-lg">
					<p className="text-2xl hidden md:block py-1 p-1 bg-primary/20 text-white rounded-md font-medium">
						Search:
					</p>
					<p className="text-2xl md:hidden block py-1 p-1 bg-primary/20 text-white bg-opacity-50 font-medium">
						Filters:
					</p>

					<div className="w-full md:my-4">
						<Input
							name="searchTerm"
							className="w-full mt-4"
							type="text"
							placeholder="Search..."
							onChange={handleFilterChange}
						/>
					</div>

					{/* <div>
            <p className="  py-3 p-1font-medium">Price Range</p>
        <Slider defaultValue={[33]} max={100} step={1} />

<div className="flex gap-4">
<Input
              name="minPrice"
              className="w-full mt-8"
              type="text"
              placeholder="0"
            />
             <Input
              name="maxPrice"
              className="w-full mt-8"
              type="text"
              placeholder="10000"
            />
</div>
        </div> */}
				</div>

				{/* filter  */}
				<div className="shadow-xl hidden p-1 mb-5 rounded-lg">
					<p className="text-2xl hidden md:block  py-1 p-1 bg-primary/20 text-white font-medium">
						Filter:
					</p>
					{/* onValueChange={handleFilterChange} */}
					<div className="w-full my-8">
						<RadioGroup name="stockStatus" defaultValue={filters.stockStatus}>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="inStock" id="inStock" />
								<Label htmlFor="inStock">In Stock</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="outOfStock" id="outOfStock" />
								<Label htmlFor="outOfStock">Out of Stock</Label>
							</div>
						</RadioGroup>
					</div>
				</div>
				{/* Category  */}
				<div className="shadow-xl p-1 md:mb-5 rounded-lg">
					<p className="text-2xl hidden md:block py-1 p-1 bg-primary/20 text-white font-medium">
						Category:
					</p>

					<div className="w-full md:my-4">
						<ul className="space-y-3">
							<li className="">
								<div
									onClick={() => setOpenMenus(!openMenus)}
									className="flex justify-between items-center pr-4"
								>
									<p>Equipments</p>
									<p className="text-xl">{openMenus ? "-" : "+"}</p>
								</div>
								{openMenus && (
									<div className="w-full my-4">
										<RadioGroup name="categoryFilters">
											{categories?.map((category, i) => (
												<div key={i} className="flex items-center space-x-2">
													<input
														type="checkbox"
														id={category}
														value={category}
														checked={selectedCategories.includes(category)}
														onClick={() => handleCheckboxChange(category)}
													/>
													<Label htmlFor={category}>{category}</Label>
												</div>
											))}
										</RadioGroup>
									</div>
								)}
							</li>
						</ul>
					</div>
				</div>
				{/* filter  */}
				<div className="shadow-xl p-1 mb-5 flex justify-end rounded-lg">
					{/* <Button type="submit">Apply Filter:</Button> */}
					<Button onClick={resetFilters}>Clear Filter:</Button>
				</div>
			</form>
		</div>
	);
};

export default ProductsSidebar;
