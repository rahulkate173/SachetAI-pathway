from langchain_core.prompts import ChatPromptTemplate


# GENRAL PURPOSE PROMPT
def general_purpose_prompt():
    return ChatPromptTemplate.from_template(
        """
        You are a helpful and factual AI assistant.
        Use the following retrieved context to answer the user's question.
        If the answer is not found in the context, reply with:
        "I'm not sure based on the provided information."

        <context>
        {context}
        </context>

        Question: {input}
    """
    )
