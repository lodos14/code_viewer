import { authService, dbService } from "../Fbase";
import { useEffect, useState } from "react";
import AppRouter from "./AppRouter";

function App() {
  const [isLogined, setisLogined] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);
  const [db_userObj, setdb_userObj] = useState(null);
  const [db_codeObj, setdb_codeObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setisLoaded(false);
        setisLogined(true);
      } else {
        setisLoaded(true);
        setisLogined(false);
      }
    });
  }, []);

  useEffect(() => {
    if (isLogined) {
      GetUserData();
      GetCodeData();
    }
  }, [isLogined]);

  const GetUserData = () => {
    dbService
      .ref("user")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setdb_userObj(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const GetCodeData = () => {
    dbService
      .ref("/")
      .child("code")
      .orderByChild("id")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setdb_codeObj(snapshot.val());
        } else {
          console.log("No data available");
        }
        setisLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {isLoaded ? (
        <AppRouter
          isLogined={isLogined}
          users={db_userObj}
          codes={db_codeObj}
        />
      ) : (
        <h1>Loding</h1>
      )}
    </div>
  );
}

export default App;
