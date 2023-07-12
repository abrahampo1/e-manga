import { mangaDex } from "../../../../../../api/mfa";

export const post = async ({ params, request }) => {
  const { id, language, order } = params;
  const body = await request.json()
  const MFA = await mangaDex(body);
  if(!MFA){
    return {
        body: JSON.stringify({
            error: true
        })
    }
  }
  let feed = await MFA.Manga.getFeed(id, {
    limit: 10,
    order: {
      chapter: order,
    },
    translatedLanguage: [language],
  });
  

  return {
    body: JSON.stringify({
      feed,
    }),
  };
};
