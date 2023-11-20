import { useState, useEffect } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  // initially set the theme and "listen" for changes to apply them to the HTML tag
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="navbar bg-base-100 dark:bg-base-200 shadow">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">React Router</a>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Link</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2 bg-base-100 dark:bg-base-200 rounded-sm ">
                  <li>
                    <a>Link 1</a>
                  </li>
                  <li>
                    <a>Link 2</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-none">
        <label className="swap swap-rotate">
          <input onClick={toggleTheme} type="checkbox" />
          <div className="swap-on">DARKMODE</div>
          <div className="swap-off">LIGHTMODE</div>
        </label>

        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn m-1">
            Click
          </label>
          <ul tabIndex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-sm w-52">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn m-1">
            Click
          </label>
          <ul tabIndex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-sm w-52">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
