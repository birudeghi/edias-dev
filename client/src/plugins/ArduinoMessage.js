import Avrgirl from 'avrgirl-arduino/dist/avrgirl-arduino';

const ArduinoMessage = (data) => {
    const blob = new Blob([data],{type:'text/plain;charset=UTF-8'});
    const reader = new FileReader();

    reader.readAsArrayBuffer(blob);
    
    reader.onload = event => {
        const message = event.target.result;
        
        const avrgirl = new Avrgirl({
            board: 'mega'
          });
          
        avrgirl.sendMessage(message, error => {
            if (error) {
              console.error(error);
            } else {
              console.info('Package sent.');
            }
        });
    };

};

export default ArduinoMessage;