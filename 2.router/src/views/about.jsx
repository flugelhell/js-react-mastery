import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="container grow m-2 mx-auto">
        <h1 className="font-bold my-4 text-xl">About Page</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis odio provident mollitia natus? Culpa reprehenderit, temporibus dolores illo voluptatem tempora, odit rem unde similique repudiandae cum neque. Ratione sunt, voluptatibus ad dolor quas temporibus voluptas?</p>
      </div>
      <Footer />
    </>
  );
}
