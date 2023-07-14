'use client'
import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@/components/MaterialComponents";
import NavBar from "@/components/NavBar";
import api from "@/api";
import { useRouter } from 'next/router';


const Blog = () => {
  const router = useRouter();
  const { id } = router.query;

  const [blog,setBlog] = useState('')

  useEffect(() => {
    if(id)
    api
    .get(`/blog/${id}`)
    .then((result) => {
      setBlog(result.data);
    })
    .catch((error) => {
      console.log("error while trying to add blog", error);
    });
  },[id]);

  
  return (
    <div>
    <NavBar/>
    <Grid container spacing={2} mt={8}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {blog.title}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              {blog.subtitle}
            </Typography>
            <Typography variant="body1">{blog.content}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    </div>
  );
};

export default Blog;
