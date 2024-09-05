import React from "react";
import { useState, useEffect } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function App() {
  const [email, setEmail] = useState("");
  const [imgList, setImgList] = useState([]);
  const [imgFile, setImgFile] = useState(null);
  const uploadData = () => {
    if (imgFile == null) return;
    const imgRef = ref(storage, `images/${email + v4()}`);
    uploadBytes(imgRef, imgFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {});
      alert("Image Uploaded!");
    });
  };

  useEffect(() => {
    listAll(ref(storage, "images/")).then((resp) => {
      resp.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImgList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

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
      <button onClick={uploadData}>Upload</button>
      {imgList.map((url) => {
        return <img src={url} />;
      })}
    </div>
  );
}

export default App;
