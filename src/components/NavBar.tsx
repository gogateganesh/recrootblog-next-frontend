import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from "../components/MaterialComponents";
import { useEffect, useState } from "react";

export default function NavBar() {
  const router = useRouter();
  const [flag,setFlags] = useState(false)
  useEffect(()=>{
    if(sessionStorage.getItem("authToken"))
    setFlags(true)
  },[flag])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog
          </Typography>
          {flag ? (
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                sessionStorage.removeItem("authToken");
                router.push("/");
              }}
            >
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
