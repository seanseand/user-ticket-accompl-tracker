import os
from concurrent.futures import ThreadPoolExecutor
from dotenv import load_dotenv
from app.utils.util import remove_think_blocks

from langchain_community.document_loaders import PDFPlumberLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableMap
from app.client.prompts.arkline_chat_prompt import prompt_template

working_dir = os.path.dirname(os.path.abspath((__file__)))
file_name = os.path.join(working_dir, "resource", "NOAH_info.pdf")

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")



# loading the embedding model
embedding = HuggingFaceEmbeddings()

# load the llm form groq
llm = ChatGroq(
    model="deepseek-r1-distill-llama-70b",
    temperature=0,
    max_tokens=1000
)


# ========== Document → Chroma Vectorstore ==========
def process_document_to_chroma_db(file_path):
    # Check if vectorstore already exists
    vectorstore_path = f"{working_dir}/doc_vectorstore"
    if os.path.exists(vectorstore_path):
        print("Vectorstore already exists. Skipping document processing.")
        return Chroma(persist_directory=vectorstore_path, embedding_function=embedding)

    # Load the document
    loader = PDFPlumberLoader(file_path)
    documents = loader.load()

    # Split the document into chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=5000, chunk_overlap=200)
    texts = text_splitter.split_documents(documents)

    # Process chunks in parallel to create embeddings
    def process_chunk(chunk):
        return embedding.embed_documents([chunk])

    with ThreadPoolExecutor() as executor:
        embeddings = list(executor.map(process_chunk, texts))

    # Create and persist the vectorstore
    vectordb = Chroma.from_documents(
        documents=texts,
        embedding=embedding,
        persist_directory=vectorstore_path
    )
    return vectordb

# ========== LCEL Chain ==========
def answer_question(user_question):
    # Load vectorstore
    vectordb = Chroma(
        persist_directory=f"{working_dir}/doc_vectorstore",
        embedding_function=embedding
    )
    retriever = vectordb.as_retriever()

    # Compose LCEL chain
    rag_chain = (
        RunnableMap({
            "context": lambda x: retriever.invoke(x["question"]),
            "question": lambda x: x["question"]
        })
        | prompt_template
        | llm
        | StrOutputParser()
    )

    # Run
    result = rag_chain.invoke({"question": user_question})
    return remove_think_blocks(result)

# ========== Run Script ==========
if __name__ == "__main__":
    try:
        print("Processing document to Chroma DB...")
        # process_document_to_chroma_db(file_name)
        print("Document processed successfully.")
    except Exception as e:
        print(f"Error processing document: {e}")

    try:
        test_question = "What is NOAH?"
        print(f"Asking question: {test_question}")
        answer = answer_question(test_question)
        print(f"Answer: {answer}")
    except Exception as e:
        print(f"Error answering question: {e}")