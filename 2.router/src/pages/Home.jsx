import Layout from "./Layout";

export default function Home() {
  return (
    <Layout>
      <div className="w-fit mx-auto">
        <h1 className="font-bold text-xl m-4">Home Page</h1>
        <div className="flex justify-center">
          <div className="card card-compact w-60 bg-base-100 shadow-xl rounded-none m-4 pt-1">
            <figure className="w-60 h-64 bg-[url('/images/js.png')] bg-cover bg-no-repeat bg-center bg-origin-content p-4"></figure>
            <div className="card-body">
              <h2 className="card-title">JS</h2>
            </div>
          </div>
          <div className="card card-compact w-60 bg-base-100 shadow-xl rounded-none m-4">
            <figure className="w-60 h-64 bg-[url('/images/react.png')] bg-cover bg-no-repeat bg-center bg-origin-content p-4"></figure>
            <div className="card-body">
              <h2 className="card-title">React</h2>
            </div>
          </div>
          <div className="card card-compact w-60 bg-base-100 shadow-xl rounded-none m-4">
            <figure className="w-60 h-64 bg-[url('/images/vue.png')] bg-cover bg-no-repeat bg-center bg-origin-content p-4"></figure>
            <div className="card-body">
              <h2 className="card-title">Vue</h2>
            </div>
          </div>
          <div className="card card-compact w-60 bg-base-100 shadow-xl rounded-none m-4">
            <figure className="w-60 h-64 bg-[url('/images/svelte.png')] bg-cover bg-no-repeat bg-center bg-origin-content p-4"></figure>
            <div className="card-body">
              <h2 className="card-title">Svelte</h2>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
