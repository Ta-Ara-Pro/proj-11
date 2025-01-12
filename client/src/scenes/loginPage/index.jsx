import React from 'react'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import Form from './Form';

const LoginPage = () => {
  const theme = useTheme();
  const isNonMonbileScreens = useMediaQuery("(min-width: 1000px")
  return (
    <Box>
      <Box width="100%" backgroundColor={theme.palette.background.alt} p='1rem 6%' textAlign='center'>
       <Typography fontWeight="bolde" fontSize="32px"
          color="primary"
          // onClick={() => navigate("/home")}
          // sx={{
          //   "&:hover": {
          //     color: primaryLight,
          //     cursor: "pointer",
          //   },
          // }}
        >
          Sociopedia
        </Typography>
        </Box>
        <Box width={isNonMonbileScreens ? '50%' : "93%"} p='2rem' m='2rem auto' borderRadius='1.5rem'
        backgroundColor={theme.palette.background.alt}>
          <Typography fontWeight='500' variant='h5' sx={{ mb:'1.5rem'}}>
            Welcome to Sociapedia, the Social Media for Sociopaths
          </Typography>
          <Form />

        </Box>
    </Box>
  )
}

export default LoginPage
