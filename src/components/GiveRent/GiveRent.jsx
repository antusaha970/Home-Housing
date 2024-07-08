import give_rent from "../../assets/stock/give_rent.png";
const GiveRent = () => {
  return (
    <section className="container my-4">
      <div className="row align-items-center">
        <div className="col-12 col-sm-12 col-md-6">
          <img src={give_rent} alt="give rent" className="img-fluid" />
        </div>
        <div className="col-12 col-sm-12 col-md-6">
          <h3 className="text-center fw-bold">
            Do you want to give your home advertisement?
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint vitae
            corrupti laborum. At, laborum quis. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Ratione molestiae nisi eos. Veniam sed
            aliquid, nulla quisquam illo architecto voluptatibus quae, quasi
            expedita cumque vitae eaque nesciunt molestiae quas sunt.
          </p>
          <button className="btn btn-success">Give advertisement</button>
        </div>
      </div>
    </section>
  );
};

export default GiveRent;
