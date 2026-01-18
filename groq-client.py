from langchain.chat_models import init_chat_model
from dotenv import load_dotenv
load_dotenv()

model = init_chat_model(model="groq:llama-3.1-8b-instant")

response = model.invoke("what are the characteristics of a hurricane?")
print(response.content)

