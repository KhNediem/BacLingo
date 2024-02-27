// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { useEffect, useState } from 'react'
import axios from "axios";


const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const DashboardTable = () => {
  const [tbluser, settbluser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users", { withCredentials: true });
        settbluser(response.data);
        console.log({tbluser});
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors gracefully, e.g., show an error message to the user
      }
    };

    fetchData();
  }, []);
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Subscription Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tbluser.map(tbluser => (
              <TableRow hover key={tbluser.UserID} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography>{tbluser.UserID}</Typography>
                    <Typography variant='caption'>{tbluser.designation}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{tbluser.FirstName}</TableCell>
                <TableCell>{tbluser.LastName}</TableCell>
                <TableCell>{tbluser.Email}</TableCell>
                <TableCell>
                  <Chip
                    label={tbluser.SubscriptionType}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable