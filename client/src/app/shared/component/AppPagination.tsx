import { Box, Pagination, Typography } from "@mui/material";
import type { Pagination as PaginatonType } from "../../models/pagination";
type Props = {
  page: PaginatonType;
  onPageChange: (page: number) => void;
};
export default function AppPagination({ page, onPageChange }: Props) {
  const { pageSize, totalCount, totalPage, currentPage } = page;
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 3,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ color: "#2F4F4F", fontSize: "1.2rem" }}>
          Displaying {startItem}-{endItem} of {totalCount} items
        </Typography>
        <Pagination
          color="secondary"
          size="large"
          count={totalPage}
          page={currentPage}
          onChange={(_, page) => onPageChange(page)}
          sx={{ p: 2 }}
        />
      </Box>
    </Box>
  );
}
