const Manga = (props) => {
  const { manga } = props;
  return (
    <a href={`/manga/${manga.id}`} className="aspect-[565/800] h-44" title={manga?.title}>
      <img
        src={manga.mainCover.image256}
        alt={manga.title}
        className="shadow-md rounded mt-2 aspect-[565/800] h-44"
        style={{backgroundImage: "url('https://i.pinimg.com/originals/17/6a/92/176a9226bf18f311c57547c133f3a493.gif')", backgroundPosition: "center"}}
      />
    </a>
  );
};

export default Manga;
