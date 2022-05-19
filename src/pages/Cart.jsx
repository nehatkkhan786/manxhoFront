import { Box, Card, CardMedia, Container, Grid, Typography, CardContent, IconButton, Paper, Stack, Button } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import CartItem from './CartItem';
import { Items } from '../data';


let tempItem = Items.slice(0,5)


const Cart = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const [item, setItem] = useState(0)

  const increment = ()=>{
        setItem((prev)=>prev +1)
  }
  const decrement = ()=>{
    setItem((prev)=>prev -1)
  }


  return (
    <Container sx={{mt:10, mb:2}}>
      <Typography gutterBottom variant='h3'>Your Shopping Cart</Typography>
      <Grid container spacing={2}>
        {tempItem.map((item,index)=>(
         <>
         <Grid item xs={12} md={4}>
            <CartItem item={item}/>
         </Grid>
         </>
        ))}
      </Grid>
      <Box sx={{display:'flex', mt:'7%', width:'100%', alignItems:'center', justifyContent:'space-between'}}>
        <Typography variant='h5'>Subtotal: &#8377; 24545</Typography>
        <Box>
          {matches ? (
            <>
            <Button sx={{ml:9, mb:2, minWidth:'150px', color:'inherit', bgcolor:'brown', ":hover":{bgcolor:'brown'}}} size='large'  type='button' variant='contained'>Empty</Button>
            
            </>
          ):(
            <>
            <Button sx={{ml:9, minWidth:'150px', color:'inherit', bgcolor:'brown', ":hover":{bgcolor:'brown'}}} size='large'  type='button' variant='contained'>Empty</Button>
            </>
          )}
          {/* <Button sx={{ml:9, minWidth:'150px', color:'inherit', bgcolor:'brown', ":hover":{bgcolor:'brown'}}} size='large'  type='button' variant='contained'>Empty</Button> */}
          <Button sx={{ml:9, minWidth:'150px'}} size='large'  type='button' variant='contained'>Checkout</Button>
        </Box>
      </Box>
      
    </Container>
  )
}

export default Cart