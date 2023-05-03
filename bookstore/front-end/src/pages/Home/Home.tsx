import { HashRouter, Route, Routes,Link } from 'react-router-dom';
import Details from '../Details/Details';
import About from '../About/About';
import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import  '@mui/material';

import $bus from '../../tools/$bus';
interface HomeState {
  userinfo: {
    username: string;
  };
  cartCount: {
    count: number;
  };
}

const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: 'https://source.unsplash.com/7r3tCGqYV7Q/400x225',
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover: 'https://source.unsplash.com/4kjx_vx9dJA/400x225',
  },
  {
    id: 3,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    cover: 'https://source.unsplash.com/m6iP_k5OlyU/400x225',
  },
  {
    id: 4,
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    cover: 'https://source.unsplash.com/_v70GKj7VZM/400x225',
  },
  {
    id: 5,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    cover: 'https://source.unsplash.com/56VxkGQzNjw/400x225',
  },
];



function BookCard({ book }) {
  const navigate = useNavigate();

const handleLogoClick = () => {
  navigate('/');
};

  return (
    <Card sx={{ maxWidth: 345, m: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={book.cover}
          alt={book.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add to Cart
        </Button>
        <Button size="small" color="primary" onClick={() => navigate('/details/123')}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}


class Home extends Component<{}, HomeState> {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: {
        username: "",
      },
      cartCount: {
        count: 0,
      },
    };

  }
  
  componentDidMount() {
    $bus.addListener('setUserData', this.SettingUserData);

    $bus.addListener('addCartCount', this.AddCartCount);


  }

  componentWillUnmount() {
    $bus.removeListener('setUserData', this.SettingUserData);
    $bus.removeListener('addCartCount', this.AddCartCount);
  }

  SettingUserData(e) {
    let data = {...e}
    $bus.setUserData(data)
    this.setState({ userinfo: { username: e.username } }, () => {
      console.log(e, this.state.userinfo.username);
    });
  }

  AddCartCount(e) {
    let data = {...e}
    $bus.setCartCount(data)
    this.setState({ cartCount: { count: e.count } }, () => {
      console.log(e, this.state.cartCount.count);
    });
  }

  render() {
    return (
      <>
        
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Welcome to Online Bookstore
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Bestselling Books
        </Typography>
        <Container maxWidth="md" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </Container>
        
        <Typography variant="h5" sx={{ mb: 2 }}>
          Discounted Books
        </Typography>
        <Container maxWidth="md" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </Container>
      </Container>
      </>
    );
  }
}

export default Home;
