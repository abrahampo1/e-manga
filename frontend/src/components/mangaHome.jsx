import { useEffect, useState } from "react";
import Loading from "./loading";
import Chapter from "../components/chapter";
import db from "../api/db";

const MangaHome = ({ id }) => {
  const [lang, setLanguaje] = useState("en");
  const [ord, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [chapterLoading, setChapterLoading] = useState(false);
  const [local, setLocal] = useState(false);
  const [manga, setManga] = useState({});
  const [feed, setFeed] = useState([]);

  const addToLibrary = async () => {
    setLoading(true);
    db.data.library[id] = manga;
    await db.write();
    setLocal(true);
    setLoading(false);
  };

  const removeFromLibrary = async () => {
    setLoading(true);
    delete db.data.library[id];
    await db.write();
    setLocal(false);
    setLoading(false);
  };

  useEffect(() => {
    const p = async () => {
      setLoading(true);
      await db.read();
      const localDb = db.data?.library?.[id];
      if (localDb) {
        setManga(localDb);
        setLoading(false);
        setLocal(true);
        return;
      }
      const r = await fetch("/api/manga/" + id + ".json", {
        method: "POST",
      });
      const json = await r.json();
      setManga(json.manga);
      setLoading(false);
    };
    p();
  }, []);

  useEffect(() => {
    const loadFeed = async () => {
      setChapterLoading(true);

      const f = await fetch(
        "/api/manga/chapters/" + id + "/" + lang + "/" + ord + ".json",
        {
          method: "POST",
          body: JSON.stringify(db.data.mangadex),
        }
      );
      const fjson = await f.json();
      setFeed(fjson.feed);
      setChapterLoading(false);
    };
    loadFeed();
  }, [ord, lang]);
  return (
    <>
      <Loading loading={loading} />
      <Loading loading={chapterLoading} />
      {loading ? (
        ""
      ) : (
        <>
          <div className="h-40 w-full overflow-hidden flex items-center relative">
            <div className="absolute z-20 top-3 left-32 rounded-md backdrop-blur-md p-1 overflow-hidden whitespace-nowrap shadow-md bg-white bg-opacity-50">
              <h1 className="text-4xl font-semibold overflow-hidden max-w-xs text-ellipsis sm:max-w-xs md:max-w-md lg:max-w-xl xl:max-w-4xl">
                {manga?.localizedTitle?.en}
              </h1>
              <p className="text-gray-600 overflow-hidden text-ellipsis">
                {manga?.authors?.name}
              </p>
            </div>
            <div className="absolute right-2 top-2 z-20">
              <button
                onClick={addToLibrary}
                className={`p-2 bg-emerald-400 rounded-md ${
                  local ? "hidden" : ""
                }`}
              >
                Add to my library
              </button>
              <button
                onClick={removeFromLibrary}
                className={`p-2  bg-red-400 rounded-md ${
                  local ? "" : "hidden"
                }`}
              >
                Remove from library
              </button>
            </div>
            <img
              src={manga?.mainCover?.image256}
              className="w-24 aspect-[500:800] absolute z-10 left-5"
            />
            <img
              src={manga?.mainCover?.image256}
              className="aspect-[500:800] w-full blur-sm"
            />
          </div>
          <h1 className="text-4xl font-semibold mt-4">Chapters</h1>
          <div className="mt-2 flex space-x-2">
            <select
              value={lang}
              onChange={(e) => setLanguaje(e.target.value)}
              className="p-1 shadow-sm rounded-md"
              id="languageSelector"
            >
              {manga?.availableTranslatedLanguages?.map((lang, key) => (
                <option key={key} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <select
              value={ord}
              onChange={(e) => setOrder(e.target.value)}
              className="p-1 shadow-sm rounded-md"
              id="orderSelector"
            >
              <option value="asc">Newer</option>
              <option value="desc">Older</option>
            </select>
          </div>
          <div>
            {loading == false &&
              feed?.map((chapter, i) => <Chapter chapter={chapter} key={i} />)}
          </div>
        </>
      )}
    </>
  );
};

export default MangaHome;
