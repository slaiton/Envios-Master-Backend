# API en Express

Este proyecto es una API desarrollada en **Express**. Aquí encontrarás las instrucciones para instalar, configurar y ejecutar la aplicación correctamente.

## Requisitos previos

- Tener instalado **Node.js** (recomendado: versión LTS)
- Tener instalado **Docker** y **Docker Compose** en tu máquina
- Tener configurado un **gestor de base de datos** (si no usas Docker, puedes configurar tu base de datos de manera local)

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>

2. **Instalar las dependencias:**

   npm install

3. **Levantar la base de datos con Docker:**

   docker-compose -f .devops/docker/develop/docker-compose.yml up -d

4. **Ejecutar migraciones:**

   npm run migrate:sql

5. **Carga Datos**

   npm run load-data     
