import react, { useEffect, useState } from "react";
import Loading from "./loading.jsx";
import Manga from "./manga.jsx";

const MangaSearch = ({ query }) => {
  const [loading, setLoading] = useState(true);
  const [mangas, setMangas] = useState([]);
  useEffect(() => {
    p();
  }, []);
  const p = async () => {
    const r = await fetch("/api/manga/search/" + query + ".json");
    setLoading(false);
    const json = await r.json();
    setMangas(json.mangas);
    setLoading(false);
  };
  return (
    <>
      <Loading loading={loading} />
      <div className="flex-wrap mt-2  grid gap-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 grid-cols-4">
        {mangas?.map((manga, i) => (
          <Manga key={i} manga={manga} />
        ))}
      </div>
    </>
  );
};

export default MangaSearch;
