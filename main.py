import streamlit as st
import dotenv 
import langchain
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv
import zipfile

load_dotenv()

os.environ["GOOGLE_API_KEY"] = os.getenv("gemini")

st.set_page_config(page_title = "AI Website generator", page_icon = "🌐")

st.title(":rainbow[AI Website Generator using langchain and streamlit]")

prompt = st.text_area("PROMPT TO WEBSITE", placeholder = "give your prompt to generate a Website")


if st.button("Generate Website"):
    if prompt:
        message = [("system", """ You are a powerfull web development expert. Having 10+ years of experience in web development.
                    you need to generate a proffessional website using a system prompt.
                    
                    The output format should be exactly followed below format :
                    
                    --html--
                    [html code]
                    --html--

                    --css--
                    [css code]
                    --css--

                    --js--
                    [java script code]
                    --js--

                    I need to split th can be splitted into Three files
                    1. index.html
                    2. style.css
                    3. script.js

                    """)]
        
        model = ChatGoogleGenerativeAI(model = "gemini-2.5-flash")
        message.append(("user", prompt))
        response = model.invoke(message)

        with open("file.txt","w") as file:
            file.write(response.content)

        with open("index.html","w") as file:
            file.write(response.content.split("--html--")[1])

        with open("style.css","w") as file:
            file.write(response.content.split("--css--")[1])

        with open("script.js","w") as file:
            file.write(response.content.split("--js--")[1])

        with zipfile.ZipFile("website.zip", "w") as zip:
            zip.write("index.html")
            zip.write("style.css")
            zip.write("script.js")

        st.download_button("click to download", 
                              data = open("website.zip", "rb"),
                              file_name = "Websitezip")

        st.success("successfully generated")