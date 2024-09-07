import React from "react";
import { useState, useEffect } from "react";
import { storage, database } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as DBref, set, push, onValue } from "firebase/database";
import { v4 } from "uuid";

function App() {
  const [email, setEmail] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [users, setUsers] = useState([]);
  const maxUsers = 8;

  const uploadData = () => {
    if (email == "") {
      alert("Enter your Email!!");
      return;
    }
    if (imgFile == null) {
      alert("Choose an Image!!");
      return;
    }

    const imgRef = ref(storage, `images/${v4()}`);
    uploadBytes(imgRef, imgFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const usersRef = DBref(database, "users/");
        const newUserRef = push(usersRef);
        set(newUserRef, {
          email: email,
          URL: url,
        })
          .then(() => {
            alert("Data saved successfully!");
          })
          .catch((error) => {
            alert("Error saving data:", error);
          });
        console.log(url);
      });
      console.log("Image Uploaded!");
    });
  };

  const randomGifts = () => {
    // if (users.length != maxUsers) {
    //   alert("Wait for all Users to upload!!");
    //   return;
    // }

    var URLList = [];
    users.forEach((user) => {
      URLList = [...URLList, user.URL];
    });
    console.log(URLList);

    users.forEach((user) => {
      const sendListRef = DBref(database, "sendList/");
      const newSendListRef = push(sendListRef);
      var randomIndex = 0;
      var randomURL = user.URL;
      while (randomURL == user.URL) {
        randomIndex = Math.floor(Math.random() * URLList.length);
        randomURL = URLList[randomIndex];
      }
      URLList.splice(randomIndex, 1);

      set(newSendListRef, {
        email: user.email,
        sendURL: randomURL,
      });
    });
    alert("SendList saved successfully!");
  };

  useEffect(() => {
    const usersRef = DBref(database, "users/");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const usersList = Object.entries(data).map(([id, user]) => ({
          id,
          ...user,
        }));
        setUsers(usersList);
      } else {
        setUsers([]); // Clear if no data
        console.log("No data available");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log(users);
    console.log(users.length);
  }, [users]);

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <input
        type="file"
        onChange={(e) => {
          setImgFile(e.target.files[0]);
        }}
      ></input>
      <button onClick={uploadData}>Upload to DB</button>
      <h4>
        Uploaded Users ({users.length} / {maxUsers})
      </h4>
      <button onClick={randomGifts}>Run Random Gifts</button>
    </div>
  );
}

export default App;
