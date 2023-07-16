import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LeaderboardData } from "../dto/statistics.dto";

interface Props {
  data: LeaderboardData[];
}

export const Leaderboard: React.FC<Props> = ({ data }) => {
  return (
    <TableContainer component={Paper} className="my-6">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell>Course</TableCell>
            <TableCell align="center">ppOccupancy</TableCell>
            <TableCell align="center">ppPossible</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .sort((a, b) => b.ppOccupancy - a.ppOccupancy)
            .map((row) => (
              <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.course}</TableCell>
                <TableCell align="right">{row.ppOccupancy}</TableCell>
                <TableCell align="right">{row.ppPossible}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
