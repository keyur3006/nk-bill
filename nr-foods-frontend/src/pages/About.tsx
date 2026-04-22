import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div>
      <Navbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="mt-4">
          We provide clean and fresh drinking water bottles.
        </p>
      </div>
    </div>
  );
};

export default About;