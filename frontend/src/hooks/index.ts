// Custom Hook

import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author: {
    name: string;
  };
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((responce) => {
        setBlogs(responce.data.allBlogs);
        setLoading(false);
      });
  }, []);
  console.log(blogs);
  return {
    loading,
    blogs,
  };
};

export const useBlogbyid = ({ id }: any) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  console.log(id);
  console.log("i am in useBlogbyid");
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}api/v1/blog/${id.id}`, {
        // why id.id. because it is giving a id object.console it then you know !why i wrote it !
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((responce) => {
        console.log(responce.data.blog);
        setBlog(responce.data.blog);
        setLoading(false);
      });
  }, [id]);
  console.log("Ganesh Sharma", blog);
  return {
    loading,
    blog,
  };
};
