import * as React from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import './index.css'

export default function SearchForm(props) {
    var [date, setDate] = useState(dayjs('2014-08-18T21:11:54'))
    const [product, setProduct] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [externalReservation, setExternalReservation] = useState("");

    const handleChangeDate = (newValue) => {
        setDate(newValue);
    };

    const handleProduct = (e) => {
        setProduct(e.target.value);
    }
    const handleCustomerName = (e) => {
        setCustomerName(e.target.value);
    }
    const handleExternalReservation = (e) => {
        setExternalReservation(e.target.value);
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    value={date}
                    onChange={handleChangeDate}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <TextField id="outlined-basic" label="Product" variant="outlined" value={product} onChange={handleProduct} />
            <TextField id="outlined-basic" label="CustomerName" variant="outlined" value={customerName} onChange={handleCustomerName} />
            <TextField id="outlined-basic" label="ExternalReservation" variant="outlined" value={externalReservation} onChange={handleExternalReservation} />
            <Button className="filter" variant="contained" onClick={() => {
                props.filterData(date, product, customerName, externalReservation)
            }} disableElevation>
                Filter
            </Button>
        </Box>
    )
}