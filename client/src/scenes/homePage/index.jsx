import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from 'scenes/navbar'
import AdvertWidget from 'scenes/widgets/AdvertWiget'
import MyPostWidget from 'scenes/widgets/MyPostWidget'
import PostsWidget from 'scenes/widgets/PostsWidget'
import UserWidget from 'scenes/widgets/UserWidget'

const HomePage = () => {
  const isNonMoblieScreens = useMediaQuery("(min-width: 1000px)");
  const user = useSelector((state) => state.user)
  // console.log('user data from global state', user)
  return (
    <Box>
      <Navbar />
      <Box width='100%' p='2rem 6%' display={isNonMoblieScreens ? "flex" : "block"} gap='0.5rem' justifyContent='space-between'>
        <Box flexBasis={isNonMoblieScreens ? '26%' : undefined}>
          <UserWidget userId={user._id} image={user.picturePath} />
        </Box>

        <Box flexBasis={isNonMoblieScreens ? '42%' : undefined} mt={isNonMoblieScreens ? undefined : '2rem'}>
          <MyPostWidget picturePath={user.picturePath} />
          <Box flexBasis={isNonMoblieScreens ? '42%' : undefined}>  <PostsWidget userId={user._id} />
          </Box>

        </Box>

        {isNonMoblieScreens && (
          <Box flexBasis='26%'>
            <AdvertWidget />
          </Box>
        )}

      </Box>



    </Box>
  )
}

export default HomePage
