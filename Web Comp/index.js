import './driver-list.js';
import './dirver-details.js';

const driverListComp = document.querySelector('driver-list');
const driverDetailsComp = document.querySelector('driver-details');

driverListComp.addEventListener('driver-selected', (event) => {
    driverDetailsComp.driver = event.detail;
});

fetch('https://ergast.com/api/f1/2021/drivers.json')
    .then(res => res.json())
    .then(data => {
        const drivers = data.MRData.DriverTable.Drivers;
        driverListComp.drivers = drivers;
        driverDetailsComp.driver = drivers[0];
    });