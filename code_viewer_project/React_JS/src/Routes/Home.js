import { useEffect, useState } from "react";
import { authService } from "../Fbase";
import StudentNav from "../Component/StudentNav";
import CodeTitle from "../Component/CodeTitle";
import CodeView from "../Component/CodeView";
import "./Home.css";

function Home({ users, codes }) {
  const [sorted_users_idArr, setsorted_users_idArr] = useState([]);
  const [sorted_codes_titleArr, setsorted_codes_titleArr] = useState([]);
  const [select_student_code_titleArr, setselect_student_code_titleArr] = useState([]);
  const [select_code_title_and_date, setselect_code_title_and_date] = useState("");
  const [select_code, setselect_code] = useState("");
  const [current_user_name, set_current_user_name] = useState("");
  const [clicked_name_button, setclicked_name_button] = useState(false);
  const [clicked_student_id, setclicked_student_id] = useState("");
  const [clicked_title, setclicked_title] = useState("");

  useEffect(() => {
    GetUsersAndCodes();
  }, []);

  const GetUsersAndCodes = () => {
    if (users) {
      SortUserId();
    }

    if (codes) {
      SortCodeTitle();
    }
  };

  const SortCodeTitle = () => {
    const db_codes_titleArr = Object.keys(codes);
    const code_title_idArr = db_codes_titleArr.map((title) => {
      return [title, codes[title]["id"]];
    });
    const sorted_codes_title_idArr = code_title_idArr.sort(function (a, b) {
      return a[1] < b[1] ? 1 : -1;
    });
    const sorted_codes_titleArr = sorted_codes_title_idArr.map((title_id) => {
      return title_id[0];
    });
    setsorted_codes_titleArr(sorted_codes_titleArr);
  };

  const SortUserId = () => {
    const current_user_email = authService.currentUser.email;
    const current_user_id = current_user_email.split("@")[0];
    const user_job = users[current_user_id]["job"];

    if (user_job === "I") {
      SortProcess("S", current_user_id);
    } else {
      SortProcess("I", current_user_id);
    }
  };

  const SortProcess = (job, current_user_id) => {
    const db_users_idArr = Object.keys(users);

    const users_idArr = db_users_idArr.filter((id) => {
      return users[id]["job"] === job;
    });
    const users_id_nameArr = users_idArr.map((id) => {
      return [id, users[id]["name"]];
    });
    const sorted_users_id_nameArr = users_id_nameArr.sort(function (a, b) {
      return a[1] < b[1] ? -1 : 1;
    });
    const sorted_users_idArr = [current_user_id];
    sorted_users_id_nameArr.map((id_name) => {
      sorted_users_idArr.push(id_name[0]);
      return 0;
    });

    setsorted_users_idArr(sorted_users_idArr);
    set_current_user_name(users[current_user_id]["name"]);
  };

  const onClickNameButton = () => {
    setclicked_name_button(!clicked_name_button);
  };
  const onClickStudent = (event) => {
    const { value } = event.target;
    const user_codeArr = sorted_codes_titleArr.filter((title) => {
      return codes[title]["user_id"] === value;
    });
    setselect_code("");
    setselect_code_title_and_date("");
    setclicked_title("")
    setclicked_student_id(value);
    setselect_student_code_titleArr(user_codeArr);
  };
  const onClickTitle = (event) => {
    const { value } = event.target;
    const code = codes[value]["text"];
    const title_and_date = [value, codes[value]["date"]];
    setclicked_title(value);
    setselect_code(code);
    setselect_code_title_and_date(title_and_date);
  };
  const onClickLogOut = () => {
    authService.signOut();
  };

  return (
    <div className="home-page">
      <header className="head-title">
        <h1>Code Viewer</h1>
        <button
        
          className="name-button"
          type="button"
          onClick={onClickNameButton}
        >
          {current_user_name}
        </button>
        {clicked_name_button && (
          <div className="logout-container">
            <button className="logout-button" onClick={onClickLogOut}>
              LogOut
            </button>
          </div>
        )}
      </header>
      <div className="under-container">
        <nav className="nav-container">
          {sorted_users_idArr.length !== 0 ? (
            sorted_users_idArr.map((user_id) => (
              <StudentNav
                id={user_id}
                student={users[user_id]["name"]}
                clicked_id={clicked_student_id}
                onClickStudent={onClickStudent}
              />
            ))
          ) : (
            <strong>No Student</strong>
          )}
        </nav>
        <aside className="aside-container">
          <ul>
            {select_student_code_titleArr.length !== 0 ? (
              select_student_code_titleArr.map((title) => (
                <CodeTitle
                  title={title}
                  date={codes[title]["date"]}
                  clicked_title = {clicked_title}
                  onClickTitle={onClickTitle}
                />
              ))
            ) : (
              <li className="no-code">No Code</li>
            )}
          </ul>
        </aside>
        <main className="main-container">
          <strong className="view-title">
            <h1>{select_code_title_and_date[0]}</h1>
            <h2>{select_code_title_and_date[1]}</h2>
          </strong>
          <div className="code-view">
            {select_code.split("\n").map((line) => (
              <CodeView line={line} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
