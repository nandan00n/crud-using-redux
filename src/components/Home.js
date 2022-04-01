import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { loadUsers, deleteUser } from '../actions/Action';
import { Button, ButtonGroup, TableBody } from '@mui/material';
import { useHistory } from 'react-router-dom';
import './home.css'
import { Route } from 'react-router-dom';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const useStyles = makeStyles({
  table: {
    minwidth: 500,
  }
})

const useButtonStyle = makeStyles((theme)=>({
  root:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    '& > *': {
      margin: theme.spacing(1),
    },
    },
  }));




export default function Home() {
  const classes = useStyles();
  const buttonStyles = useButtonStyle();
  const history = useHistory();

  let dispatch = useDispatch();
  const { users } = useSelector(state => state.data)

  useEffect(() => {
    dispatch(loadUsers())
  }, []);

  const handleDelete=(id)=>{
    if(window.confirm("Are you sure you want to delete the user ?")) {
      dispatch(deleteUser(id));
    }
  }


  const change=(id1)=>{
    console.log(id1)
    history.push(`/edituser/${id1}`)
  } 

  return (
    <>
    <div className={buttonStyles.root}> 
        <Button variant="contained" color="success" onClick={()=> history.push("/adduser")}>
          Add New User
        </Button>
    </div>

      <h1>Employee List</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {/* <StyledTableCell>Employee List</StyledTableCell> */}
              {/* <StyledTableCell align="right">Sl.no</StyledTableCell>  */}
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Age</StyledTableCell>
              <StyledTableCell align="center">DOB</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Designation</StyledTableCell>
              <StyledTableCell align="center">Salary</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {user.id}
                </StyledTableCell>
                <StyledTableCell align="center">{user.Name}</StyledTableCell>
                <StyledTableCell align="center">{user.Age}</StyledTableCell>
                <StyledTableCell align="center">{user.DOB}</StyledTableCell>
                <StyledTableCell align="center">{user.Email}</StyledTableCell>
                <StyledTableCell align="center">{user.Designation}</StyledTableCell>
                <StyledTableCell align="center">{user.Salary}</StyledTableCell>
            <div className={buttonStyles.root}>
            <ButtonGroup variant="contained" aria-label="outlined button group">
              <Button color="primary" onClick={() =>change(user.id)}>Edit</Button>
              <Button color="error" 
              onClick={()=> handleDelete(user.id)}>Delete</Button>
            </ButtonGroup>
            </div>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </>
  )
}
