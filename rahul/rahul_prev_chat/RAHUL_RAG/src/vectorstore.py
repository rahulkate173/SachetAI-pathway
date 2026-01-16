'''
vectorstore.py - ChromaDB vectorstore functions for RAG system (Docker + Local)
'''

# VECTORSTORE RELATED IMPORTS
from langchain_chroma import Chroma
import os

# Docker/Chroma server detection
def _is_docker_mode():
    return os.getenv("CHROMA_SERVER_HOST") is not None or \
           os.getenv("CHROMA_SERVER_HOST", "localhost") != "localhost"

# 1. Creating a new ChromaDB vectorstore from scratch
def create_vectorstore(documents, embeddings, persist_directory="./chroma_db"):
    """
    Create a new ChromaDB vectorstore from documents and embeddings.
    """
    try:
        if _is_docker_mode():
            # 🚀 DOCKER MODE - Connect to Chroma server
            chroma_host = os.getenv("CHROMA_SERVER_HOST", "chromadb")
            chroma_port = os.getenv("CHROMA_SERVER_HTTP_PORT", "8000")
            
            vectorstore = Chroma(
                embedding_function=embeddings,
                persist_directory=None,  # Server handles persistence
                client_settings={
                    "chroma_server_host": chroma_host,
                    "chroma_server_http_port": chroma_port
                },
                collection_name="rag_collection"
            )
            vectorstore.add_documents(documents)
            print(f"🚀 [DOCKER] Connected to ChromaDB server: {chroma_host}:{chroma_port}")
        else:
            # 💾 LOCAL MODE - File-based (your current code)
            vectorstore = Chroma.from_documents(
                documents=documents,
                embedding=embeddings,
                persist_directory=persist_directory,
                collection_name="rag_collection"
            )
            print(f"💾 [LOCAL] Saved to '{persist_directory}'")
        
        print(f"\n[INFO] Collection size: {vectorstore._collection.count()}")
        print("=" * 50)
        print(f"\n✅✅ Vectorstore ready (mode: {'DOCKER' if _is_docker_mode() else 'LOCAL'})")
        
        return vectorstore
        
    except Exception as e:
        print(f"❌ Error creating ChromaDB: {e}")
        return None

# 2. Loading an existing ChromaDB vectorstore
def load_vectorstore(embeddings, persist_directory="./chroma_db"):
    """
    Load an existing ChromaDB vectorstore.
    """
    try:
        if _is_docker_mode():
            # 🚀 DOCKER MODE
            chroma_host = os.getenv("CHROMA_SERVER_HOST", "chromadb")
            chroma_port = os.getenv("CHROMA_SERVER_HTTP_PORT", "8000")
            
            vectorstore = Chroma(
                embedding_function=embeddings,
                persist_directory=None,
                client_settings={
                    "chroma_server_host": chroma_host,
                    "chroma_server_http_port": chroma_port
                },
                collection_name="rag_collection"
            )
            print(f"🚀 [DOCKER] Loaded from server: {chroma_host}:{chroma_port}")
        else:
            # 💾 LOCAL MODE (your current code)
            vectorstore = Chroma(
                persist_directory=persist_directory,
                embedding_function=embeddings,
                collection_name="rag_collection"
            )
            print(f"💾 [LOCAL] Loaded from '{persist_directory}'")
        
        print(f"\n[INFO] Collection size: {vectorstore._collection.count()}")
        print("=" * 50)
        print("\n✅✅ Successfully LOADED ChromaDB.")
        
        return vectorstore
        
    except Exception as e:
        print(f"❌ Error loading ChromaDB: {e}")
        return None

# 3. Loading existing + adding new docs (unchanged from yours)
def load_and_add_new_docs(new_docs, embeddings, persist_directory="./chroma_db"):
    """
    Add new documents to existing ChromaDB vectorstore.
    """
    try:
        vectorstore = load_vectorstore(embeddings, persist_directory)
        if vectorstore is None:
            return None
            
        print("\n[INFO] Adding new CHUNKS to ChromaDB...")
        vectorstore.add_documents(new_docs)
        
        print(f"\n[INFO] New collection size: {vectorstore._collection.count()}")
        print("=" * 50)
        print("\n✅✅ Successfully ADDED new chunks to ChromaDB.")
        
        return vectorstore
        
    except Exception as e:
        print(f"❌ Error during LOADING and ADDING: {e}")
        return None
