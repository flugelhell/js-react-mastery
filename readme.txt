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