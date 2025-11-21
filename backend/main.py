import os
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

if not os.getenv("GEMINI_API_KEY"):
    print("Error: GEMINI_API_KEY not found. Please check your .env file.")
    exit()

def main():


    llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    )

    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful technical assistant who explains concepts simply."),
        ("user", "Explain {topic} in one short paragraph.")
    ])


    parser = StrOutputParser()


    chain = prompt | llm | parser

    topic_to_explain = "Quantum Entanglement"
    print(f"Asking AI about: {topic_to_explain}...\n")
    
    try:
        response = chain.invoke({"topic": topic_to_explain})
        print(f"Response:\n{response}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()