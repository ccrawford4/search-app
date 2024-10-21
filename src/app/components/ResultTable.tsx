import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Tooltip,
} from "@mui/material";
import Image from "next/image";
import { HIT } from "../types";

interface SearchResultsTableProps {
  hits: HIT[];
}

export default function SearchResultsTable(props: SearchResultsTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt((event?.target as HTMLInputElement).value, 10));
    setPage(0);

    // Scroll to the top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!props.hits || props.hits.length == 0) {
    return <div></div>;
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableBody>
            {props.hits
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((hit, index) => (
                <TableRow key={index} hover>
                  <TableCell>
                    <Image
                      src={`https://www.google.com/s2/favicons?domain=${hit.URL}`}
                      alt="favicon"
                      width={16}
                      height={16}
                    />
                  </TableCell>
                  <TableCell>
                    {hit.DESCRIPTION ? (
                      <Tooltip
                        title={<Typography>{hit.DESCRIPTION}</Typography>}
                        arrow
                        placement="bottom-start"
                      >
                        <a
                          href={hit.URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#1976d2", textDecoration: "none" }}
                        >
                          {hit.TITLE !== "" ? hit.TITLE : hit.URL}
                        </a>
                      </Tooltip>
                    ) : (
                      <a
                        href={hit.URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#1976d2", textDecoration: "none" }}
                      >
                        {hit.TITLE !== "" ? hit.TITLE : hit.URL}
                      </a>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={props.hits.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          handleChangeRowsPerPage(event);
        }}
      />
    </Paper>
  );
}
