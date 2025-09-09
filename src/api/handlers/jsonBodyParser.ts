import { json } from 'express'; //==> Importamos el middleware json de express

export const jsonBodyParse = json(); //==> Middleware que parsea el body de las peticiones a JSON