# 🛒 Cartner – Collaborative E-commerce Platform

**Cartner** is a full-stack e-commerce web application designed to solve the modern online shopping challenge of collaboration and budget fairness. It allows couples, friends, or roommates to shop together in real-time, split cart costs smartly, and manage sessions with ease.

---

## 🚀 Features

- 🔐 User Authentication (JWT-based)
- 👥 Friend/Couple real-time shopping session mode
- 🧮 Smart cart cost-splitting algorithm
- 🧾 Session history with user-specific tracking
- 🛍️ Product catalog & dynamic cart system
- 🌐 Responsive front-end built with React + Vite
- ⚙️ Backend with Express + MongoDB + Mongoose
- 📦 MVC architecture for clean backend structure

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, HTML, CSS, Axios
- **Backend**: Node.js, Express.js, Mongoose, JWT, bcryptjs
- **Database**: MongoDB (via Atlas)
- **State**: React Hooks
- **Auth**: Token-based (with middleware protection)
- **Architecture**: MVC

---

## 📂 Project Structure

```
Cartner-ENV/
├── client/             # Frontend (React)
├── server/             # Backend (Node/Express)
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── config/
├── .gitignore
├── logs.md
└── README.md
```

---

## 🧪 Local Setup

1. **Clone the repo**
```bash
git clone https://github.com/BMAsekunowo/Cartner.git
cd Cartner-ENV
```

2. **Install dependencies**
```bash
# Client
cd client
npm install

# Server
cd ../server
npm install
```

3. **Configure environment**
```env
# Inside /server/.env
PORT=5005
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_secret_here
```

4. **Run the app**
```bash
# Server
npm run dev

# Client (in another terminal)
npm run dev
```

---

## 📅 Project Timeline

- **Week 1**: Environment setup, Git, MongoDB, MVC structure ✅
- **Week 2**: Auth system, JWT, route protection 🔒
- **Week 3**: Shared sessions + Cart logic 🛒
- **Week 4**: Final polish + deployment 🚀

---

## 👤 Author

Hey there 👋, I'm **Boluwatife Asekunowo** — a passionate software developer building Cartner to make collaborative shopping seamless. 

– [GitHub](https://github.com/BMAsekunowo)
– [X](https://x.com/BMAsekunowo)
– [LinkedIn](https://www.linkedin.com/in/boluwatife-asekunowo-60956133a/)

---

## 📄 License

This project is open source and licensed under the MIT License.
