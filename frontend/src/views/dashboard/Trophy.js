// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import { Stack } from "@mui/material";
import {useState, useEffect} from 'react'
import axios from "axios";

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const NbrUsersComponent = (props) => {
  const { sx } = props;
  const [nbrusers, setnbrusers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user", { withCredentials: true });
        setnbrusers(response.data);
        console.log({nbrusers});
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors gracefully, e.g., show an error message to the user
      }
    };

    fetchData();
  }, []);

  return (
    <Stack spacing={1}>
      <Typography variant="h4">
        {nbrusers && nbrusers.map((user) => <span key={user.UserID}>{user.NumberOfUsers}</span>)}
      </Typography>
      
    </Stack>
  );
};

const Trophy = () => {
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          NumberOfUsers
          <NbrUsersComponent />
        </Typography>
        
        <Button size='small' variant='contained'>
          View Users
        </Button>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default Trophy
