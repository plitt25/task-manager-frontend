# Configurar frontend task manager
1. clona el proyecto e ingresa a la carpeta que se genero
   https://github.com/plitt25/task-manager-frontend.git
   cd task-manager-frontend
3. Instalar dependencias
   npm install
4. iniciar servidor
   npm start
5. abre al aplicativo por el local host
   http://localhost:4200/

# Justificacion de elecciones técnicas
Con angular facilita el manejo de formularios y validaciones, y tiene un ecosistema intuitivo y facil de trabajar para grandes proyectos.
Decidi usar bcrypt para almacenar las contraseñas de forma segura. Incluso si la base de datos se ve comprometida, los datos siguen protegidos.
Use JSON Web Tokens para mantener sesiones de usuario seguras. Esto permite validar fácilmente la sesion del usuario que use la app.
