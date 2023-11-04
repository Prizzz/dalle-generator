import React, { useState, useEffect } from "react";
import { Loader, FormField, RenderCards } from "../components";
import { Post } from "@/typings";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState<Post[] | undefined>();
  const [searchedResults, setSearchedResults] = useState<Post[] | undefined>();
  const [searchText, setSeatchText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch("https://dall-e-generator-ehsz.onrender.com/api/v1/post");
        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeatchText(e.target.value);

    const searchResults = allPosts?.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.prompt.toLowerCase().includes(searchText.toLowerCase())
    );

    setSearchedResults(searchResults);
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">The Community Showcase</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Browse through a collection of imaginative and visaully stunning images generated by
          DALL-E AI
        </p>
      </div>

      <div className="mt-10">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={searchedResults} title="No search results found" />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
