import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import './adduser.css';
import { addUser } from '../actions/Action';
import { useHistory } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

const useStyles = makeStyles({
    textfield: {
        border: '1px solid white',
    }
})

export default function Adduser() {
    const classes = useStyles();
    const [state, setState] = useState({ id: '', Name: '', Age: '', DOB: '', Email: '', Designation: '', Salary: '', });

    const [error, setError] = useState("")

    const [value, setValue] = React.useState(new Date(''));

    const history = useHistory()
    const dispatch = useDispatch();

    const { id, Name, Age, Email, DOB, Designation, Salary } = state;

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!Name || !id || !Age || !DOB || !Email || !Designation || !Salary) {
            setError('Please fill all the input field')
        } else {
            dispatch(addUser(state));
            history.push("/");
            setError("");
        }
    };

    return (
        <>
            {error && <h3 styles={{ color: 'red' }}>{error}</h3>}
            <div className='form'>
                <Grid>
                    <Paper elevation={10} className='paper'>
                        <Box className='box'
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 3, width: '25ch', color: 'white' },
                                textfield: {
                                    border: '1px solid white',
                                }
                            }}

                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <TextField id="outlined-basic" onChange={handleInputChange} name="id" label="ID" variant="outlined" value={id} type="text" color="secondary" className={classes.textfield} />
                            <TextField id="outlined-basic" onChange={handleInputChange} name='Name' label="Name" variant="outlined" value={Name} type='text' color='warning' className={classes.textfield} />
                            <TextField id="outlined-basic" onChange={handleInputChange} name='Age' label="Age" variant="outlined" value={Age} type='number' color='secondary' className={classes.textfield} />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Date desktop"
                                    type='Date'
                                    inputFormat="MM/dd/yyyy"
                                    name='DOB'
                                    value={DOB}
                                    onChange={Date => handleInputChange({ target: { value: Date.toLocaleDateString("en-US"), name: 'DOB' } })}
                                    // onChange={Date => console.log(Date.toLocaleDateString("en-US"))}
                                    renderInput={(params) => <TextField {...params} color="primary" />}
                                />
                            </LocalizationProvider>
                            <TextField id="outlined-basic" onChange={handleInputChange} name='Email' label="Email" variant="outlined" type="text" value={Email} />
                            <TextField id="outlined-basic" onChange={handleInputChange} name='Designation' label="Designation" variant="outlined" type='text' value={Designation} />
                            <TextField id="outlined-basic" onChange={handleInputChange} name='Salary' label="Salary" variant="outlined" type='number' value={Salary} />
                            <Button variant="contained" color="secondary" type='submit' >
                                Submit
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </div>
        </>

    )
}
