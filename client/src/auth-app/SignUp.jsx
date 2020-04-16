import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://github.com/captainrdubb/'>
        Star Duv LLC.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  hover: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2, 1, 1, 1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [isMasked, setIsMasked] = React.useState(true);
  const [isValidEmail, setIsValidEmail] = React.useState();
  const [isValidPassword, setIsValidPassword] = React.useState();

  const validateEmail = (email) => {
    setIsValidEmail(!emailPattern.test(email));
  };

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/g.test(password);
    const hasLower = /[a-z]/g.test(password);
    const hasNumber = /\d/g.test(password);
    const hasSpecial = /\W/g.test(password);
    const hasSpace = /\s/g.test(password);
    setIsValidPassword(
      !(hasUpper && hasLower && hasNumber && hasSpecial && !hasSpace)
    );
  };
  // const onSubmit = () => {
  //   fetch('/signup', {
  //     method: 'POST',
  //     credentials: 'same-origin',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     redirect: 'follow',
  //   });
  // };

  return (
    <Grid container justify='center'>
      <Grid className={classes.paper} item md={4} xs={12}>
        <Logo />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} method='post' action='/signup'>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField                
                variant='outlined'
                required
                id='firstName'
                label='First Name'
                name='firstName'
                autoComplete='given-name'
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='family-name'
                fullWidth
                autoFocus
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                error={isValidEmail}
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                type='email'
                autoComplete='email'
                helperText={isValidEmail ? '' : 'Must contain valid email'}
                onChange={({ target: { value } }) => validateEmail(value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={isValidPassword}
                variant='outlined'
                type={isMasked ? 'password' : 'text'}
                required
                fullWidth
                id='password'
                label='Password'
                name='password'
                autoComplete='password'
                helperText='Password must be at least six characters long including an uppercase, lowercase, number, and special character'
                onChange={({ target: { value } }) => validatePassword(value)}
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      {isMasked ? (
                        <VisibilityIcon
                          className={classes.hover}
                          onClick={() => setIsMasked(!isMasked)}
                        />
                      ) : (
                        <VisibilityOffIcon
                          className={classes.hover}
                          onClick={() => setIsMasked(!isMasked)}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Sign Up
          </Button>
        </form>
        <Grid container justify='flex-end'>
          <Grid item>
            <Link to='/signin'>{'Already have an account? Sign in'}</Link>
          </Grid>
        </Grid>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
