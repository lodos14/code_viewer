function CodeTitle({ title, date, clicked_title, onClickTitle }) {
  const title_date = [title, date]
  return (
    <li style = {{background: clicked_title === title ? "rgb(183,186,175)" : "#363d49"}}>
      {title_date.map(data => 
        <button
        type="button"
        value={title}
        onClick={onClickTitle}
        style={{
          background: clicked_title === title ? "rgb(183,186,175)" : "#363d49",
          color : clicked_title === title ? "#363d49":"#d5d9e2",
        }}
      >
        {data}
      </button>)}
    </li>
  );
}

export default CodeTitle;
