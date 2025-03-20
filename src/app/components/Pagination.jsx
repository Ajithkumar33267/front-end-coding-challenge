
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function PaginationComponent({ offset, setOffset, limit, totalCount }) {
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(totalCount / limit);

    const handlePageChange = (page) => {
        setOffset((page - 1) * limit);
    };

    const renderPageNumbers = () => {
        let pages = [];

        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 2) {
                pages = [1, 2, 3];
            } else if (currentPage >= totalPages - 1) {
                pages = [totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [currentPage - 1, currentPage, currentPage + 1];
            }
        }

        return (
            <>
                {currentPage > 2 && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => handlePageChange(1)}
                                className="hover:bg-blue-100"
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        {currentPage > 3 && (
                            <PaginationEllipsis />
                        )}
                    </>
                )}

                {pages.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={currentPage === page}
                            className={`hover:bg-blue-100 cursor-pointer ${currentPage === page ? 'bg-blue-500 text-white' : ''
                                }`}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {currentPage < totalPages - 2 && (
                    <>
                        <PaginationEllipsis />
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => handlePageChange(totalPages)}
                                className="hover:bg-blue-100 cursor-pointer"
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}
            </>
        );
    };

    return (
        <Pagination className="flex justify-center gap-2">
            {currentPage !== 1 && (
                <PaginationItem>
                    <PaginationPrevious
                        className='cursor-pointer'
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)} />

                </PaginationItem>
            )}

            <PaginationContent>{renderPageNumbers()}</PaginationContent>

            {currentPage !== totalPages && (
                <PaginationItem>
                    <PaginationNext
                        className='cursor-pointer'
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    />

                </PaginationItem>
            )}
        </Pagination>
    );
}
