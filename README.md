## **Happo.js – The Official Social Login SDK for Happo**

### **What is Happo.js?**
Happo.js is a lightweight and easy-to-use JavaScript SDK that allows websites and applications to integrate **Happo social login** just like Facebook or Google OAuth. 

With this, users can **authenticate via Happo.gg** and retrieve their account details securely without needing to create a separate login system.

🔹 **No API keys required**  
🔹 **Secure popup-based authentication**  
🔹 **Simple event-driven approach**  

## **🚀 Features**
✅ One-click authentication via Happo  
✅ Handles popup closures & errors automatically  
✅ Event-driven API (`onConnect`, `onError`)  
✅ Fully **Promise-based** for async/await support  

---

## **📦 Installation**
### **Using a CDN (Recommended)**
Simply include the following script in your HTML file:

```html
<script src="https://www.happo.gg/connect/sdk.js"></script>
```

### **Via NPM**
```sh
npm install happo-connect
```
Then import it in your project:
```javascript
import Happo from "happo-connect"
```

---

## **🛠️ Usage**
### **Quick Example**
```javascript
Happo.onConnect(user=>console.log("Connected as:",user))
Happo.onError(()=>console.log("Login failed or closed"))

Happo.connect().then(user=>{
    console.log("User data received:",user)
}).catch(err=>{
    console.error("Authentication failed:",err)
})
```

### **Advanced Example**
For more control, you can handle login and display user details dynamically:

```javascript
document.getElementById("login-btn").addEventListener("click",async()=>{
    try {
        const user=await Happo.connect()
        document.getElementById("user-name").innerText=`Welcome, ${user.name}!`
        document.getElementById("user-avatar").src=user.figure
    } catch (err) {
        console.error("Failed to login:",err)
    }
})
```

---

## **🧑‍💻 API Reference**
### **`Happo.connect(): Promise<User>`**
Opens the Happo authentication popup and returns a Promise with the logged-in user’s details.

#### **Example**
```javascript
const user=await Happo.connect()
console.log(user.name) /// "Player1"
```

#### **Returned User Object**
| Property      | Type      | Description |
|--------------|----------|-------------|
| `id`         | `string`  | Unique user ID |
| `name`       | `string`  | User’s display name |
| `motto`      | `string`  | User's bio/status |
| `email`      | `string`  | Email (if permitted) |
| `figure`     | `string`  | User's avatar figure |
| `club`       | `boolean` | Whether the user has Happo Club |
| `rank`       | `number`  | User rank/level |
| `session`    | `string`  | Session token for backend validation |
| `timestamp`  | `number`  | Login timestamp |

---

### **`Happo.onConnect(callback: (user: User) => void): void`**
Fires when a user successfully logs in. Provides the user object as an argument.

#### **Example**
```javascript
Happo.onConnect(user=>{
    console.log("User logged in:",user)
})
```

---

### **`Happo.onError(callback: () => void): void`**
Fires when login fails (e.g., popup blocked, user closes it, or an error occurs).

#### **Example**
```javascript
Happo.onError(()=>{
    console.log("Login process was canceled or failed.")
})
```

---

## **🔒 How It Works**
1. `Happo.connect()` opens a popup for authentication.
2. The user logs in via Happo.gg.
3. Happo sends the user’s details securely via `window.postMessage()`.
4. The SDK captures the message, validates it, and resolves the Promise.
5. You can access the user’s details in `onConnect()` or via the Promise response.

---

## **📌 Full Code Example**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Happo Login Demo</title>
</head>
<body>
    <button id="login-btn">Connect with Happo</button>
    <h2 id="user-name"></h2>

    <script src="https://www.happo.gg/connect/sdk.js"></script>
    <script>
        document.getElementById("login-btn").addEventListener("click",async()=>{
            try{
                const user=await Happo.connect()
                document.getElementById("user-name").innerText=`Welcome, ${user.name}!`
            }catch(err){
                console.error("Failed to login:",err)
            }
        })
    </script>
</body>
</html>
```

---

## **🌟 Why Use Happo.js?**
✅ **No extra dependencies** – Works out-of-the-box  
✅ **Secure** – Uses `postMessage` & auto-closes popups  
✅ **Event-driven** – Listen for `onConnect` & `onError`  
✅ **Works with any front-end framework** (React, Vue, Vanilla JS)  

---

## **📄 License**
MIT License © 2025 Happo.gg
