import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import DataTable from './Components/Table';
import SearchForm from './Container/SearchForm';
import axios from 'axios';

function App() {
  var [totalData, setTotalData] = useState([])
  var [tabledata, setTableData] = useState([])

  const data = {
    booking: {
      startdate: "2023-02-23T23:00:00.000Z",
      enddate: "2023-02-25T23:00:00.000Z"
    },
    ordertype: "ORDER",
    orderstatus: {
      code: "PROCESSED"
    },
    requestcontext: {
      queryprojection: [
        "ordertracking.transactionnumber",
        "ordertracking.externaltransactionnumber",
        "ordertracking.vendorcode",
        "deliverydetail.passengers.lastname",
        "deliverydetail.passengers.firstname",
        "businesscreationdate",
        "billingaddress",
        "lines.linenum",
        "lines.quantity",
        "lines.amount.currency",
        "lines.amount.netamount",
        "lines.referencecode",
        "lines.bookingdate",
        "lines.bookinghour",
        "lines.bookinglang",
        "ordertype"
      ]
    },
  }

  useEffect(() => {
    axios.post("http://127.0.0.1:3001/getData", {
      data: data
    }).then((res) => {
      let tdata = [];
      for (let i = 0; i < res.data.data.length; i++) {
        let passengers = "";
        if (res.data.data[i].deliverydetail.passengers) {
          for (let j = 0; j < res.data.data[i].deliverydetail.passengers.length; j++) {
            passengers += passengers !== "" ? "," + res.data.data[i].deliverydetail.passengers[j].firstname + ' ' + res.data.data[i].deliverydetail.passengers[j].lastname : res.data.data[i].deliverydetail.passengers[j].firstname + ' ' + res.data.data[i].deliverydetail.passengers[j].lastname
          }
        }
        let businesscreationdate = new Date(res.data.data[i].businesscreationdate)
        let bookingdate = new Date(res.data.data[i].lines[0].bookingdate)
        tdata.push({
          transactionnumber: res.data.data[i].ordertracking.transactionnumber,
          externaltransactionnumber: res.data.data[i].ordertracking.externaltransactionnumber,
          bookingname: res.data.data[i].billingaddress.name.firstname + ' ' + res.data.data[i].billingaddress.name.lastname,
          passengersname: passengers,
          businesscreationdate: businesscreationdate.getDate() + '-' + (businesscreationdate.getMonth() + 1) + '-' + businesscreationdate.getFullYear(),
          referencecode: res.data.data[i].lines[0].referencecode,
          bookingdate: bookingdate.getDate() + '-' + (bookingdate.getMonth() + 1) + '-' + bookingdate.getFullYear(),
          bookinghour: res.data.data[i].lines[0].bookinghour,
          bookinglang: res.data.data[i].lines[0].bookinglang
        })
      }
      setTotalData(tdata)
      setTableData(tdata)
    })
  }, [])

  const filterData = (date, product, customerName, externalName) => {
    let temp = []
    let d = new Date(date)
    console.log(date)
    let bookingDate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()
    for (let i = 0; i < totalData.length; i++) {
      if (totalData[i].businesscreationdate === bookingDate || date === null)
        if (totalData[i].referencecode === product || product === "")
          if (totalData[i].bookingname === customerName || customerName === "")
            if (totalData[i].externaltransactionnumber === externalName || externalName === "") {
              temp.push(totalData[i])
            }
    }
    setTableData(temp)
  }
  return (
    <div className="App">
      <Navbar />
      <SearchForm filterData={filterData} />
      <DataTable tabledata={tabledata} />
    </div>
  );
}

export default App;
