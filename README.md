![image](https://github.com/user-attachments/assets/2c2ac0af-9cac-415f-992b-9ff9d0385b6f)# 🐾 JavaPet Backend 🐾

![JavaPet Logo](https://github.com/MatheoSuch/JavaPet-Frontend/blob/dev/src/assets/Logo.png) 

## 🚀 Descripción

Este repositorio es el backend para **JavaPet**, una aplicación de gestión para clínicas veterinarias. El servidor está diseñado para manejar:

- **Autenticación de usuarios** 🛡️
- **Gestión de pacientes y citas** 🐶🐱
- **Administración completa de la clínica** 🏥

## 📦 Dependencias

### **Dependencias Principales**

- **[bcrypt](https://www.npmjs.com/package/bcrypt)**: 🔒 Encriptación de contraseñas.
- **[cors](https://www.npmjs.com/package/cors)**: 🌐 Habilitar solicitudes entre diferentes dominios.
- **[date-fns](https://date-fns.org/)**: 📅 Manejo y formateo de fechas.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: 🌳 Cargar variables de entorno desde un archivo `.env`.
- **[express](https://expressjs.com/)**: 🚀 Framework para el servidor web.
- **[express-validator](https://express-validator.github.io/docs/)**: ✅ Validación y sanitización de datos.
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: 🧩 Generación y verificación de JSON Web Tokens (JWT).
- **[mongoose](https://mongoosejs.com/)**: 📦 Interacción con MongoDB.
- **[morgan](https://www.npmjs.com/package/morgan)**: 📝 Registro de solicitudes HTTP.

### **Dependencias de Desarrollo**

- **[nodemon](https://www.npmjs.com/package/nodemon)**: 🔄 Reinicio automático del servidor durante el desarrollo.

## ⚙️ Instalación

Sigue estos pasos para configurar y ejecutar el backend:

1. **Clona el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/backend-javapet.git
    cd backend-javapet
    ```

2. **Instala las dependencias:**

    ```bash
    npm install
    ```

3. **Configura las variables de entorno:**

    Crea un archivo `.env` en la raíz del proyecto con el siguiente formato:

    ```env
    PORT=5000
    MONGODB_URI=tu_url_de_conexion_mongodb
    JWT_SECRET=tu_clave_secreta
    ```

4. **Inicia el servidor:**

    En modo desarrollo:

    ```bash
    npm run dev
    ```

    En modo producción (si es aplicable):

    ```bash
    npm start
    ```

5. **Accede a la API:**

    El servidor estará disponible en `http://localhost:5000` por defecto. Usa [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/) para probar los endpoints de la API.

## 📜 Scripts

- **`test`**: Ejecuta los tests del proyecto (actualmente no especificado).
- **`dev`**: Inicia el servidor en modo desarrollo con `nodemon`.
- **`start`**: Inicia el servidor en modo producción.

## 🤝 Contribuciones

¡Contribuye y haz de JavaPet algo aún mejor! Para colaborar:

1. **Haz un fork** del repositorio.
2. **Crea una nueva rama** para tu cambio (`git checkout -b feature/nueva-funcionalidad`).
3. **Realiza tus cambios** y **haz commit** (`git commit -am 'Añadida nueva funcionalidad'`).
4. **Sube tus cambios** (`git push origin feature/nueva-funcionalidad`).
5. **Envía un pull request**.

## 📝 Licencia

Este proyecto está bajo la **Licencia ISC**. Consulta el archivo [`LICENSE`](./LICENSE) para más detalles.

---

👨‍💻 **Hecho con ❤️ por [Matheo Such](https://github.com/MatheoSuch).** ¡Gracias por tu interés en JavaPet!

---

### 🛠️ Recursos Adicionales

- **Documentación de Express**: [Express Documentation](https://expressjs.com/)
- **Guía de Mongoose**: [Mongoose Guide](https://mongoosejs.com/docs/guide.html)
- **Tutorial de JWT**: [JWT Tutorial](https://jwt.io/introduction/)
- **Validación en Express**: [Express Validator Documentation](https://express-validator.github.io/docs/)

### 🌟 Imágenes del Proyecto

![Ejemplo de JavaPet]((https://drive.google.com/file/d/1GFDL3cGs0C8-A0aXlRwtKgzTTYgvfHuz/view?usp=sharing))) 

---

Para más información, no dudes en contactar a [Matheo Such](https://github.com/MatheoSuch) o abrir un [issue](https://github.com/MatheoSuch/backend-javapet/issues) en el repositorio.
