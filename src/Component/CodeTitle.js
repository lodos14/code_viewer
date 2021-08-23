function CodeTitle({ title, date, clicked_title, onClickTitle }) {
  return (
    <ul style = {{background: clicked_title === title ? "rgb(183,186,175)" : "#363d49"}}>
      <button
        type="button"
        value={title}
        onClick={onClickTitle}
        style={{
          background: clicked_title === title ? "rgb(183,186,175)" : "#363d49",
          color : clicked_title === title ? "#363d49":"#d5d9e2",
        }}
      >
        {title}
      </button>
      <button
        type="button"
        value={title}
        onClick={onClickTitle}
        style={{
          background: clicked_title === title ? "rgb(183,186,175)" : "#363d49",
          color : clicked_title === title ? "#363d49":"#d5d9e2",
        }}
      >
        {date}
      </button>
    </ul>
  );
}

export default CodeTitle;
