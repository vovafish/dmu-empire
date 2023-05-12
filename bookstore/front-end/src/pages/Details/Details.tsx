// import { useParams } from "react-router-dom";
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import Album from "../Home/Album";

// function Details() {
//     let id = useParams<{ id: string }>().id;
//     return (<>
//         <h1>
//             Details page id:{id}
//         </h1>
//         <Album />
//     </>)
//     ;
//   }

//   export default Details;



import React, { useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    Divider,
    List,
    ListItem,
    ListItemText,
    TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {getDetailsById}  from '../../api/books.js';
import Skeleton from '@mui/material/Skeleton';
import $bus from '../../tools/$bus';

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [quantity, setQuantity] = useState<number>(1);
    const { isLoading, data: product } = useQuery(['details', id], () => getDetailsById(id), { cacheTime: 0 });

    const handleAddQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleRemoveQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (value > 0) {
            setQuantity(value);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    {isLoading ? (
                        <Skeleton variant="rectangular" width={345} height={400} />
                    ) : (
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia component="img" height="200" image={product.image} alt={product.title} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    {isLoading ? (
                        <>
                            <Skeleton variant="text" width={200} height={40} />
                            <Skeleton variant="rectangular" width={400} height={400} sx={{ mt: 2 }} />
                        </>
                    ) : (
                        <>
                            <Typography variant="h6" gutterBottom>
                                Product Details
                            </Typography>
                            <Divider />
                            <List sx={{ pt: 2 }}>
                                <ListItem disablePadding>
                                    <ListItemText primary="Product Name" secondary={product.title} />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="Product Description" secondary={product.description} />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="Product Price" secondary={`$${product.price}`} />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="Product Brand" secondary={product.brand} />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="Product Category" secondary={product.category} />
                                </ListItem>
                            </List>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    Quantity:
                                </Typography>
                                <TextField
                                    type="number"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    inputProps={{
                                        min: 1, max: 99
                                    }}
                                    sx={{ maxWidth: 60 }}
                                />
                                <Button variant="contained" onClick={handleAddQuantity} sx={{ ml: 1 }}>
                                    +
                                </Button>
                                <Button variant="contained" onClick={handleRemoveQuantity} sx={{ ml: 1 }}>
                                    -
                                </Button>
                            </Box>
                            {/* <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={$bus.addCartCount()}>
                                Add to Cart
                            </Button> */}
                            <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => $bus.addCartCount()}>
  Add to Cart
</Button>
                        </>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDetails;