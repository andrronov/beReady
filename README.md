# Todo App with Vue.js and Node.js (PostgreSQL)

Full-stack приложение для управления задачами, созданное с использованием Vue.js для фронтенда и Node.js (Express) с PostgreSQL для бэкенда. Этот проект демонстрирует архитектуру клиент-сервер с отдельными средами разработки.

## Возможности

*   Аутентификация пользователя (регистрация, вход, выход, обновление токена).
*   Создание, чтение, обновление и удаление задач.
*   Безопасная аутентификация на основе JWT.

## Архитектура

Проект построен в монорепе и следует архитектуре клиент-сервер:

*   `client/`: Содержит фронтенд-приложение, построенное на Vue.js.
*   `server/`: Содержит бэкенд API, построенный на Node.js (Express) и PostgreSQL.

## Используемые технологии

### Фронтенд (`client/`)

*   Vue.js 3
*   Pinia (управление состоянием)
*   Vue Router
*   Axios (HTTP-клиент)
*   Tailwind CSS (стилизация)
*   Vite (сборщик проектов)

### Бэкенд (`server/`)

*   Node.js
*   Express.js (веб-фреймворк)
*   PostgreSQL (база данных)
*   `pg` (клиент PostgreSQL для Node.js)
*   JWT (JSON Web Tokens) для аутентификации
*   `bcrypt` (хеширование паролей)
*   `express-validator` (валидация тела запроса)
*   `cookie-parser`, `cors`, `dotenv`

## Структура проекта

```
be-ready/
├── client/                 # Фронтенд-приложение (Vue.js)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── settings/
│   │   ├── store/
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── router.js
│   ├── .env                # Переменные окружения клиента
│   ├── package.json
│   └── vite.config.js
├── server/                 # Бэкенд-приложение (Node.js/Express)
│   ├── controller/
│   ├── exeptions/
│   ├── middlewares/
│   ├── router/
│   │   └── router.js
│   ├── service/
│   │   └── token.service.js
│   ├── validators/
│   │   └── index.js
│   ├── .env                # Переменные окружения сервера
│   ├── db.js               # Подключение к базе данных
│   ├── db.sql              # Схема базы данных
│   ├── index.js            # Точка входа сервера
│   └── package.json
└── README.md
```
