"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge, Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FilterControls from "./FilterControls";

const CarFilters = ({ filters }) => {
  //WE CAN DIRECTLY SHARE THE FILTER URL WITH SOMEONE
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  //GET CURRENT FILTER VALUES FROM SEARCHPARAMS
  const currentMake = searchParams.get("make") || "";
  const currentBodyType = searchParams.get("bodyType") || "";
  const currentFuelType = searchParams.get("fuelType") || "";
  const currentTransmission = searchParams.get("transmission") || "";
  const currentMinPrice = searchParams.get("minPrice")
    ? parseInt(searchParams.get("minPrice"))
    : filters.priceRange.min;
  const currentMaxPrice = searchParams.get("maxPrice")
    ? parseInt(searchParams.get("maxPrice"))
    : filters.priceRange.max;

  const currentSortBy = searchParams.get("sortBy") || "newest";

  //STATE FOR FILTERS
  const [make, setMake] = useState(currentMake);
  const [bodyType, setBodyType] = useState(currentBodyType);
  const [fuelType, setFuelType] = useState(currentFuelType);
  const [transmission, setTransmission] = useState(currentTransmission);
  const [priceRange, setPriceRange] = useState([
    currentMinPrice,
    currentMaxPrice,
  ]);
  const [sortBy, setSortBy] = useState(currentSortBy);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const activeFilterCount = [
    make,
    bodyType,
    fuelType,
    transmission,
    currentMinPrice > filters.priceRange.min ||
      currentMinPrice < filters.priceRange.max,
  ].filter(Boolean).length;

  const currentFilters = {
    make,
    bodyType,
    fuelType,
    transmission,
    priceRange,
    priceRangeMin: filters.priceRange.min,
    priceRangeMax: filters.priceRange.max,
  };

  //HANDLE APPLY FILTERS
  const applyFilters = () =>{};

  //HANDLE FILTER CHANGE FUNCTION
  const onFilterChange = (filterName, value) => {
    switch (filterName) {
      case "make":
        setMake(value);
        break;
      case "bodyType":
        setBodyType(value);
        break;
      case "fuelType":
        setFuelType(value);
        break;
      case "transmission":
        setTransmission(value);
        break;
      case "priceRange":
        setPriceRange(value);
        break;
    }
  };

  //HANDLE CLEAR FILTER FUNCTION
  const onClearFilter = (filterName) => {
    onFilterChange(filterName, "");
  };

  //HANDLE CLEAR ALL FILTERS FUNCTION
  const clearFilters = () => {
    setMake("");
    setBodyType("");
    setFuelType("");
    setTransmission("");
    setPriceRange([filters.priceRange.min, filters.priceRange.max]);
    setSortBy("newest");

    const params = new URLSearchParams();
    const search = searchParams.get("search");
    if (search) params.set("search", search);

    const query = params.toString();
    const url = query ? `${pathName}?${query}` : pathName;
    router.push(url);
    setIsSheetOpen(false);
  };

  //UPDATE STATE WHEN URL PARAM CHANGES
  useEffect(() => {
    setMake(currentMake);
    setBodyType(currentBodyType);
    setFuelType(currentFuelType);
    setTransmission(currentTransmission);
    setPriceRange([currentMinPrice, currentMaxPrice]);
    setSortBy(currentSortBy);
  }, [
    currentMake,
    currentBodyType,
    currentFuelType,
    currentTransmission,
    currentMinPrice,
    currentMaxPrice,
    currentSortBy,
  ]);
  return (
    <div>
      {/* MOBILE FILTERS */}
      <div className="lg:hidden mb-4">
        <div className="flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-1 justify-center h-5 w-5 rounded-full p-0 flex items-center">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              className="w-full sm:max-w-md overflow-y-auto"
              side="left"
            >
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="py-6">
                <FilterControls
                  filters={filters}
                  currentFilters={currentFilters}
                  onClearFilter={onClearFilter}
                  onFilterChange={onFilterChange}
                />
              </div>

              <SheetFooter className="sm:justify-between flex-row pt-2 border-t space-x-4 mt-auto">
                <Button
                  onClick={clearFilters}
                  className="flex-1"
                  type="button"
                  variant="outline"
                >
                  Reset
                </Button>
                <Button onClick={applyFilters} type="button" className='flex-1'>Show Results</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default CarFilters;
