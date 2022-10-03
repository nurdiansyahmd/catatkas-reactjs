import React,{useState, useEffect} from "react"
import axios from "axios"
import {Table, Button} from "react-bootstrap"
import { Link } from "react-router-dom"

const Stocklist = () => {
    const [stocks, setStocks] = useState([])

    //panggil fungsi getStocks kedalam useEffect hook
    useEffect(()=>{
        getStocks();
    },[]) //tambahkan empty array agar nanti useEffect running pada saat onMounted

    //bikin fungsi untuk mengambil semua data stock dari backend
    const getStocks = async() => {
        const response = await axios.get('http://localhost:5000/stocks')
        setStocks(response.data) //masukan response kedalam state
    }  
    const deleteStock = async(stockId) => {
      try {
        await axios.delete(`http://localhost:5000/stocks/${stockId}`);
        getStocks();
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="container mt-5">
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Selling Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            {stocks.map((stock, index)=>(
            <tbody key={stock.id}>
              <tr>
                <td>{index + 1}</td>
                <td>{stock.productname}</td>
                <td>{stock.sellprice}</td>
                <td>{stock.quantity}</td>
                <td>
                  <Link to={`/editstock/${stock.id}`}><Button variant="warning">Edit</Button></Link>{" "}
                  <Button variant="danger" onClick={()=>deleteStock(stock.id)}>Delete</Button>
                </td>
              </tr>
            </tbody>
            ))}
          </Table>
        
       
    </div>
  )
}

export default Stocklist