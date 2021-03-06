import { Box, Button, Card, CardContent, CardMedia, Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import React, { useContext, useState } from 'react';
import ProductContext from './context/product/productcontext';
import { CardActionArea } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Menu from './Menu';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loader from '../components/Loader'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTheme } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Pagination } from "swiper";
import Logo from "../assets/Images/logo.png"
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useId } from 'react';


const theme = createTheme()



const Category = () => {
     const {categories,products} = useContext(ProductContext) 

     
    
     const matches = useMediaQuery(theme.breakpoints.down('sm'));
     const navigate = useNavigate()
     const cat = categories
     const [localProducts, setLocalProducts] = useState(products)
     const [active, setActive] = useState()
     const id = useId()

     const filterItem = (catid)=>{
          const updatedItems =  products.filter((elem)=>{
              return elem.category === catid     
          })
          setLocalProducts(updatedItems)  
          setActive(catid)
       }
     
   
     
    return   (
         <>
         <Paper>
        <Box sx={{flexGrow:1, pt:12, borderBottom:1, borderBottomColor:'divider'}}>
            <Typography sx={{mb:3, fontFamily:'Roboto',  textAlign:'center'}} variant='h4' component='h5'>CATEGORIES</Typography>
     <Swiper slidesPerView={matches ? 2 : 4}  className='mySwiper' >
          
       <Grid container spacing={2}>
            <SwiperSlide id={id}>
            <Grid  item xs={4} md={4} lg={3}>
                <Card sx={{maxWidth:345}}  >
                     <CardActionArea onClick={()=>{
                          setLocalProducts(products)
                          setActive(id)
                          }}>
                 <CardMedia 
                    component='img'
                    sx={{height:150, objectFit:'contain'}}
                    image={Logo}
                    
                    
                    />
                    <CardContent> 
                         {matches ? (
                              <Typography variant= {id === active ? 'h5' : 'h6'} sx={{textAlign:'center', fontFamily:'Roboto',color:id === active ? 'brown' : ''}}>All</Typography>
                         ) : (
                              <Typography variant= {id === active ? 'h4' : 'h5'}  sx={{textAlign:'center', fontFamily:'Roboto', color:id === active ? 'brown' : ''}}>All</Typography>
                         ) }
                       
                    </CardContent>
                    </CardActionArea>
               </Card> 
               </Grid> 
              
              
            </SwiperSlide>

        {cat?.map((category)=> (
               <SwiperSlide key={category._id}> 
                  <Grid  item xs={4} md={4} lg={3}>
                  <Card sx={{maxWidth:345}} >
                       <CardActionArea onClick={()=>filterItem(category._id)}>
                   <CardMedia 
                     component='img'
                     
                      image={`https://api.manxho.co.in${category.image}`}
                      sx={{height:150}}
                      />
                      <CardContent> 
                           {matches ? (
                                <Typography variant={category._id === active ? 'h5' : 'h6'} sx={{textAlign:'center', fontFamily:'Roboto',color:category._id === active ? 'brown' : ''}}>{category.title}</Typography>
                           ) : (
                                <Typography variant={category._id === active ? 'h4' : 'h5'} sx={{textAlign:'center', fontFamily:'Roboto', color:category._id === active ? 'brown' : ''}}>{category.title}</Typography>
                           ) }
                         
                      </CardContent>
                      </CardActionArea>
                 </Card> 
                 </Grid> 
                 </SwiperSlide>
          )
        )}
       </Grid>
       </Swiper>

       </Box>
       </Paper>
       <Menu localProducts={localProducts}/>
       </>
    );
}

export default Category;
