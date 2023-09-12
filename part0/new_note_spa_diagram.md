sequenceDiagram
participant browser
participant server

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
activate server
server-->>browser: [{ "content": "full stack open", "date": "2023-09-12T21:23:05.758Z""}, ... ]
deactivate server

Note right of browser: The server responds with status code 201 created. The browser stays on the same page, and it sends no further HTTP requests
