/* eslint eqeqeq: "off" */

/* 
Think about making JSON objects during calls
what is addDriverSchedule endpoint
What are any of driverschedule calls
there should be an endpoint for transactions, not getting a cc
creating parent account is all wrong
There's no login endpoint
changePasswords should be a put request
Car services and Accidents should be adds, not updates
*/
import axios from 'axios';

import { StorageManager } from './../app/StorageManager';

export class Repo {
    storage = new StorageManager();

    url = "http://54.197.41.69:3000"
    config = {
        headers: {
            Authorization: "hdonofrio"
        }
    };

    testApi() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}`, this.config)
            .then(resp => console.log(resp))
            .catch(resp => console.log(resp));

        });
    }

    addParent(parent) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addParent`, parent, this.config)
            .then(resp => /*handle account creation*/)
            .catch(resp => /*handle failed account creation*/);
        });
    }

    getParent(parentId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getParent`, parentId, this.config)
            .then(resp => resolve(resp.data)/*handle receiving parent info*/)
            .catch(resp => console.log(resp));
        });
    }

    changeParentPassword(parentId, newPassword) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/changeParentPassword`, parentId, newPassword, this.config)
            .then(resp => resolve(resp.data)/*handle successful change*/)
            .catch(resp => /*handle failed pass change*/);
        });
    }

    addDriver(driver) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addParent`, driver, this.config)
            .then(resp => resolve(resp.data)/*handle successful account creation*/)
            .catch(resp => /*handle failed acc creation*/);
        });
    }

    getDriver(driverId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getDriver`, driverId, this.config)
            .then(resp => resolve(resp.data) /*handle successful get*/)
            .catch(resp => /*handle failure */);
        });
    }

    addChild(child) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addChild`, child, this.config)
            .then(resp => resolve(resp.data) /*handle successful add*/)
            .catch(resp => /*handle failure */);
        });
    }

    getChild(childId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getChild`, childId, this.config)
            .then(resp => resolve(resp.data) /*handle successful get*/)
            .catch(resp => /*handle failure */);
        });
    }

    updateChild(childId, child) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/updateChild`, childId, child, this.config)
            .then(resp => resolve(resp.data) /*handle successful update*/)
            .catch(resp => /*handle failure */);
        });
    }

    addRideSchedule(ride) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addRideSchedule`, ride, this.config)
            .then(resp => resolve(resp.data) /*handle successful post*/)
            .catch(resp => /*handle failure */);
        });
    }

    getRideSchedule(childId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getRideSchedule`, childId, this.config)
            .then(resp => resolve(resp.data) /*handle successful get*/)
            .catch(resp => /*handle failure */);
        });
    }

    deleteRideSchedule(rideId) {
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/deleteRideSchedule`, rideId, this.config)
            .then(resp => resolve(resp.data) /*handle successful delete*/)
            .catch(resp => /*handle failure */);
        });
    }

    addCar(driverId, car) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addCar`, driverId, car, this.config)
            .then(resp => resolve(resp.data) /*handle successful get*/)
            .catch(resp => /*handle failure */);
        });
    }

    getCar(carId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getCar`, carId, this.config)
            .then(resp => resolve(resp.data) /*handle successful get*/)
            .catch(resp => /*handle failure */);
        });
    }

    updateCar(carId, car) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/updateCar`, carId, car, this.config)
            .then(resp => resolve(resp.data) /*handle successful get*/)
            .catch(resp => /*handle failure */);
        });
    }

    addCarService(carId, newService) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addCarService`, carId, newService, this.config)
            .then(resp => resolve(resp.data) /*handle successful addition*/)
            .catch(resp => /*handle failure */);
        });
    }

    addCarAccident(carId, newAccident) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/addCarAccident`, carId, newAccident, this.config)
            .then(resp => resolve(resp.data) /*handle successful addition*/)
            .catch(resp => /*handle failure */);
        });
    }


    saveCreditCard(userId, creditCard) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/saveCreditCard`, userId, creditCard, this.config)
            .then(resp => resolve(resp.data)/*handle successful add*/)
            .catch(resp => /*handle failed cc add*/);
        });
    }
}