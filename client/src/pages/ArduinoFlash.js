import Avrgirl from 'avrgirl-arduino';

const ArduinoFlash = (fileInput) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(fileInput.current.files[0]);
    
    reader.onload = event => {
        const fileContents = event.target.result;
        
        const avrgirl = new Avrgirl({
            board: 'mega'
          });
          
        avrgirl.flash(fileContents, error => {
            if (error) {
              console.error(error);
            } else {
              console.info('Flash successful.');
            }
        });
    };
};

export default ArduinoFlash;