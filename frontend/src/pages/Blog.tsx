import { useBlogbyid } from "../hooks";
import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  const id = useParams();
  const { loading, blog } = useBlogbyid({ id: id });
  if (loading || !blog) {
    return (
      <div>
        <div>
          <Appbar />
        </div>
        <div className="flex justify-center">
          <Spinner />
        </div>
      </div>
    );
  }
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};
