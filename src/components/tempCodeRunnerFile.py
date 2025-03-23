import google.generativeai as genai

genai.configure(api_key="AIzaSyBWORHGsDscferBn1a8EcI_RF1QhjzD1lc")

model = genai.GenerativeModel("gemini-pro")
response = model.generate_content("Generate a short story about a robot learning to feel emotions.")

print(response.text)