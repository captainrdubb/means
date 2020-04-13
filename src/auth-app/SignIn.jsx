import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Zoom from '@material-ui/core/Zoom';
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

const formStates = [{ state: 'userName' }, { state: 'password' }];

const SignIn = () => {
  const classes = useStyles();
  const [userName, setUserName] = React.useState();
  const [password, setPassword] = React.useState();
  const [formState, setFormState] = React.useState(formStates[0]);

  const onNext = () => setFormState(formStates[1]);
  const onSubmit = () => setFormState(formStates[0]);

  return (
    <Grid container justify='center'>
      <Grid className={classes.paper} item md={4} xs={12}>
        <Logo />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        {formState.state === 'userName' && (
          <Zoom in={true}>
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
                autoFocus
                onChange={({ target: { value } }) => setUserName(value)}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                onClick={onNext}
                className={classes.submit}>
                Next
              </Button>
            </form>
          </Zoom>
        )}
        {formState.state === 'password' && (
          <Zoom in={true}>
            <form className={classes.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='password'
                label='Password'
                name='password'
                autoComplete='password'
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
          </Zoom>
        )}
        <Grid container justify='center'>
          {/* <Grid item xs>
              <Link href='#' variant='b'>
                Forgot password?
              </Link>
            </Grid> */}
          <Grid item>
            <Link href='/#/' variant='body2'>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignIn;
