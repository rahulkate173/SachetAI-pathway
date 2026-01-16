FROM python:3.11-slim-bookworm

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    g++ \
    poppler-utils \
    tesseract-ocr \
    libmagic1 \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Upgrade pip
RUN pip install --no-cache-dir --upgrade pip setuptools wheel

# Install in logical dependency order to avoid conflicts
# Step 1: PyTorch CPU-only first (biggest package)
RUN pip install --no-cache-dir \
    torch --index-url https://download.pytorch.org/whl/cpu

# Step 2: Core utilities
RUN pip install --no-cache-dir \
    numpy pandas tqdm python-dotenv

# Step 3: Document loaders
RUN pip install --no-cache-dir \
    PyMuPDF python-pptx python-docx openpyxl

# Step 4: Embeddings (depends on torch)
RUN pip install --no-cache-dir \
    sentence-transformers

# Step 5: LangChain packages (will install compatible dependencies)
RUN pip install --no-cache-dir \
    langchain-core \
    langchain-chroma \
    langchain-groq \
    langchain-community \
    langchain-huggingface

# Clean up
RUN rm -rf ~/.cache/pip /tmp/* /root/.cache

# Pre-download model (optional, with error handling)
RUN python -c "from sentence_transformers import SentenceTransformer; \
    SentenceTransformer('all-MiniLM-L6-v2')" || \
    echo "Model will download at runtime"

# Copy application
COPY src/ /app/src/
COPY main.py /app/

EXPOSE 8501

CMD ["python", "main.py"]