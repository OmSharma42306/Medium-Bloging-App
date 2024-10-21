import { Blog } from "../hooks/index"; // importing interface.
import { Appbar } from "./Appbar";
import { Avatar } from "./Blogcard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div className="col-span-8">
            {/* Set a maximum width and enable text wrapping */}
            <div className="text-5xl font-extrabold max-w-full break-words">
              {blog.title}
            </div>
            {/* <div className="text-slate-500 pt-2">Post on 2nd December 2023</div> */}
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>

            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar authorName={blog.author.name} />
                <div></div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div>
                  Random catch phrase about the author's ability to grab the
                  user's attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
