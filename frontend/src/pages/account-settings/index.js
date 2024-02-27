import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import TableContainer from '@mui/material/TableContainer';
import ChevronUp from 'mdi-material-ui/ChevronUp';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import Button from '@mui/material/Button';
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein };
};

const Row = ({ tbluser }) => {
  const [tbllesson, settbllesson] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLanguageID, setSelectedLanguageID] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/lessons/${tbluser.LanguageID}`, { withCredentials: true });
        settbllesson(response.data);
        console.log({ tbllesson });
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors gracefully, e.g., show an error message to the user
      }
    };

    fetchData();
  }, [tbluser.LanguageID]);

  const handleDelete = async () => {
    try {
      // Make a DELETE request to your server to delete the language
      await axios.delete(`http://localhost:3001/languages/${tbluser.LanguageID}`, { withCredentials: true });

      // If successful, you might want to update the UI accordingly, e.g., remove the row
      // For simplicity, you can reload the entire page or refresh the language data
      window.location.reload();
    } catch (error) {
      console.error('Error deleting language:', error);
      // Handle errors gracefully, e.g., show an error message to the user
    }
  };

  const handleDeleteLesson = async (lesson) => {
    try {
      // Make a DELETE request to your server to delete the lesson
      await axios.delete(`http://localhost:3001/lessons/${lesson.LessonID}`, { withCredentials: true });
  
      // If successful, you might want to update the UI accordingly, e.g., remove the row
      // For simplicity, you can reload the entire page or refresh the lesson data
      window.location.reload();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      // Handle errors gracefully, e.g., show an error message to the user
    }
  };
  

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleOpenForm = () => {
    console.log(tbluser.LanguageID)
    setIsFormVisible(true);
    setSelectedLanguageID(tbluser.LanguageID);

  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {tbluser.LanguageID}
        </TableCell>
        <TableCell align='right'>{tbluser.LanguageName}</TableCell>
        <TableCell align='right'>{tbluser.DifficultyLevel}</TableCell>
        <TableCell align='right'><Button color="error" variant="outlined" onClick={handleDelete}>Delete</Button> 
         <Button color="primary" variant="outlined" onClick={handleOpenForm}>Add Lesson</Button>
         {isFormVisible && <FormOverlay onClose={handleCloseForm} selectedLanguageID={selectedLanguageID} />}
</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Lessons
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Content</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tbllesson.map((lesson) => (
                    <TableRow key={lesson.LessonID}>
                      <TableCell component='th' scope='row'>
                        {lesson.LessonName}
                      </TableCell>
                      <TableCell>{lesson.LessonContent}</TableCell>
                      <TableCell align='right'><Button color="error" variant="outlined" onClick={() => handleDeleteLesson(lesson)}>Delete</Button>
 </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};



const FormLayoutsBasic = ({ onClose, selectedLanguageID }) => {
  // ** States

  const [formData, setFormData] = useState({
    languageName: '',
    difficultyLevel: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend endpoint
      const response = await axios.post('http://localhost:3001/createLanguage/', formData);

     console.log(response.data);
     console.log(formData.difficultyLevel)

      // Reset the form after successful submission
      setFormData({
        languageName: '',
        difficultyLevel: '',
      });
      window.location.reload();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
      zIndex: 9999,
      }}
  >
    <Card>
  <CardHeader title='Add a Language' titleTypographyProps={{ variant: 'h6' }} />
  <CardContent>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TextField fullWidth label='Language' placeholder='English' value={formData.languageName} onChange={handleChange} name="languageName" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Difficulty Level'
            placeholder='5'
            helperText='From 1-5'
            value={formData.difficultyLevel}
            onChange={handleChange}
            name="difficultyLevel"
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              gap: 5,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button type="submit" variant="contained" size="large">
              Add!
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  </CardContent>
</Card>
</div>
  )
}

const FormOverlay = ({ onClose, selectedLanguageID }) => {
  const [formData, setFormData] = useState({
    languageID: selectedLanguageID,
    lessonName: '',
    lessonContent: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  

  const handleSubmit = async (e) => {
    console.log(selectedLanguageID);
    e.preventDefault();

    try {
      // Send a POST request to your backend endpoint
      const response = await axios.post(`http://localhost:3001/createLesson`, formData);

     console.log(response.data);

      // Reset the form after successful submission
      setFormData({
        languageID: selectedLanguageID,
        lessonName: '',
        lessonContent: '',
      });
      window.location.reload();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    onClose();
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        zIndex: 9999,
        }}
    >
      <Card>
  <CardHeader title='Add a Lesson' titleTypographyProps={{ variant: 'h6' }} />
  <CardContent>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TextField fullWidth label='Lesson Name' placeholder='English' value={formData.lessonName} onChange={handleChange} name="lessonName" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Lesson Content'
            placeholder='5'
            helperText='From 1-5'
            value={formData.lessonContent}
            onChange={handleChange}
            name="lessonContent"
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              gap: 5,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button type="submit" variant="contained" size="large">
              Add!
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  </CardContent>
</Card>

    </div>
  );
};


const TableCollapsible = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [tbluser, settbluser] = useState([]);

  const handleOpenForm = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/languages', { withCredentials: true });
        settbluser(response.data);
        console.log({ tbluser });
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors gracefully, e.g., show an error message to the user
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Button color="primary" variant="outlined" onClick={handleOpenForm}>
          Add Lesson
        </Button>
        {isFormVisible && <FormLayoutsBasic onClose={handleCloseForm} />}
      </div>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell align='right'>Language</TableCell>
              <TableCell align='right'>Difficulty Level</TableCell>
              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tbluser.map((user) => (
              <Row key={user.LanguageID} tbluser={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableCollapsible;
