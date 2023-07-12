import { mangaDex } from "../../../../api/mfa";

export const get = async ({ params }) => {
  const { query } = params;
  const MFA = await mangaDex();
  if(!MFA){
    return {
        body: JSON.stringify({
            error: true
        })
    }
  }
  let mangas = await MFA.Manga.search({
    title: query,
    contentRating: ["safe", "suggestive", "erotica"],
    order: {
      relevance: "desc",
    },
    
  }, true);
  for (const key in mangas) {
    mangas[key].mainCover = await mangas[key].mainCover.resolve()
  }
  return {
    body: JSON.stringify({
      mangas
    }),
  };
};
