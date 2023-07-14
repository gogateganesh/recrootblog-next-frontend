'use client'
import {
    Button,
    TextField,
    Grid,
    Paper,
    Typography
  } from "@/components/MaterialComponents";

import api from "@/api";
import { cookies } from "next/dist/client/components/headers";
import { useRouter } from 'next/navigation'
import { useState } from "react";

export default function LoginPage(){
  const router = useRouter()
  const [email,setEmail] = useState('')
  function handleEmailState(event:any){
    setEmail(event?.target.value)
  }

  const [password,setPassword] = useState('')
  function handlePasswordState(event:any){
    setPassword(event?.target.value)
  }

  function Login() {    
    api.post('/login', {
      email,
      password
    }).then((result)=>{
      console.log(result,'result');
      sessionStorage.setItem('authToken', result.data.token);
      router.push('/blogs')
    }).catch((error)=>{
      console.log('Error while logging in',error);
    })
  }

    return(
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} style={{ padding: '2rem' }}>
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>
            <form onSubmit={Login}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    value={email}
                    onChange={handleEmailState}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    required
                    value={password}
                    onChange={handlePasswordState}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    type="reset"
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    )
}