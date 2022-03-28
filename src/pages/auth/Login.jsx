import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Divider } from 'material-ui'
import { useDispatch, useSelector } from 'react-redux'
import {
  signInWithEmailStart,
  signInWithGoogleStart,
} from '../../redux/user/user.action'
import LoadingButton from '@mui/lab/LoadingButton'

import { Link as NavLink } from 'react-router-dom'
import { Loading } from '../../redux/user/user.selector'

const theme = createTheme()

export default function SignIn() {
  const dispatch = useDispatch()
  const isLoading = useSelector(Loading)
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    dispatch(
      signInWithEmailStart({
        email: data.get('email'),
        password: data.get('password'),
      })
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <LoadingButton
              loading={isLoading}
              loadingPosition="start"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Divider />
            <div
              className="google"
              onClick={() => dispatch(signInWithGoogleStart())}
            >
              <img alt="" src="images/google.png" />
              Sign in With Google
            </div>
            <Grid container>
              <Grid item>
                <NavLink to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
