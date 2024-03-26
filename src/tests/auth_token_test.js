// const test = require("node:test");
// const assert = require("node:assert/strict");
// const { createRequest, createResponse } = require('node-mocks-http');
// const { authTokenRouter } = require('../controllers/auth_token.controller.js');
// const getusuario = require("../helpers/auth-by-email-pwd.js");
// // Asegúrate de que getusuario esté correctamente exportado

// // Aquí deberías mockear getusuario si es necesario para tus pruebas

// test("authTokenRouter debería responder con 400 si el email o la contraseña no son válidos", async () => {
//   const req = createRequest({
//     method: 'POST',
//     url: '/auth-token/login',
//     body: {
//       email: 'invalidemail', // No contiene '@'
//       password: '123' // Menos de 3 caracteres
//     }
//   });
//   const res = createResponse();

//   await authTokenRouter(req, res);
//   assert.strictEqual(res.statusCode, 400);
//   assert.strictEqual(res._getJSONData().message, "Bad Request. Please provide a valid email and password.");
// });

// // Más pruebas...
