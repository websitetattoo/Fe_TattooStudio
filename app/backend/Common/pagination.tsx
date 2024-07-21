import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { twMerge } from "tailwind-merge";

interface PropsPageType {
  pageSize: number;
  total: number;
  onPageChange: (pageNumber: number) => void; //Call back trả về page được click
  onPageSizeChange: (pageSize: number) => void; //Call back trả về khi change pageSize
  className?: string;
}
const pageSizeOptions: Array<number> = [25, 50, 100];
export function PaginationComponent({
  propsPage,
}: {
  propsPage: PropsPageType;
}) {
  const { pageSize, total, onPageChange, onPageSizeChange, className } =
    propsPage;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageSize, setCurrentPageSize] = useState<number>(25);

  // Tính số lượng trang
  const pageCount = Math.ceil(total / pageSize);
  // Tạo một mảng các trang
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleNextPage = (pageNumber: number) => {
    const index = 1;
    if (pageNumber < pages?.length) {
      setCurrentPage(pageNumber + index);
      onPageChange(pageNumber + index);
    }
  };

  const handlePrevPage = (pageNumber: number) => {
    const index = 1;
    if (pageNumber > 1) {
      setCurrentPage(pageNumber - index);
      onPageChange(pageNumber - index);
    }
  };

  const handleChangePageSize = (value: string) => {
    setCurrentPageSize(+value);
    onPageSizeChange(+value);
  };

  return (
    <div
      className={twMerge(
        "flex items-center justify-end space-x-2 py-4",
        className,
      )}
    >
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePrevPage(currentPage)} />
          </PaginationItem>

          {pages.map((pageNumber) => (
            <PaginationItem
              key={pageNumber}
              className={
                currentPage === pageNumber ? "rounded bg-white text-black" : ""
              }
            >
              <PaginationLink onClick={() => handlePageClick(pageNumber)}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext onClick={() => handleNextPage(currentPage)} />
          </PaginationItem>
        </PaginationContent>

        {/*nút chọn pageSize - Begin add */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={className ? "secondary" : "outline"}>
                {currentPageSize} items/ page
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white">
              <DropdownMenuLabel>Option</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={currentPageSize + ""}
                onValueChange={handleChangePageSize}
              >
                {Array.isArray(pageSizeOptions) &&
                  pageSizeOptions?.length > 0 &&
                  pageSizeOptions.map((pageSize, index) => (
                    <DropdownMenuRadioItem
                      className={twMerge(" hover:bg-blue-100")}
                      key={index}
                      value={pageSize.toString()}
                    >
                      {pageSize} items/ page
                    </DropdownMenuRadioItem>
                  ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/*UI chọn pageSize - End add */}
      </Pagination>
    </div>
  );
}
