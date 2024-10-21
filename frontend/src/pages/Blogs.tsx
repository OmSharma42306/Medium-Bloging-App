import { Appbar } from "../components/Appbar";
import { Blogcard } from "../components/Blogcard";
import { useBlogs } from "../hooks/index";
import { Blogskeleton } from "../components/Blogskeleton";
export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div className=" max-w-xl">
            <Blogskeleton />
            <Blogskeleton />
            <Blogskeleton />
            <Blogskeleton />
            <Blogskeleton />
            <Blogskeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className=" max-w-xl">
          {blogs.map((blog) => (
            <Blogcard
              id={blog.id}
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate={blog.published}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
