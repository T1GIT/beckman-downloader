# beckman-downloader


### Тестовое задание
##### Стэк

__ЯП: TypeScript / JavaScript__

__Технологии: Koa.js, Sequelize.js, Axios.js koa-router.js__

__Инфраструктура: Node.js, Docker, Docker compose (минимально - .env-файл, который показывает все настройки приложения)__


### Задача:

Разработать сервис, который по расписанию сможет считывать данные о файлах с источника в интернете и полученные результаты складывать во внутреннюю базу данных в таблицу предназначенную для хранилища данных. Система должна уметь работать с пользовательским вводом данных через REST API.

Функциональные возможности системы:

1. Обработка пользовательских запросов:
   1. CRUD по сущности хранилища данных
   1. Запрос занесение файлов с нового ресурса (POST request)*  Логика бэкенда для запроса должна уметь работать с большой очередью данных и не заставлять пользователя ждать запросов 
2. Запуск проверки наличия обновлений в структуре источника данных по таймеру
3. Система должна быть интегрирована с RDBMS PostgreSQL
4. Система должна иметь план сборки описанный в docker-compose, чтобы потребители решения могли запускать одной командой docker build && docker run Должны быть прописаны условия для сборки самого приложения и указаны созависимые элементы (такие, как база данных)

### Условия выполнения:
- Внесение изменений в кодовую базу продукта на сервере Github посредствам коммита и описания, что в рамках коммита реализовано на ежедневной основе
- На выполнение всего тестового задание дается не более 10 рабочих дней (14 календарных дней)

__* Ссылка для тестирования и изучения структуры данных https://www.beckmancoulter.com/ru/search?query=*&index=0&size=25&languages=English&type=tech-docs__


_Пользовательский запрос должен иметь тело объект запроса, где можно указать URL источника данных. Сервер должен отвечать что-то понятное пользователю :)_


## [Documentation](https://www.postman.com/t1team/workspace/beckman-downloader/collection/13713806-09eabc27-80e3-4093-9141-c7c66116c06c?action=share&creator=13713806&active-environment=13713806-0ac09faf-7849-4a83-bdb9-6130ce1ace12)
