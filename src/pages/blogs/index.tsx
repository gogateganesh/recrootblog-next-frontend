import React, { Component, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@/components/MaterialComponents";
import NavBar from "@/components/NavBar";
import api from "@/api";
import "@/app/globals.css";
import { useRouter } from "next/navigation";

export default function BlogsList() {
  const [blogs, setBlogs] = useState([]);
  // let logoutButton;
  // if (!localStorageValue) {
  //   logoutButton =
  //     <Button
  //       variant="contained"
  //       color="error"
  //       onClick={() => {
  //         localStorage.removeItem("authToken");
  //         router.push("/");
  //       }}
  //     >
  //       Logout
  //     </Button>
  // }

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading)
      api
        .get("/blogs")
        .then((result) => {
          setBlogs(result.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error while trying to add blog", error);
        });
  }, [loading]);

  const [flag, setFlags] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("authToken")) setFlags(true);
  }, [flag]);

  const deleteBlog = (_id) => {
    api
      .delete(`/user/deleteBlog/${_id}`, {
        headers: {
          "auth-token": sessionStorage.getItem("authToken"),
        },
      })
      .then((result) => {
        console.log(result.data, "data");
        setLoading(true);
      })
      .catch((error) => {
        console.log("error while trying to add blog", error);
      });
  };

  const updateBlog = (_id) =>{
    router.push(`/updateblog/${_id}`);
  }
  return (
    <div>
      <NavBar />
      <Grid container spacing={2} mt={8}>
        {blogs.map((blog) => (
          <Grid item xs={12} key={blog._id}>
            <Card className="blog-card">
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="title"
                  onClick={() => {
                    router.push(`/blog/${blog._id}`);
                  }}
                >
                  {blog.title}
                </Typography>
                <Typography variant="body1" className="truncate">
                  {blog.content}
                </Typography>
                <Grid>
                  {flag ? (
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={() => deleteBlog(blog._id)}
                    >
                      Delete
                    </Button>
                  ) : null}
                </Grid>
                <Grid>
                  {flag ? (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => updateBlog(blog._id)}
                    >
                      Update
                    </Button>
                  ) : null}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
