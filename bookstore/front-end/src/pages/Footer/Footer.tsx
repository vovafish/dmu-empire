
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <footer>
      <Container maxWidth="sm">
        <Typography variant="body2" color="textSecondary" align="center">
        Empire Bookstore &copy; {new Date().getFullYear()}
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;