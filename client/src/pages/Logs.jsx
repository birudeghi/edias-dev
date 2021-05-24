import React, { useRef } from 'react';
import "./getstarted.scss";
import { Accordion } from 'bootstrap';
import ArduinoFlash from './ArduinoFlash';

const Logs = props => {
  const fileInput = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    ArduinoFlash(fileInput);
  }

  return (
        <div className="col-md-9 col-lg-10 get-started-container">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
              <h1 className="h2">Dashboard</h1>
            </div>
            <form onSubmit={handleSubmit} className="get-started-form">
              <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Upload your sketch to Edias
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              Once the sketch (.ino file) is uploaded, we will transform a copy of your code to enable detailed analytics on the variables and serial connections.
              <div class="mb-3">
                <input className="form-control" type="file" ref={fileInput} id="formFile" />
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Connect your board
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              Connect your board through USB to your computer. Nothing will happen on your window, this is normal.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Start testing your code
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              You can start testing your uploaded code! Press <strong>Start</strong> button to choose the board from the pop-up, and see the magic happen!
              <input type="submit" value="Start" className="submit-button" />
            </div>
          </div>
        </div>
      </div>
      </form>
      </div>
    );
}

export default GetStarted;