import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  // initially set the theme and "listen" for changes to apply them to the HTML tag
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="navbar shadow shadow-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">React Router</a>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to={`/`} className={({ isActive, isPending }) => (isActive ? "active" : isPending ? "pending" : "")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={`/about`} className={({ isActive, isPending }) => (isActive ? "active" : isPending ? "pending" : "")}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to={`/contact`} className={({ isActive, isPending }) => (isActive ? "active" : isPending ? "pending" : "")}>
                Contact
              </NavLink>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2 rounded-sm bg-base-200">
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
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-sm btn-ghost m-1 font-normal">
            Theme <i className="bx bxs-chevron-down"></i>
          </label>
          <ul tabIndex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-sm w-52">
            <li>
              <a className={theme == "light" ? "bg-primary text-neutral-content" : ""} onClick={() => setTheme("light")}>
                Light
                {theme == "light" && <span className="text-right">✓</span>}
              </a>
            </li>
            <li>
              <a className={theme == "dark" ? "bg-primary  text-info-content" : ""} onClick={() => setTheme("dark")}>
                Dark
                {theme == "dark" && <span className="text-right">✓</span>}
              </a>
            </li>
            <li>
              <a className={theme == "fantasy" ? "bg-primary  text-neutral-content" : ""} onClick={() => setTheme("fantasy")}>
                Fantasy
                {theme == "fantasy" && <span className="text-right">✓</span>}
              </a>
            </li>
            <li>
              <a className={theme == "dracula" ? "bg-primary  text-neutral-content" : ""} onClick={() => setTheme("dracula")}>
                Dracula
                {theme == "dracula" && <span className="text-right">✓</span>}
              </a>
            </li>
            <li>
              <a className={theme == "corporate" ? "bg-primary  text-neutral-content" : ""} onClick={() => setTheme("corporate")}>
                Corporate
                {theme == "corporate" && <span className="text-right">✓</span>}
              </a>
            </li>
            <li>
              <a className={theme == "business" ? "bg-primary  text-neutral-content" : ""} onClick={() => setTheme("business")}>
                Business
                {theme == "business" && <span className="text-right">✓</span>}
              </a>
            </li>
          </ul>
        </div>

        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost m-1 font-normal hover:bg-transparent">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-12">
                <span>MX</span>
              </div>
            </div>
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
