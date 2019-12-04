/* eslint eqeqeq: "off" */

/* 
Think about making JSON objects during calls
what is addDriverSchedule endpoint
What are any of driverschedule calls
there should be an endpoint for transactions, not getting a cc
creating parent account is all wrong
There's no login endpoint -- working on it
changePasswords should be a put request
Car services and Accidents should be adds, not updates
*/
import axios from 'axios';
import { createHash } from 'crypto';
import { StorageManager } from './../app/StorageManager';
import { ParentUser, DriverUser } from '../models';
import { Link } from 'react-router-dom';

export class Repo {
    storage = new StorageManager();

    url = "http://192.168.99.100:3000"
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
    
    login(username, password) {
        let obj = {
            username: username,
            password: password
        };
        console.log("obj: ", obj);
        const bodyFormData = new FormData();

        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/login`, { params: {username: username, password: password}})
            .then(resp => resolve(resp.data)/*handle receiving parent info*/)
            .catch(resp => alert(resp));
        });
    }
    addParent(parent) {
        // const ps = createHash('sha256');
        // ps.update(parent.password);
        // parent.password = ps.digest('hex');
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addParent`, parent, this.config)
            .then(resp => {
                console.log("data", resp.data);
                parent = new ParentUser(resp.data.user.id, resp.data.user.email, resp.data.user.phone, resp.data.user.homeAddr, resp.data.user.workAddr, resp.data.user.name, null, resp.data.user.password, resp.data.user.username);
                resolve(parent);})
            .catch(resp => alert(resp));
        });
    }

    getParent(parentId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getParent`, parentId, this.config)
            .then(resp => {
                
                resolve(resp.data);
            })
            .catch(resp => console.log(resp));
        });
    }

    // changeParentPassword(parentId, newPassword) {
    //     return new Promise((resolve, reject) => {
    //         axios.put(`${this.url}/changeParentPassword`, parentId, newPassword, this.config)
    //         .then(resp => resolve(resp.data)/*handle successful change*/)
    //         .catch(resp => /*handle failed pass change*/);
    //     });
    // }

    addDriver(driver) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addDriver`, driver, this.config)
            .then(resp => {
                console.log("data", resp.data);
                driver = new DriverUser(resp.data.user.id, resp.data.user.name, resp.data.user.gender, resp.data.user.bio, resp.data.user.email, resp.data.user.phone, resp.data.user.make, resp.data.user.model, resp.data.user.year, resp.data.user.color, resp.data.user.liscense, resp.data.user.numSeats, resp.data.user.condition, resp.data.user.ammenities,resp.data.user.username, resp.data.user.password);
                resolve(driver);})
            .catch(resp => alert(resp));
        });
    }

    // getDriver(driverId) {
    //     return new Promise((resolve, reject) => {
    //         axios.get(`${this.url}/getDriver`, driverId, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful get*/)
    //         .catch(resp => alert(resp));
    //     });
    // }

    // addChild(child) {
    //     return new Promise((resolve, reject) => {
    //         axios.post(`${this.url}/addChild`, child, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful add*/)
    //         .catch(resp => /*handle failure */);
    //     });
    // }

    // getChild(childId) {
    //     return new Promise((resolve, reject) => {
    //         axios.get(`${this.url}/getChild`, childId, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful get*/)
    //         .catch(resp => /*handle failure */);
    //     });
    // }

    // updateChild(childId, child) {
    //     return new Promise((resolve, reject) => {
    //         axios.put(`${this.url}/updateChild`, childId, child, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful update*/)
    //         .catch(resp => /*handle failure */);
    //     });
    // }

    // addRideSchedule(ride) {
    //     return new Promise((resolve, reject) => {
    //         axios.post(`${this.url}/addRideSchedule`, ride, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful post*/)
    //         .catch(resp => /*handle failure */);
    //     });
    // }

    // getRideSchedule(childId) {
    //     return new Promise((resolve, reject) => {
    //         axios.get(`${this.url}/getRideSchedule`, childId, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful get*/)
    //         .catch(resp => /*handle failure */);
    //     });
    // }

    // deleteRideSchedule(rideId) {
    //     return new Promise((resolve, reject) => {
    //         axios.delete(`${this.url}/deleteRideSchedule`, rideId, this.config)
    //         .then(re sp => resolve(resp.data) /*handle successful delete*/)
    //         .catch(resp => /*handle failure */);
    //     });
    // }

    // addCar(driverId, car) {
    //     return new Promise((resolve, reject) => {
    //         axios.post(`${this.url}/addCar`, driverId, car, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful get*/)
    //         .catch(resp => /*handle failure */);
    //     });
    // }

    // getCar(carId) {
    //     return new Promise((resolve, reject) => {
    //         axios.get(`${this.url}/getCar`, carId, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful get*/)
    //         .catch(resp => /*handle failure */);
    //     });
    // }

    // updateCar(carId, car) {
    //     return new Promise((resolve, reject) => {
    //         axios.put(`${this.url}/updateCar`, carId, car, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful get*/)
    //         .catch(resp => /*handle failure */);
    //     });
    // }

    // addCarService(carId, newService) {
    //     return new Promise((resolve, reject) => {
    //         axios.post(`${this.url}/addCarService`, carId, newService, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful addition*/)
    //         .catch(resp => /*handle failure */);
    //     });
    // }

    // addCarAccident(carId, newAccident) {
    //     return new Promise((resolve, reject) => {
    //         axios.put(`${this.url}/addCarAccident`, carId, newAccident, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful addition*/)
    //         .catch(resp => /*handle failure */);
    //     });
    // }


    // saveCreditCard(userId, creditCard) {
    //     return new Promise((resolve, reject) => {
    //         axios.post(`${this.url}/saveCreditCard`, userId, creditCard, this.config)
    //         .then(resp => resolve(resp.data)/*handle successful add*/)
    //         .catch(resp => /*handle failed cc add*/);
    //     });
    // }
}