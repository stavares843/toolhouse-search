AI-Powered Search

## Overview
Toolhouse Search helps users **find tools efficiently** using **AI-based search** with **FAISS and sentence-transformer embeddings**.

## Tech Stack
- **Backend**: FastAPI, FAISS, Sentence Transformers  
- **Frontend**: React (TypeScript), Axios  
- **Database**: FAISS (Vector Search)

## Features
- AI-powered semantic search using FAISS & Sentence Transformers
- Handles partial word matches (e.g., "machine" finds "machine learning")
- Fast & efficient search using vector embeddings
- If are no results "No results found" message appears
- Press "Enter" to search
- AI-powered ranking ensures the most relevant tools appear first
- Easily extendable architecture (add more tools, new search methods, etc.)
- Modular backend design with FastAPI & FAISS

## Installation & Setup

### **Clone the Repository**
```
git clone https://github.com/yourusername/toolhouse-search.git
```

```
cd toolhouse-search
```

## macOS

### **Backend Setup (FastAPI)**

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

### **Frontend Setup (React)** - in another terminal tab

```
cd frontend
```
```
npm install
```
```
npm start
```

## Example API Request
```
curl -X POST "http://127.0.0.1:8000/search" -H "Content-Type: application/json" -d '{"text": "machine learning"}'
```

## Demo Video




https://github.com/user-attachments/assets/dcf2747e-16ef-49d0-b290-523a56a7c204




