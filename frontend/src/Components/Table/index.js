import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

const columns = [
  {
    width: 140,
    label: 'Transaction number',
    dataKey: 'transactionnumber',
  },
  {
    width: 140,
    label: 'External transaction',
    dataKey: 'externaltransactionnumber',
  },
  {
    width: 120,
    label: 'Booking name',
    dataKey: 'bookingname',
  },
  {
    width: 120,
    label: 'Passengers name',
    dataKey: 'passengersname',
  },
  {
    width: 120,
    label: 'Booking date',
    dataKey: 'businesscreationdate',
  },
  {
    width: 120,
    label: 'Product',
    dataKey: 'referencecode',
  },
  {
    width: 120,
    label: 'Activity date',
    dataKey: 'bookingdate',
  },
  {
    width: 120,
    label: 'Activity time',
    dataKey: 'bookinghour',
  },
  {
    width: 120,
    label: 'Language',
    dataKey: 'bookinglang',
  },
];

// const rows = Array.from({ length: 200 }, (_, index) => {
//   const randomSelection = sample[Math.floor(Math.random() * sample.length)];
//   return createData(index, ...randomSelection);
// });

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function DataTable(data) {
  return (
    <Paper style={{ height: 700, width: '100%' }}>
        
    {console.log(data)}
      <TableVirtuoso
        data={data.tabledata}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}