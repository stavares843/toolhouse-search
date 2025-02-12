import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

# mocked dataset
tools = [
    {"id": 1, "name": "Data Analyzer", "description": "A powerful tool for data analysis."},
    {"id": 2, "name": "ML Predictor", "description": "A tool for making machine learning predictions."},
    {"id": 3, "name": "AI Assistant", "description": "A virtual assistant powered by AI."},
    {"id": 4, "name": "Graph Visualizer", "description": "A tool for visualizing graphs and networks."},
    {"id": 5, "name": "Text Summarizer", "description": "A tool that summarizes long texts using AI."},
]

# load the embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# encode tool descriptions
descriptions = [tool["description"] for tool in tools]
embeddings = model.encode(descriptions)

# create FAISS index
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(np.array(embeddings))

def search_tools(query_text, threshold=0.5):
    """ Searches for relevant tools using FAISS and additional text matching for single words. """
    query_words = query_text.lower().split()  # split search query into words
    query_embedding = model.encode([query_text])

    # get top 5 search results from FAISS
    distances, indices = index.search(np.array(query_embedding), k=5)

    results = []
    seen = set()

    # first, process FAISS matches
    for dist, idx in zip(distances[0], indices[0]):
        if idx < len(tools) and idx not in seen:
            similarity_score = 1 / (1 + dist)  # convert L2 distance to similarity score
            
            if similarity_score >= threshold:
                seen.add(idx)
                results.append(tools[idx])

    # if no results OR single-word search, check for word-based matches
    for word in query_words:
        word_embedding = model.encode([word])
        word_distances, word_indices = index.search(np.array(word_embedding), k=3)

        for dist, idx in zip(word_distances[0], word_indices[0]):
            if idx < len(tools) and idx not in seen:
                similarity_score = 1 / (1 + dist)
                
                if similarity_score >= threshold:
                    seen.add(idx)
                    results.append(tools[idx])

    # simple text matching if FAISS fails (for very short words)
    if not results:
        for tool in tools:
            if any(word in tool["description"].lower() or word in tool["name"].lower() for word in query_words):
                results.append(tool)

    return results  # returns results with both FAISS and fallback text matching
