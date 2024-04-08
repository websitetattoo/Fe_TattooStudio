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

interface PropsPageType {
  pageSize: number;
  total: number;
  onPageChange: (pageNumber: number) => void; //Call back trả về page được click
  onPageSizeChange: (pageSize: number) => void; //Call back trả về khi change pageSize
}

export function PaginationComponent({
  propsPage,
}: {
  propsPage: PropsPageType;
}) {
  const { pageSize, total, onPageChange, onPageSizeChange } = propsPage;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState("5");
  const pageSizeOptions = ["5", "10", "15", "20", "25", "30", "50"];

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
    setCurrentPageSize(value);
    onPageSizeChange(+value);
  };

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePrevPage(currentPage)} />
          </PaginationItem>

          {pages.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
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
              <Button variant="outline">{currentPageSize} items/ page</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white">
              <DropdownMenuLabel>Option</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={currentPageSize}
                onValueChange={handleChangePageSize}
              >
                {Array.isArray(pageSizeOptions) &&
                  pageSizeOptions?.length > 0 &&
                  pageSizeOptions.map((item, index) => (
                    <DropdownMenuRadioItem
                      className="hover:bg-blue-100"
                      key={index}
                      value={item}
                    >
                      {item} items/ page
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
