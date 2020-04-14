import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../Logo';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [userName, setUserName] = React.useState();
  const [password, setPassword] = React.useState();

  const onSubmit = () => setFormState(formStates[0]);

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
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            defaultValue={userName}
            autoFocus
            onChange={({ target: { value } }) => setUserName(value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='password'
            label='Password'
            name='password'
            autoComplete='password'
            defaultValue={password}
            autoFocus
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            onClick={onSubmit}
            className={classes.submit}>
            Submit
          </Button>
        </form>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
