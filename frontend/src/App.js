import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import DataTable from './Components/Table';
import axios from 'axios';

function App() {
  var [tabledata, setTableData] = useState([])

  const url = "https://api-pcv.gridbees.com/order/stream"
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
      for(let i = 0; i < res.data.data.length; i ++) {
        let passengers = "";
        if(res.data.data[i].deliverydetail.passengers) {
          for(let j = 0; j < res.data.data[i].deliverydetail.passengers.length; j ++) {
            passengers += passengers!=""?"," + res.data.data[i].deliverydetail.passengers[j].firstname + ' ' + res.data.data[i].deliverydetail.passengers[j].lastname:res.data.data[i].deliverydetail.passengers[j].firstname + ' ' + res.data.data[i].deliverydetail.passengers[j].lastname
          }
        }
        tdata.push({
          transactionnumber: res.data.data[i].ordertracking.transactionnumber,
          externaltransactionnumber: res.data.data[i].ordertracking.externaltransactionnumber,
          bookingname: res.data.data[i].billingaddress.name.firstname + ' ' + res.data.data[i].billingaddress.name.lastname,
          passengersname: passengers,
          businesscreationdate: res.data.data[i].businesscreationdate,
          referencecode: res.data.data[i].lines[0].referencecode,
          bookingdate: res.data.data[i].lines[0].bookingdate,
          bookinghour: res.data.data[i].lines[0].bookinghour,
          bookinglang: res.data.data[i].lines[0].bookinglang
        })
      }
      setTableData(tdata)
    })
    
  }, [])
  return (
    <div className="App">
      <Navbar />
      <DataTable tabledata = {tabledata}/>
    </div>
  );
}

export default App;
