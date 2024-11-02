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
import { FaGift, FaUpload, FaRedo } from "react-icons/fa";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  useToast,
  Progress,
  VStack,
} from "@chakra-ui/react";

function App() {
  const [email, setEmail] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [users, setUsers] = useState([]);
  const maxUsers = 7;

  const uploadData = (e) => {
    e.preventDefault();
    const confirm = window.confirm("Are you sure you want to Upload data?");
    if (!confirm) return;

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
    if (users.map((user) => user.email).includes(email)) {
      alert("This Email have Inserted!!");
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

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const randomGifts = async () => {
    const confirm = window.confirm("Are you sure you want to Send Email?");
    if (!confirm) return;

    if (users.length != maxUsers) {
      alert("Wait for all Users to upload!!");
      return;
    }

    // delete old data
    const deleteRef = DBref(database, "sendList/");
    remove(deleteRef);

    var URLList = [];
    users.forEach((user) => {
      URLList = [...URLList, user.URL];
    });
    console.log(URLList);

    for (const user of users) {
      const sendListRef = DBref(database, "sendList/");
      const newSendListRef = push(sendListRef);
      var randomIndex = 0;
      var randomURL = user.URL;
      while (randomURL == user.URL) {
        randomIndex = Math.floor(Math.random() * URLList.length);
        randomURL = URLList[randomIndex];
      }
      URLList.splice(randomIndex, 1);

      await set(newSendListRef, {
        email: user.email,
        sendURL: randomURL,
      });

      await sendEmail(user.email, randomURL);
      await delay(1000);
    }
    await alert("Email sended successfully!");
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
    const confirm = window.confirm("Are you sure you want to Reset all data?");
    if (!confirm) return;

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
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      bgGradient="linear(to-b, red.200, green.200, yellow.100)"
      padding={5}
    >
      <Box
        maxHeight="1000px"
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        alignItems="center"
      >
        <Heading
          as="h1"
          size="2xl"
          color="red.700"
          mb={8}
          fontWeight="bold"
          textAlign="center"
        >
          Christmas Gifts Exchange Platform
        </Heading>
        <VStack spacing={5} width="full" maxWidth="400px">
          <Box width="full">
            <Text fontSize="lg" color="green.700" mb={2}>
              Email:
            </Text>
            <Input
              placeholder="Enter your email"
              size="lg"
              variant="filled"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Box>
          <Box width="full">
            <Text fontSize="lg" color="green.700" mb={2}>
              Image:
            </Text>
            <Input
              type="file"
              size="lg"
              variant="filled"
              onChange={(e) => {
                setImgFile(e.target.files[0]);
              }}
            />
          </Box>
          <Button
            leftIcon={<FaUpload />}
            colorScheme="green"
            size="lg"
            width="full"
            onClick={uploadData}
          >
            Upload to DB
          </Button>

          <Heading size="md">
            Uploaded Users ({users.length} / {maxUsers})
          </Heading>

          <Box>
            {users.map((user, index) => (
              <p key={index}>{user.email}</p>
            ))}
          </Box>
          <Progress
            value={(users.length / maxUsers) * 100}
            size="md"
            colorScheme="green"
            width="full"
          />
          <Button
            leftIcon={<FaGift />}
            colorScheme="teal"
            size="lg"
            width="full"
            onClick={randomGifts}
          >
            Run Random Gifts & Send Email
          </Button>

          <br></br>
          <Button
            leftIcon={<FaRedo />}
            colorScheme="red"
            size="lg"
            width="full"
            onClick={resetAllData}
          >
            Reset
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}

export default App;
