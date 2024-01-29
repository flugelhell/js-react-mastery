1. Create Project
    - pnpm create vite nama_app
    - cd nama_app
    - pnpm install
2. Install tailwind
    - source: https://tailwindcss.com/docs/guides/vite
    - pnpm install -D tailwindcss postcss autoprefixer
    - npx tailwindcss init -p
    - Edit tailwind.config.js, add this to content:
        ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",]
    - Edit index.css and add this to the top of the page:
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
3. Install daisyui
    - Source: https://daisyui.com/docs/install/
    - pnpm i -D daisyui@latest
    - Edit tailwind.config.js and add this to plugins: [require("daisyui")],
    - For change themes, Edit tailwind.config.js and add this under plugins:
        daisyui: {
                themes: ["light", "dark", "cupcake"],
            },
      Then edit index.html and add this to html tag: data-theme="light" tobe like this: <html lang="en" data-theme="light">
4. Install Box Icon
    - add this to index html: <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" /> or download it for offline usage
5. Install Redux
    - pnpm install react-redux @reduxjs/toolkit
    
6. Install API IndexDB
    - pnpm install idb
    - Library ini adalah API yang bisa digunakan untuk mengakses indexdb yang nantinya akan digunakan sebagai tempat penyimpanan redux store

7. Install react-beautiful-dnd
    - Library ini untuk fitur drag and drop
8. Install redux-saga
    - Library ini untuk akses ke middleware api dengan redux
9. Flow Login React x JWT x Express
    - React setiap request ke server harus menyertakan token
    - Setiap route di server harus verify token, jika tidak ada response dengan 400