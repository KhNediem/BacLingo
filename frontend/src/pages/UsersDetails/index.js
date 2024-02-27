// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'  // Import Checkbox
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import axios from "axios";

// ** React Imports

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import CardContent from '@mui/material/CardContent'

const CardNavigation = ({ selectedId, onClose }) => {
  const [value, setValue] = useState('1');
  const [selectedUserData, setSelectedUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (selectedId) {
          const response = await axios.get(`http://localhost:3001/user/${selectedId}`);
          setSelectedUserData(response.data);
          console.log('User data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [selectedId]);

  console.log('Selected user data:', selectedUserData);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        zIndex: 99999,
      }}
    >
      <Card>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='card navigation example'>
            <Tab value='1' label='User Details' />
            {/* Add more tabs if needed */}
          </TabList>
          <CardContent>
            <TabPanel value='1' sx={{ p: 0 }}>
              {selectedUserData ? (
                <>
                  <Typography variant='h6' sx={{ marginBottom: 2 }}>
                    User Information
                  </Typography>
                  <Typography variant='body2' sx={{ marginBottom: 4 }}>
                    <strong>User ID:</strong> {selectedUserData.UserID}
                    <br />
                    <strong>First Name:</strong> {selectedUserData.FirstName}
                    <br />
                    <strong>Last Name:</strong> {selectedUserData.LastName}
                    <br />
                    {/* Add more attributes as needed */}
                  </Typography>
                </>
              ) : (
                <Typography variant='body2'>Loading user data...</Typography>
              )}
            </TabPanel>
            {/* Add more TabPanels for additional information */}
          </CardContent>
        </TabContext>
      </Card>
    </div>
  );
};
const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const DashboardTable = () => {
  const [checkedRows, setCheckedRows] = useState([]);  // State to track checked rows
  const [selectedUser, setSelectedUser] = useState(null); 

  const [tbluser, settbluser] = useState([]); // Initialize as an array

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

  // Handle checkbox toggle

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleOpenForm = (userID) => {
    setIsFormVisible(true);
    setSelectedUser(userID);
  };
  

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const [selected, setSelected] = useState([]);

  const handleCheckboxToggle = (userID) => {
    if (checkedRows.includes(userID)) {
      setCheckedRows(checkedRows.filter(id => id !== userID));
      setSelected(selected.filter(id => id !== userID)); // Remove from selected
    } else {
      setCheckedRows([...checkedRows, userID]);
      setSelected([...selected, userID]); // Add to selected
    }
  };

  const handleDeleteSelected = () => {
    const selectedIds = selected.map((productId) => productId);
  
    // Use Promise.all to wait for all delete requests to complete
    const deleteRequests = selectedIds.map((id) =>
      axios.delete(`http://localhost:3001/user/${id}`)
    );
    window.location.reload();
  
    Promise.all(deleteRequests)
      .then((responses) => {
        // Handle success or update UI accordingly
        responses.forEach((response) => {
          console.log(response.data);
        });
      })
      .catch((error) => {
        console.error('Error deleting products:', error);
        // Handle error or update UI accordingly
      });
  };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Button variant="contained" color="error" onClick={handleDeleteSelected}>
          Disable
        </Button>
      </div>
      <Card>
        {isFormVisible && <CardNavigation selectedId={selectedUser} onClose={handleCloseForm} />}
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            {/* ... (TableHead and other table-related code) */}
            <TableBody>
              {tbluser.map(tbluser => (
                <TableRow 
                  hover 
                  key={tbluser.UserID} 
                  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                >
                  <TableCell>
                    <Checkbox
                      checked={checkedRows.includes(tbluser.UserID)}
                      onChange={() => handleCheckboxToggle(tbluser.UserID)}
                    />
                  </TableCell>
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
                  <TableCell>
                    <Button color="primary" variant="outlined" onClick={() => handleOpenForm(tbluser.UserID)}>
                      View
                    </Button>
                    {isFormVisible && <CardNavigation selectedId={selectedUser} onClose={handleCloseForm} />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}

export default DashboardTable;

