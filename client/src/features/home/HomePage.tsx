import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Box maxWidth='xl' mx='auto' position='relative' px={4} >
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' position='relative'>
        <img
          src='/images/home.jpg'
          alt="main image"
          style={
            {
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '16px',
              zIndex: -1
            }

          }

        />
        <Box display='flex' p={8} flexDirection='column' alignItems='center' justifyContent='center' position='relative' borderRadius={4}>
          <Typography variant="h1" color="initial" fontWeight='bold' sx={{ my: 3 }}>Welcome to</Typography>
          <Typography variant="h1" color="initial" fontWeight='bold' sx={{ my: 3 }}> YC-Store</Typography>
          
          <Button variant="contained" size='large' component={Link} to='/catalog' sx={{ mt: 8, fontWeight: 'bold', color: 'white', borderRadius: '16px', px: 8, py: 2, border: '2px solid transparent' }} >Go to shop</Button>
        </Box>
      </Box>
    </Box>
  )
}