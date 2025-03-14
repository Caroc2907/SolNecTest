# 🛠️ Soltec Test

Este es un proyecto desarrollado con **Next.js 14**, **TypeScript**, y **React Query**, que permite explorar **usuarios** y **publicaciones** con soporte para **paginación infinita**, **búsqueda en tiempo real**, y **modo oscuro**. 🚀

---

## 📦 **Características Principales**
✔ **📜 Listado de Publicaciones** con scroll infinito.  
✔ **🔍 Búsqueda en tiempo real en publicaciones ** con debounce para optimizar rendimiento.  
✔ **💬 Gestión de Comentarios** con React Query y caché optimizado.  
✔ **🎨 Modo Oscuro / Claro** persistente en localStorage.  
✔ **🔥 Estilos optimizados con SCSS** en lugar de CSS tradicional.  
✔ **🧪 Pruebas unitarias con Jest & React Testing Library**.  
✔ **📡 Consumo de API externa (JSONPlaceholder)** con Axios.  


---

## 🚀 **Tecnologías Utilizadas**
- **Next.js 14** - React Framework  
- **TypeScript** - Tipado estático  
- **React Query** - Gestión de datos asíncronos  
- **Axios** - Cliente HTTP  
- **SASS (SCSS)** - Estilos optimizados  
- **Jest & Testing Library** - Pruebas unitarias  
- **ESLint & Prettier** - Formateo y linting  
- **Vercel / Docker** - Opciones de despliegue  

---

## 🛠 **Instalación y Configuración**

Requisitos
Node.js 18 o superior

### 1️⃣ **Clonar el repositorio**
```bash
git clone https://github.com/Caroc2907/SolNecTest.git
cd SolNecTest
yarn install
npm run dev
🔗 Luego, abre [http://localhost:3000] en tu navegador.
```

📂 Estructura del Proyecto
📂 my-next-app
 ┣ 📂 app                # Páginas principales
 ┃ ┣ 📂 users            # Página de usuarios
 ┃ ┣ 📂 posts            # Página de publicaciones
 ┃ ┗ 📂 components       # Componentes reutilizables
 ┣ 📂 hooks              # Custom Hooks con React Query
 ┣ 📂 lib                # API externa con Axios
 ┣ 📂 styles             # Estilos globales en SCSS
 ┣ 📂 types              # Tipos de TypeScript
 ┣ 📂 tests              # Pruebas unitarias
 ┣ 📜 next.config.js     # Configuración de Next.js
 ┣ 📜 package.json       # Dependencias y scripts
 ┗ 📜 README.md          # Documentación del proyecto

🏗 Organización de la Carpeta /app
Se usa la carpeta /app para aprovechar las Server Components de Next.js 14. La lógica de datos está separada en /hooks para un código más modular. La API está centralizada en /lib/api.ts para mejor mantenibilidad.

Server Side Rendering (SSR) y Scroll Infinito
En el componente post/page.tsx, se utiliza Server Side Rendering (SSR) para precargar 10 publicaciones en la carga inicial. Esto se hace con el objetivo de mejorar la experiencia del usuario, evitando que se muestre una página vacía mientras las publicaciones se cargan. De este modo, las primeras publicaciones se muestran de inmediato, mejorando la percepción de velocidad.

Además, se implementó la lógica para el scroll infinito. Cuando el usuario sigue desplazándose, la aplicación comienza a consumir las siguientes páginas de publicaciones, utilizando los valores iniciales para paginación y optimizando la carga de los datos. Esto garantiza una experiencia fluida y eficiente sin recargar todo el contenido en cada nueva consulta.

🔹 Uso de React Query
Pre-fetching y revalidación automática para mantener los datos actualizados.
Cacheo eficiente para evitar llamadas innecesarias a la API.
Invalidación de queries tras mutaciones exitosas.

🧪 Ejecutar Pruebas
El proyecto incluye algunas pruebas unitarias con Jest y React Testing Library.
Para ejecutar todas las pruebas:
```bash
npm run test

npm run test:watch
```

📌 Autor
👩🏻‍💻 Carolina Colorado - Desarrolladora Web
🔗 LinkedIn: https://www.linkedin.com/in/carolina-colorado-colmenares/