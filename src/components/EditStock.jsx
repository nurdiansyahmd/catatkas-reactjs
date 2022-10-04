import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {Button, Figure, Form,InputGroup} from 'react-bootstrap'
import './css/style.css'

const EditStock = () => {
    const [productname, setProductname] = useState("")
    const [sellprice, setSellPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [preview, setPreview] = useState("")
    const [file, setFile] = useState("")
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getStockById()
        // eslint-disable-next-line
    },[])

    const getStockById = async() => {
        const response = await axios.get(`http://localhost:5000/stocks/${id}`)
        setProductname(response.data.productname)
        setSellPrice(response.data.sellprice)
        setQuantity(response.data.quantity)
        setFile(response.data.image)
        setPreview(response.data.url)
    }

    const loadImage = (e) => {
        const image = e.target.files[0]
        setFile(image);
        setPreview(URL.createObjectURL(image))
    }

    const updateStock = async(e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('productname', productname)
        formData.append('sellprice', sellprice)
        formData.append('quantity',quantity)
        formData.append('file',file)
        
        try {
            await axios.patch(`http://localhost:5000/stocks/${id}`, formData,{
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
        <Form onSubmit={updateStock}>
            <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control value={productname} 
                    onChange={(e)=> setProductname(e.target.value)} className="input-width"/>
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

           <Button className='mt-2' variant="primary" type='submit'>Update</Button>
        </Form>
    </div>
  )
}

export default EditStock