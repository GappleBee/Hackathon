# Important

To run the whole website (including the API), you need to boot up **two** servers: the server for the frontend and the one for the backend (the API)

# How to boot up the backend server?

If you are on Windows, install Python then go into this directory and run:
`python manage.py runserver`
If that didn't work then you need to add python to your system's PATH environment variables then try running the command again

If the server has started up successfully then it should say something along the lines of:
```console
System check identified no issues (0 silenced).
August 13, 2024 - 10:11:40
Django version 5.0.7, using settings 'backend.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

# IMPORTANT
**Before sending requests to the backend server, ensure you have the backend server up and running first**

# How do I send requests from frontend?

Normally, if you try send a POST request to `/api/register` with some data it won't work, under the hood, it needs to send data to your backend server which is usually hosted on your system along with the route as `http://127.0.0.1:8000/api/register`. What you can do instead is set up a proxy to `http://127.0.0.1:8000` so it redirects unrecognised routes like `/api/register` to `http://127.0.0.1:8000/api/register`

# How do I test the API with whatever requests I want?

To do this, go into the test-api.rest and follow the instructions there, there are also some requests already made for you to send to the server
