import { useState } from "react";
import faq from "../../assets/stock/faq.png";
import "./faq.css";

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const accordion_title = [
    "Do i have to pay any hidden charge?",
    "Can i visit the property first?",
    "Do i have to pay to post advertisements?",
  ];

  return (
    <section className="container my-4">
      <h3 className="fw-bold text-center">Frequently Asked questions</h3>
      <div className="row align-items-center">
        <div className="col-12 col-md-6 col-sm-12">
          <img
            data-aos="fade-right"
            src={faq}
            alt="faq"
            className="img-fluid"
          />
        </div>
        <div className="col-12 col-md-6 col-sm-12">
          {/* faq sections */}
          <div className="container">
            <div className="row">
              <div className="">
                <div
                  className="panel-group"
                  id="accordion"
                  role="tablist"
                  aria-multiselectable="true"
                >
                  {accordion_title.map((section, index) => (
                    <div className="panel panel-default" key={index}>
                      <div
                        className="panel-heading"
                        role="tab"
                        id={`heading${index + 1}`}
                      >
                        <h4 className="panel-title">
                          <a
                            role="button"
                            onClick={() => toggleAccordion(index)}
                            aria-expanded={activeIndex === index}
                            aria-controls={`collapse${index + 1}`}
                            className={activeIndex === index ? "" : "collapsed"}
                          >
                            {section}
                          </a>
                        </h4>
                      </div>
                      <div
                        id={`collapse${index + 1}`}
                        className={`panel-collapse collapse ${
                          activeIndex === index ? "in" : ""
                        }`}
                        role="tabpanel"
                        aria-labelledby={`heading${index + 1}`}
                      >
                        <div className="panel-body">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Praesent nisl lorem, dictum id pellentesque
                            at, vestibulum ut arcu. Curabitur erat libero,
                            egestas eu tincidunt ac, rutrum ac justo. Vivamus
                            condimentum laoreet lectus, blandit posuere tortor
                            aliquam vitae. Curabitur molestie eros.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* faq sections */}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
