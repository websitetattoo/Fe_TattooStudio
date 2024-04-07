import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PropsPageType {
  pageSize: number;
  total: number;
  onPageChange: (pageNumber: number) => void; //Call back trả về page được click
}

export function PaginationComponent({
  propsPage,
}: {
  propsPage: PropsPageType;
}) {
  const { pageSize, total, onPageChange } = propsPage;
  const [currentPage, setCurrentPage] = useState(1);
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
      </Pagination>
    </div>
  );
}
