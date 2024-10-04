# 🎄 Farm73 聖誕交換禮物平台

[English Version](#-farm73-christmas-gift-exchange-platform)

此專案是一個使用 React 建立的網頁應用程式，讓用戶參與聖誕交換禮物活動。每位用戶可以上傳他們想要收到的禮物圖片，並在提交完成後隨機分配一個其他用戶的禮物圖片。收到隨機禮物圖片的用戶必須準備這個禮物並送給對應的參與者。

## 🚀 功能特色

- **禮物圖片上傳:** 用戶可以上傳他們想收到的禮物圖片。
- **Firebase 整合:** 使用 Firebase Realtime Database 和 Firebase Storage 來存取用戶的數據（郵件和禮物圖片 URL）。
- **隨機禮物分配:** 當所有用戶上傳資料後，應用會隨機為每位用戶分配另一位參與者的禮物圖片。
- **禮物準備:** 用戶收到隨機禮物圖片後，需要為另一位參與者準備該圖片中的禮物。
- **Email 通知:** 應用會透過 EmailJS 發送 Email，通知用戶他們需要準備的禮物圖片 URL。
- **重置數據:** 管理員可以隨時重置所有用戶的數據，重新開始新的交換活動。

## 🛠️ 使用技術

- **React** - 前端框架，用於構建用戶介面。
- **Firebase** - 使用 Firebase Storage 儲存圖片，並透過 Firebase Realtime Database 管理用戶數據。
- **EmailJS** - 負責發送隨機分配的禮物 URL 給每個用戶。
- **Chakra UI** - 使用此 React 組件庫來設計用戶介面。

## 📋 操作流程

### 用戶流程：

1. **禮物圖片上傳:**
   - 用戶輸入 Email 並上傳他們想要收到的禮物圖片。
   - 應用會將圖片儲存在 Firebase Storage，並將用戶的 Email 和圖片 URL 儲存在 Firebase Realtime Database 中。

2. **隨機禮物分配:**
   - 當所有用戶上傳完畢後，應用會隨機為每個用戶分配另一個用戶的禮物圖片。
   - 每個用戶都不會收到自己的圖片。

3. **禮物準備:**
   - 隨機分配後，每位用戶必須準備他們收到的禮物圖片中的禮物，並為另一位參與者準備該禮物。

4. **Email 發送:**
   - 應用會透過 EmailJS 發送包含分配給用戶的禮物圖片 URL 的 Email，讓用戶可以準備該禮物。

5. **數據重置:**
   - 管理員可以隨時重置數據，清除 Firebase Realtime Database 中的用戶和分配數據，重新開始交換活動。

---

# 🎄 Farm73 Christmas Gift Exchange Platform

This project is a React web application that allows users to participate in a Christmas gift exchange. Each user uploads an image of the gift they would like to receive, and after the submissions are complete, users are randomly assigned another user's desired gift. Once assigned, each user needs to prepare the gift shown in the randomly assigned image for the recipient.

## 🚀 Features

- **Gift Image Upload:** Users can upload an image of the gift they want to receive.
- **Firebase Integration:** Data (emails and gift image URLs) are stored and retrieved using Firebase Realtime Database and Firebase Storage.
- **Random Gift Assignment:** After all users have uploaded their data, the app randomly assigns each user a gift image from another participant.
- **Gift Preparation:** After receiving their randomly assigned image, each user is responsible for preparing that gift for another participant.
- **Email Notifications:** Users are notified of their assigned gift through an email containing a link to the gift image they need to prepare.
- **Reset Data:** The admin can reset all user data to restart the exchange for a new session.

## 🛠️ Technologies Used

- **React** - Frontend library for building the user interface.
- **Firebase** - Used for storing images (Firebase Storage) and managing data (Firebase Realtime Database).
- **EmailJS** - Handles sending emails with the randomly assigned gift URL to each user.
- **Chakra UI** - Component library for building the user interface with React.

## 📋 How It Works

### User Flow:

1. **Gift Image Upload:**
   - Users provide their email and upload an image of the gift they want to receive.
   - The app stores the image in Firebase Storage and saves the user’s email and the image URL in Firebase Realtime Database.

2. **Random Gift Assignment:**
   - Once all users have uploaded their desired gift images, the app will assign each user a random gift image from another user.
   - Users will never receive their own image.

3. **Gift Preparation:**
   - After the random assignment, each user is responsible for preparing the gift shown in the image they received for another participant.
   
4. **Sending Emails:**
   - An email containing the assigned gift image URL is sent to each user using EmailJS so they can prepare that specific gift for the other participant.

5. **Resetting Data:**
   - The admin can reset the data at any time, which clears both the user and assignment data from the Firebase Realtime Database.

---
