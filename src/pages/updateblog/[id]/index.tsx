"use client";
import React, { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@/components/MaterialComponents";
import NavBar from "@/components/NavBar";
import api from "@/api";
import { useRouter } from "next/router";


const UpdateBlog = () => {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    if(id)
    api.get(`/blog/${id}`).then((result)=>{
      setTitle(result.data.title);
      setContent(result.data.content);
      setLoading(false);
    })
  },[loading,id])

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform your blog update logic here
    api.put(`/user/updateBlog/${id}`,{
      title,content
    },{
      headers:{
        'auth-token':sessionStorage.getItem('authToken')
      }
    }).then((result)=>{
      console.log(result.data);
      setTitle(result.data.title)
      setContent(result.data.content)
    }).catch((error) => {
      console.log('error while trying to add blog', error);     
    })
    // Reset the form
    setTitle("");
    setContent("");
  };

  function clear() {
    setTitle("");
    setContent("");
  }

  useEffect(()=>{
    if(!sessionStorage.getItem('authToken'))
    router.push('/')
  })

  return (
    <div>
      <NavBar />
      <Grid container spacing={2} mt={8}>
        <Grid item xs={8} mx={5}>{}
          <form onSubmit={handleSubmit} onReset={clear}>
            <Grid mt={4}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={handleTitleChange}
              />
            </Grid>
            <Grid mt={4}>
              <TextField
                label="Content"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={content}
                onChange={handleContentChange}
              />
            </Grid>
            <Grid item mt={4} xs={12} justifyItems={"center"}>
              <Button variant="contained" color="primary" type="submit">
                Update Blog
              </Button>
              <Button variant="outlined" color="warning" type="reset">
                Clear
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdateBlog;
