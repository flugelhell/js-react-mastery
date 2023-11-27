import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex mx-auto my-auto">
      <div>
        <div className="bx bxs-skull text-[12rem] font-extrabold w-full text-center"></div>
        <div className="text-2xl text-center">
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </div>
    </div>
  );
}
