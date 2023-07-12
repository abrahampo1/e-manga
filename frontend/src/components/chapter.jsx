const Chapter = ({ chapter }) => {
  let flag = chapter.translatedLanguage;
  if (flag == "en") flag = "gb"
  if (flag == "uk") flag = "gb"
  if (flag == "pt-br") flag = "pt"
  return (
    <>
      <div className="shadow-sm w-full pr-2 h-10 flex justify-between items-center space-x-2 pl-2 rounded mt-1 mb-1">
        <div className="flex space-x-2 items-center">
          <input type="checkbox" />
          <p>Chapter {chapter?.chapter}</p>
          <p>{chapter?.title ? " - " + chapter?.title : ""}</p>
          <p className="text-gray-500">{chapter?.group?.name}</p>
        </div>
        <div className="flex space-x-2 items-center">
          <p className="text-gray-500">{chapter?.pages} Pages</p>
          <img
            className="h-5 aspect-square"
            src={`https://mangadex.org/img/flags/${flag}.svg`}
          />
        </div>
      </div>
    </>
  );
};


export default Chapter