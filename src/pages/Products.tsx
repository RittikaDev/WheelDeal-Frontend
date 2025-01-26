// import PageBanner from "@/components/reusableComponents/PageBanner";
// import LoadingPage from "@/components/shared/LoadingPage";
// import NotFound from "@/components/shared/NotFound";
// import ProductsSidebar from "@/components/shared/ProductsSidebar";

import { FormEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ICar } from "../types";
import FeaturedProductCard from "../components/reusableComponents/FeaturedProductCard";
import {
  useGetAllCarsQuery,
  useGetCarBrandNamesQuery,
} from "../redux/features/cars/carApi";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "../components/ui/pagination";
import ProductsSidebar from "../components/Products/ProductsSidebar";

export interface TFilterValues {
  search: string;
  sortBy: string;
  sortOrder: string;
  limit: number;
  page: number;
  filter: string[];
}

const ProductsPage = () => {
  const { data: getBrands, isSuccess } = useGetCarBrandNamesQuery(undefined);

  const brandNames: string[] = [];
  if (isSuccess && getBrands?.data)
    getBrands.data.forEach((brands) => brandNames.push(brands.brand));

  const location = useLocation();
  const brand = location.state as string;
  console.log(brand);
  const initialFilterValues: TFilterValues = {
    search: "",
    sortBy: "asc",
    sortOrder: "",
    limit: 6,
    page: 1,
    filter: [],
  };

  const [filters, setFilters] = useState<TFilterValues>(initialFilterValues);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([
    `${brand ? brand : ""}`,
  ]);
  const { data: getResults, isLoading } = useGetAllCarsQuery(filters);

  // Product and total product count
  const products = getResults?.data;

  if (isLoading) {
    return <>{/* <LoadingPage /> */}</>;
  }

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (brand: string) => {
    setSelectedBrand((prevSelected) =>
      prevSelected.includes(brand)
        ? prevSelected.filter((item) => item !== brand)
        : [...prevSelected, brand]
    );

    setFilters((prevFilters) => ({
      ...prevFilters,
      brand: selectedBrand.includes(brand)
        ? prevFilters.brand.filter((cat) => cat !== brand)
        : [...prevFilters.brand, brand],
    }));
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // handle page change
  const handlePageChange = (page: number) => {
    setFilters((prevValues) => ({
      ...prevValues,
      page: page,
    }));
  };

  const resetFilters = () => {
    setSelectedBrand([]);
    setFilters({
      search: "",
      sortBy: "",
      sortOrder: "",
      limit: 6,
      page: 1,
      filter: [],
    });
  };

  // pagination calculate
  const totalProducts = getResults?.meta?.totalPage || 0;
  const startIndex = (filters.page - 1) * filters.limit + 1;
  const endIndex = Math.min(startIndex + filters.limit - 1, totalProducts);
  const totalPages = Math.ceil(totalProducts / filters.limit);

  const handleFilterSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const img =
    "https://dt-fitfinity.myshopify.com/cdn/shop/files/AdobeStock_320492530_Preview.jpg?v=1701422683&width=1920";

  return (
    <div className="">
      {/* <PageBanner bannerTitle={""} img={img} /> */}

      {/* product page layout  */}

      <section className="max-w-7xl mx-auto py-10 px-4 md:px-0  md:grid md:grid-cols-5 gap-4">
        {/* Search and filter */}

        <ProductsSidebar
          filters={filters}
          handleFilterSubmit={handleFilterSubmit}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleBrandChange}
          selectedbrands={selectedBrand}
          brands={brandNames}
          resetFilters={resetFilters}
        />

        {/* product grid */}
        {!products ? (
          <>
            {" "}
            <div className="flex justify-center items-center pb-10 col-span-4">
              {/* <NotFound text={"Products are Not available!"} /> */}
            </div>
          </>
        ) : (
          <div className="col-span-4">
            <div className="flex items-center py-2 p-2   mb-7 justify-between">
              <p>
                Showing {startIndex}–{endIndex} of {totalProducts} results
              </p>

              <select
                name="sortByPrice"
                className="text-black font-medium border bg-opacity-10  
             text-sm rounded-lg  block p-2.5               "
                value={filters.sortBy || "Sort By Price"}
                onChange={handleFilterChange}
              >
                <option className="p-2 h-20" value="asc">
                  Low to High
                </option>
                <option className="p-2" value="desc">
                  High to Low
                </option>
              </select>
              {/* </form> */}
            </div>

            <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-3">
              {/* Todo product card */}
              {products?.map((product: ICar) => (
                <FeaturedProductCard key={product._id} data={product} />
              ))}
            </div>
            {/* pagination */}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      handlePageChange(Math.max(filters.page - 1, 1))
                    }
                    size={undefined}
                  />
                </PaginationItem>
                {[
                  ...Array(Math.ceil(totalProducts / filters.limit)).keys(),
                ].map((i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(i + 1)}
                      size={undefined}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handlePageChange(
                        Math.min(filters.page + 1, totalPages || 0)
                      )
                    }
                    size={undefined}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            {/* if no prduct  */}
            {!products && (
              <>{/* <NotFound text={"Products are Not available!"} /> */}</>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductsPage;
