import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../../../components/ui/pagination";

interface PaginationDataProps {
	handlePageChange: (page: number) => void;
	filters: { page: number; limit: number };
	totalorders: number;
	totalPages: number;
}

const PaginationData = ({
	handlePageChange,
	filters,
	totalorders,
	totalPages,
}: PaginationDataProps) => {
	const pages = Math.ceil(totalorders / filters.limit);

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => handlePageChange(Math.max(filters.page - 1, 1))}
					/>
				</PaginationItem>
				{[...Array(pages).keys()].map((i) => (
					<PaginationItem key={i}>
						<PaginationLink
							href="#"
							onClick={(e) => {
								e.preventDefault();
								handlePageChange(i + 1);
							}}
						>
							{i + 1}
						</PaginationLink>
					</PaginationItem>
				))}
				{pages > 5 && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}
				<PaginationItem>
					<PaginationNext
						onClick={() =>
							handlePageChange(Math.min(filters.page + 1, totalPages || 0))
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default PaginationData;
