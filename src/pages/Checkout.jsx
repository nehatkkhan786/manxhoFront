import { Box, Button, Container, Grid, MenuItem, Paper, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductContext from '../components/context/product/productcontext'
import {motion} from 'framer-motion'
import {Pincode} from '../assets/DATA/pincode'
import { toast } from 'react-toastify'

const Checkout = () => {

    const {addShippingDetails, shippingDetails, cartItems, shippingValue} = useContext(ProductContext)
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState(shippingDetails?.firstName)
    const [lastName, setLastName] =useState(shippingDetails?.lastName)
    const [address, setAddress] = useState(shippingDetails?.address) 
    const [city, setCity] = useState(shippingDetails?.city) 
    const [state, setState] = useState(shippingDetails?.state)  
    const [zipcode, setZipcode] = useState(shippingDetails?.zipcode)
    const [phoneNumber, setPhoneNumber] = useState(shippingDetails?.phoneNumber)
    const [country, setCountry] = useState('India')

    var stateValue = shippingValue === "Assam" ? 'Assam' : state

    
    useEffect(()=>{
        if(cartItems.length < 1){
            navigate('/')
        }
    }, [])

    const onSubmitHandler=(e)=>{
        e.preventDefault()
        const pin = Pincode.includes(parseInt(zipcode))
        if(pin){
            addShippingDetails({firstName, lastName, address, city,  stateValue , zipcode, phoneNumber, country})
            navigate('/order_review')
        }else{
            toast.error('Sorry Your Area is not Servicable')
        }

        
    }


  return (
      <>
      <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      >
   <Container component='main' sx={{minHeight:'100vh', maxWidth:'sm',pt:13}}>
       <Box>
           <Typography variant='h3' align='center'>Shipping Details</Typography>
       </Box>
       <Box component='form' onSubmit={onSubmitHandler} sx={{pb:4}}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <TextField
                id='firstName'
                name='firstName'
                label= 'First Name'
                margin='normal'
                fullWidth
                required
                value = {firstName}
                onChange={(e)=>setFirstName(e.target.value)}
                />
                
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
                id='lastName'
                name='lastName'
                label= 'Last Name'
                margin='normal'
                fullWidth
                required
                value = {lastName}
                onChange={(e)=>setLastName(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField
                id='Address'
                name='address'
                label='Address'
                fullWidth
                margin='normal'
                multiline
                rows={4}
                required
                value = {address}
                onChange={(e)=>setAddress(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                id='city'
                name='city'
                label='City'
                fullWidth
                margin='normal'
                required
                value = {city}
                onChange={(e)=>setCity(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                id='state'
                name='state'
                label='State'
                fullWidth
                margin='normal'
                required
                value = {shippingValue === 'Assam' ? 'Assam' : state}
                onChange={(e)=>setState(e.target.value)}
                disabled={shippingValue === "Assam" ? true : false}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                id='zipcode'
                name='zipcode'
                label='Zipcode'
                fullWidth
                margin='normal'
                required
                value = {zipcode}
                onChange={(e)=>setZipcode(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                id='phoneNumber'
                name='phoneNumber'
                label='Phone'
                fullWidth
                margin='normal'
                value={phoneNumber}
                onChange={(e)=>setPhoneNumber(e.target.value)}
                />
            </Grid>
        </Grid>
        <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <Button onClick={()=>navigate(-1)}  variant='outlined'sx={{mt:2, borderColor:'brown', color:'inherit', ":hover":{borderColor:'brown'}}}>Back</Button>
        <Button type='submit'  variant='outlined'sx={{mt:2, borderColor:'brown', color:'inherit', ":hover":{borderColor:'brown'}}}>Next</Button> 
        </Box>
        
        </Box>
   </Container>
   </motion.div>
   </>
  )
}

export default Checkout