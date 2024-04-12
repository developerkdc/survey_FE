import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  Typography,
} from "@mui/material";
import CustomActionMenu from "../Menu";

const CustomTable = ({ data, page, setPage, columns, actions, fetchData, totalCount }) => {
  // console.log(totalCount);
  const rowsPerPage = 10;
  const [sortField, setSortField] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === "asc";
    setSortField(field);
    setSortOrder(isAsc ? "desc" : "asc");
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if(fetchData){
      fetchData({ page: page + 1, sortField, sortOrder });
    }
  }, [page, sortField, sortOrder]);

  const renderCellContent = (row, column) => {
    if (column.renderCell) {
      return column.renderCell(row);
    }

    const value = row[column.field];
    return column.render ? column.render(value, row) : value;
  };

  return (
    <Paper elevation={0}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  variant="head"
                  sx={{
                    padding: "10px 0px 10px 20px",
                    fontSize: "16px",
                    width: column.width || "auto",
                  }}
                  align="left"
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortField === column.field}
                      direction={sortField === column.field ? sortOrder : "desc"}
                      onClick={() => handleSort(column.field)}
                    >
                      {column.headerName}
                    </TableSortLabel>
                  ) : (
                    column.headerName
                  )}
                </TableCell>
              ))}
              {actions && (
                <TableCell sx={{ padding: "10px 0px", fontSize: "16px" }} align="center">
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          {data && data.length ? (
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id} hover={true} sx={{ margin: "0px" }}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      align="left"
                      sx={{ padding: "8px 0px 8px 20px", paddingRight: column.width ? "20px" : "0px" }}
                      onClick={() => column.onClick && column.onClick(row)}
                    >
                      <Typography width={column.width ? column.width : "auto"}>
                        {renderCellContent(row, column)}
                      </Typography>
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell align="center" sx={{ padding: "0px" }}>
                      <CustomActionMenu menuItems={actions} row={row} />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length + (actions ? 1 : 0)} align="center">
                  Data Not Found !!
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {
        setPage && 
      <TablePagination
      rowsPerPageOptions={""}
      component="div"
      // count={totalCount * rowsPerPage}
      count={totalCount}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      />
    }
    </Paper>
  );
};

export default CustomTable;
