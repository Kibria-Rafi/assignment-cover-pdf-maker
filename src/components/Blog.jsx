import { key } from "localforage";
import { useEffect, useState } from "react";

const Blog = () => {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    fetch("blog.json")
      .then((response) => response.json())
      .then((data) => setBlog(data));
  }, []);
  console.log(blog);
  return (
    <div className="lg:mt-32 section flex flex-col items-center justify-center h-full ">
        <h1 className="text-center text-3xl font-semibold mb-10">Blogs:</h1>
        <div className="mr-0 ms-3 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1" id="blog">
      {blog.map((singleBlog) => (
        <div
          key={singleBlog.id}
        >
          <div className="mb-5 card h-72 w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              
              <p>{singleBlog.details}</p>
            </div>
            <figure>
              <img
                src={singleBlog.image}
                alt="Shoes"
              />
            </figure>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Blog;
