import React,{useState, useEffect} from "react"
import axios from "axios"
import {Table, Button, Form} from "react-bootstrap"
import { Link } from "react-router-dom"


const Stocklist = () => {
    const [stocks, setStocks] = useState([])

    useEffect(()=>{
        getStocks();
    },[])

    const getStocks = async() => {
        const response = await axios.get('http://localhost:5000/stocks')
        setStocks(response.data)
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
        <Link to={`/addstock`}><Button variant="primary" className="d-flex mb-3" style={{float:"left"}}>Add</Button></Link>
            <Form className="d-flex" style={{float:"right"}}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>

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