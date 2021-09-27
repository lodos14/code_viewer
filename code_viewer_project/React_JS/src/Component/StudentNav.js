function StudentNav({ id, student, clicked_id, onClickStudent }) {
  return (
    <div className="nav-name">
      <ul>
        <li>
          <button
            type="button"
            value={id}
            onClick={onClickStudent}
            style={{
              backgroundColor:
                id === clicked_id ? "white" : "#283b5b",
              color : id === clicked_id ? "#283b5b" : "#7c95c3",
            }}
          >
            {student}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default StudentNav;
