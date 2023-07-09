import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./table.css";

function createData(Status, CandidateName ,  Email, TestScore,Projects,Experience,Skills) {
  return { Status, CandidateName , Email, TestScore,Projects, Experience,Skills};
}

const rows = [
  createData("Interview","Mike Ross","mikeross@gmail.com","56%", "6", "8","9"),
  createData("Interview","Sheldon Copper","s.cooperphd@yahoo.com","85%", "9", "8", "9"),
  createData("Rejected","Joey","joey@gmail.com","11%", "9", "8", "9"),
  createData("Rejected","Maria Schulz","maria3456@gmail.com","43%", "6", "3", "4"),
];


const makeStyle=(status)=>{
  if(status === 'Interview')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Rejected')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable() {
  return (
      <div className="Table">
      <h3 style={{color:"white"}}>Candidate's Applied</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="left">Status</TableCell>
                <TableCell>Candidate Name </TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Test Score</TableCell>
                <TableCell align="left">Projects</TableCell>
                <TableCell align="left">Experience</TableCell>
                <TableCell align="left">Skills</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.map((row) => (
                <TableRow
                  key={row.CandidateName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                <TableCell align="left">
                    <span className="status" style={makeStyle(row.Status)}>{row.Status}</span>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.CandidateName}
                  </TableCell>
                  <TableCell align="left">{row.Email}</TableCell>
                  <TableCell align="left">{row.TestScore}</TableCell>
                  <TableCell align="left">{row.Projects}</TableCell>
                  <TableCell align="left">{row.Experience}</TableCell>
                  <TableCell align="left">{row.Skills}</TableCell>
                  {/* <TableCell align="left" className="Details">{row.}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}