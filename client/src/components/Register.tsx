import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { UserContext } from "../contexts/UserContext";
import CustomerInfo from './CustomerInfo';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: "3rem",
    paddingBottom: "5rem",
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function Register() {
  const classes = useStyles();

  const [hasErrorInForm, setHasErrorInForm] = useState(true);

  const { registerUser, customer } = useContext(UserContext);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={e => e.preventDefault()}>
          

          <CustomerInfo onErrorChange={setHasErrorInForm}/>
          <Button
            onClick={ async () => await registerUser(customer)}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={hasErrorInForm}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
}
