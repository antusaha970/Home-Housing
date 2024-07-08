import "./Loader.css";

const Loader = () => {
  return (
    <div className="w-100 d-flex justify-content-center align-content-center">
      <div className="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
