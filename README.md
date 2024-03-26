
Get Eventos
This endpoint makes an HTTP GET request to retrieve a list of eventos.
Response
Status: 200
Content-Type: application/json

The response will contain a list of eventos, with each evento object containing the following properties:
id_Evento (number): The unique identifier for the evento.
Nombre_Evento (string): The name of the evento.
Descripcion (string): The description of the evento.
Fecha_Hora (string): The date and time of the evento.
Ubicacion (string): The location of the evento.

This endpoint makes an HTTP GET request to retrieve a list of users from the specified API. The response will be in JSON format and will include the user details such as ID, name, email, password hash, and creation date.
To use this endpoint, simply make a GET request to the following URL:


Plain Text

http://localhost:4000/api/usuarios


The response will contain an array of user objects, each including the user's ID, name, email, password hash, and creation date.
Example response:


JSON
[
    {
        "ID_Usuario": 0,
        "Nombre": "",
        "Correo_Electronico": "",
        "Contrasena_Hash": "",
        "Fecha_Creacion": ""
    }
]

http://localhost:4000/api/notificaciones This endpoint sends an HTTP GET request to retrieve notifications from the server. The response will be in JSON format with a status code of 200. The response will contain an array of notification objects. 
http://localhost:4000/api/registroEventos This endpoint sends an HTTP GET request to retrieve a list of registered events. The response will be in JSON format with a status code of 200, and the body will contain an array of event data. 

http://localhost:4000/auth-token/login
This endpoint is used to authenticate and obtain a JWT token for accessing protected resources. 
Request Body
email (text, required): The email address of the user.
password (text, required): The password of the user.

Response
Status: 200 OK
Content-Type: application/json
jwt (string): The JWT token for accessing protected resources.

http://localhost:4000/auth-token/profile
This endpoint retrieves the profile information associated with the authentication token. Upon a successful execution, the server responds with a status code of 200 and a JSON object containing the user's ID, name, and email address.
The response will have the following structure:
ID_Usuario (number): The user's ID.
Nombre (string): The user's name.
Correo_Electronico (string): The user's email address.
