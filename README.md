# 🔍 Toolhouse AI-Powered Search

## 🚀 Overview
Toolhouse Search helps users **find tools efficiently** using **AI-based search** with **FAISS and sentence-transformer embeddings**.

## 🛠 Tech Stack
- **Backend**: FastAPI, FAISS, Sentence Transformers  
- **Frontend**: React (TypeScript), Axios  
- **Database**: FAISS (Vector Search)

## 📌 Features
✅ AI-powered **semantic search**  
✅ Handles **partial word matches** (e.g., "machine" finds "machine learning")  
✅ **Modern UI** with **dark theme & animations**  
✅ Handles **errors gracefully**  

## 🛠 Installation & Setup

### **1️⃣ Clone the Repository**
```
git clone https://github.com/yourusername/toolhouse-search.git
```

```
cd toolhouse-search
```

## macOS

### **2️⃣ Backend Setup (FastAPI)**

```
cd backend
```
```
python -m venv venv
```
```
source venv/bin/activate
```
```
pip install -r requirements.txt
```
```
uvicorn app.main:app --reload
```

### **3️⃣ Frontend Setup (React)** - in another terminal tab

```
cd frontend
```
```
npm install
```
```
npm start
```

## 🔍 Example API Request
```
curl -X POST "http://127.0.0.1:8000/search" -H "Content-Type: application/json" -d '{"text": "machine learning"}'
```

## 🎥 Demo Video




https://github.com/user-attachments/assets/93e1317b-8604-49b3-91b3-102468df8aee

