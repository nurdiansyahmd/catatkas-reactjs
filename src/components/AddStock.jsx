import axios from 'axios'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Figure, Form,InputGroup} from 'react-bootstrap'
import './css/style.css'

const AddStock = () => {
    const [productname, setProductname] = useState("")
    const [sellprice, setSellPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [preview, setPreview] = useState("")
    const [file, setFile] = useState("")
    const navigate = useNavigate()

    const loadImage = (e) => {
        const image = e.target.files[0]
        setFile(image);
        setPreview(URL.createObjectURL(image))
    }

    const saveStock = async(e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('productname', productname)
        formData.append('sellprice', sellprice)
        formData.append('quantity',quantity)
        formData.append('file',file)
        
        try {
            await axios.post("http://localhost:5000/stocks", formData,{
                headers:{
                    "content-type" : "multipart/form-data"
                }
            })
            navigate("/stocks")
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <div className="container mt-5">
        <Form onSubmit={saveStock}>
            <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control value={productname} onChange={(e)=> setProductname(e.target.value)} className="input-width"/>
            </Form.Group>

            <Form.Label>Sell Price</Form.Label>
            <InputGroup className="mb-3 input-width">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control aria-label="Amount (to the nearest dollar)" 
                    value={sellprice} 
                    onChange={(e)=> setSellPrice(e.target.value)} 
                />                
            </InputGroup>

            <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control value={quantity} onChange={(e)=> setQuantity(e.target.value)} style={{width:"30%"}} />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Input Image</Form.Label>
                <Form.Control type='file' onChange={loadImage} style={{width:"30%"}} />

            {/* preview image */}
            {preview ? (
                <Figure.Image 
                    width={128}
                    height={128}
                    alt="preview"
                    src={preview}
                />
            ) : ("")}
            </Form.Group>

           <Button className='mt-2' variant="primary" type='submit'>Submit</Button>
        </Form>
    </div>
  )
}

export default AddStock