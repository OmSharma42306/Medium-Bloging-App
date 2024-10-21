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
  
  return {
    loading,
    blogs,
  };
};

export const useBlogbyid = ({ id }: any) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}api/v1/blog/${id.id}`, {
        // why id.id. because it is giving a id object.console it then you know !why i wrote it !
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((responce) => {
        
        setBlog(responce.data.blog);
        setLoading(false);
      });
  }, [id]);
  
  return {
    loading,
    blog,
  };
};
