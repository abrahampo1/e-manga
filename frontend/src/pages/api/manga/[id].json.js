import { mangaDex } from "../../../api/mfa";

export const get = async ({ params }) => {
  const { id } = params;
  const MFA = await mangaDex();
  if (!MFA) {
    return {
      body: JSON.stringify({
        error: true,
      }),
    };
  }
  let manga = await MFA.Manga.get(id, true);
  manga.authors = await manga.authors[0].resolve();
  manga.mainCover = await manga.mainCover.resolve();

  return {
    body: JSON.stringify({
      manga,
    }),
  };
};
