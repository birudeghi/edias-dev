import SerialPort from 'avrgirl-arduino/lib/browser-serialport';

const ArduinoInitialise = (baud) => {
    return new Promise((resolve, reject) => {
        const port = new SerialPort({
            baudRate: baud
        });
    
        port.open(function (error) {
            if (error) {
                console.log("Failed to open: " + error);
                reject(false);
            } else {
                if (port.isOpen) {
                    resolve(true);
                }
            }
        });
    })    
    
}

export default ArduinoInitialise;