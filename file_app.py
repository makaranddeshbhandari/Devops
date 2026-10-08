from anthropic import Anthropic

client = Anthropic()

response = client.messages.create(
    model="claude-3-sonnet-20240229",
    max_tokens=50,
    messages=[{"role": "user", "content": "Hello"}],
)

print(response.content[0].text)
