import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Slide from './slide';
import {AppData, Context} from '../index'

const headers = ['Institution', 'Amount', 'Total'];

const alignTableHeader = (i: number) => (i > 0 ? 'center' : 'left');

const tableContainerStyle = () => ({
  display: 'flex',
  justifyContent: 'center',
  border: '1 solid lightgrey',
  maxWidth: 700
});
/**
 * BasicTable is used as the body of the index.tsx layout
 */
export default function BasicTable() {
  const resources = React.useContext(Context);
  const [, data] = resources;
  return (
    <TableContainer sx={tableContainerStyle} component={Paper}>
      <Table sx={{ minWidth: 350, maxWidth: 700 }} aria-label="simple table">
        <TableHead>
          {/* table header information */}
          <TableRow>
            {headers.map((e: string, i: number) => (
              <TableCell key={i} align={alignTableHeader(i)}>{e}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: AppData, i: number) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* company name */}
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              {/* slider */}
              <TableCell align="right">
              <Context.Provider value={resources}>
                <Slide  key={i} row={row}    />
                </Context.Provider>
              </TableCell>
              {/* total slider value */}
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
