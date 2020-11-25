# filter-search-table

## Что можно еще доделать/добавить/изменить:

- "кэширование" уже загруженных данных, хотя бы в localStorage (vuex-persist);
- для скорости и улучшения UX, сделал бы предварительную загрузку данных (при начальной загрузке страницы, а по кнопке уже просто показывать);
- "кэширование" отфильтрованных данных для дальнейшей сортировки (для сохранения исходного порядка результатов поиска);
- верстка через table/td/tr;
- множественная сортировка (с учетом порядка столбцов);
- вынести baseUrl в .env (например, если бы оправляли множество похожих запросов на один сервер).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
