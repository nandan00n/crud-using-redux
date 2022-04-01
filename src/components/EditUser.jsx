import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import './adduser.css'
import {getSingleUser, loadUsers} from '../actions/Action';
import {updateUser} from '../actions/Action' 
import { useHistory, useParams } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

const useStyles = makeStyles({
    textfield: {
        border: '1px solid white',
    }
})

export default function EditUser() {

    const classes = useStyles();

    // const [dec, setDec] = useState();
    const history = useHistory();
    const dispatch = useDispatch();

    const [State, setState] = useState();

    

    const [value, setValue] = React.useState(new Date(''));

    // const handleChange = (newValue) => {
    //     setValue(newValue);
    // };


    const user = useSelector((state) => {
        return state.data.user
    });

    const [error, setError] = useState("");
    const id1 = useParams();
    // console.log('id---', id1);
    useEffect(() => {
        dispatch(getSingleUser(id1));
    }, []);


    useEffect(() => {
        if (user) {
            setState(user[0])
        }
    }, [user])


    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...State, [name]: value })
    }

    const handleSubmit = (e) => {
        console.log('submit',id1,State)
            e.preventDefault();
            const {  Name, Age, Email, DOB, Designation, Salary } = State;
            // console.log('check',Name, Age, Email, DOB, Designation, Salary)
            if (!Name  || !Age || !DOB || !Email || !Designation || !Salary) {
                setError('Please fill all the input field')
            } else {
                dispatch(updateUser(State, id1));
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
                            {State &&
                                <>
                                    <TextField id="outlined-basic" disabled defaultValue={State.id} onChange={handleInputChange} name="id" label="ID" variant="outlined" type="text" className={classes.textfield} />
                                    <TextField id="outlined-basic" defaultValue={State.Name} onChange={handleInputChange} name='Name' label="Name" variant="outlined" type='text' className={classes.textfield} />
                                    <TextField id="outlined-basic" defaultValue={State.Age} onChange={handleInputChange} name='Age' label="Age" variant="outlined" type='number'  className={classes.textfield} />

                                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                                        <DesktopDatePicker 
                                            label={State.DOB}
                                            inputFormat="MM/dd/yyyy"
                                            value={value}
                                            name="DOB"
                                            type='Date'
                                            onChange={Date => handleInputChange({ target: { value: Date.toLocaleDateString("en-US"), name: 'DOB' } })}
                                            renderInput={(params) => {
                                                return (<TextField {...params} color="primary" />);
                                            }}
                                        />
                                    </LocalizationProvider>

                                    <TextField id="outlined-basic" defaultValue={State.Email} onChange={handleInputChange} name='Email' label="Email" variant="outlined" type="text" />
                                    <TextField id="outlined-basic" defaultValue={State.Designation} onChange={handleInputChange} name='Designation' label="Designation" variant="outlined" type='text' />
                                    <TextField id="outlined-basic" defaultValue={State.Salary} onChange={handleInputChange} name='Salary' label="Salary" variant="outlined" type='number' />

                                    <Button variant="contained" color="secondary" type='submit' >Update</Button>
                                </>
                            }
                        </Box>
                    </Paper>
                </Grid>
            </div>
        </>

    )
}
