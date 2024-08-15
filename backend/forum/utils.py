import google.generativeai as genai
import os

genai.configure(api_key=os.environ["API_KEY"])

model = genai.GenerativeModel('gemini-1.5-flash')

def get_tone(post, tones):
    prompt = ''
    prompt += f'Post title: {post.title}\n'
    prompt += f'Post contents: {post.contents}\n\n'

    comments = post.comments.all()
    if comments:
        count = 0
        for comment in comments:
            count += 1
            prompt += f'Post comment {count}\n'
            prompt += comment.contents + '\n\n'

    prompt += "Available tones: " + ", ".join(tones) + "\n"

    prompt += 'After looking at the entire discussion and available tones to choose from, what would you say is the tone of the discussion?'

    tone = model.generate_content(prompt)
    while tone.text not in tones:
        tone = model.generate_content(prompt)
    return tone.text