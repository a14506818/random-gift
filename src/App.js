import React from "react";
import { useState, useEffect } from "react";
import { storage, database } from "./firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import { ref as DBref, set, push, onValue, remove } from "firebase/database";
import { v4 } from "uuid";
import emailjs from "emailjs-com";

function App() {
  const [email, setEmail] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [users, setUsers] = useState([]);
  const maxUsers = 8;

  const uploadData = (e) => {
    e.preventDefault();

    if (email == "") {
      alert("Enter your Email!!");
      return;
    }
    if (imgFile == null) {
      alert("Choose an Image!!");
      return;
    }
    if (users.length == maxUsers) {
      alert("No more user!!");
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
            window.location.reload();
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

    // delete old data
    const deleteRef = DBref(database, "sendList/");
    remove(deleteRef);

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

      sendEmail(user.email, randomURL);
    });
    alert("Email sended successfully!");
  };

  const sendEmail = (toMail, URL) => {
    const templateParams = {
      TO_MAIL: toMail,
      message: URL,
    };

    emailjs
      .send(
        "service_6r7g7ym", // Replace with your EmailJS service ID
        "template_2gabzlg", // Replace with your EmailJS template ID
        templateParams,
        "CSmDJXkW8dqI8aOFR"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const resetAllData = () => {
    const deleteRef = DBref(database, "sendList/");
    remove(deleteRef).then(() => {
      const usersRef = DBref(database, "users/");
      remove(usersRef).then(() => {
        alert("Reset success");
      });
    });
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
      <h1>2024 Farm73 最大的聖誕交換禮物抽獎平台 上線咯！</h1>
      <form onSubmit={uploadData}>
        <h4>Email:</h4>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <h4>Image:</h4>
        <input
          type="file"
          onChange={(e) => {
            setImgFile(e.target.files[0]);
          }}
        ></input>
        <h4>Upload to DB:</h4>
        <button type="submit">Submit</button>
      </form>
      <h4>
        Uploaded Users ({users.length} / {maxUsers})
      </h4>
      <button onClick={randomGifts}>Run Random Gifts & Send Email</button>
      <br></br>
      <button onClick={resetAllData}>Reset</button>
    </div>
  );
}

export default App;
