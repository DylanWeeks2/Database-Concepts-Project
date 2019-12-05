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
import { ParentUser, DriverUser, Ride, Child } from '../models';
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
        const ps = createHash('sha256');
        ps.update(password);
        password = ps.digest('hex');
        console.log("login password", password);
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
         const ps = createHash('sha256');
         ps.update(parent.password);
         parent.password = ps.digest('hex');
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addParent`, parent, this.config)
            .then(resp => {
                console.log("data", resp.data);
                let parent = new ParentUser(resp.data.user.id, resp.data.user.email, resp.data.user.phone, resp.data.user.homeAddr, 
                    resp.data.user.workAddr, resp.data.user.name, null, resp.data.user.password, resp.data.user.username);
                resolve(parent);
            })
            .catch(resp => alert(resp));
        });
    }

    getParent(parentId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getParent`, parentId, this.config)
            .then(resp => {
                console.log("data", resp.data);
                let parent = new ParentUser(resp.data.user.id, resp.data.user.email, resp.data.user.phone, resp.data.user.homeAddr, 
                    resp.data.user.workAddr, resp.data.user.name, null, resp.data.user.password, resp.data.user.username);
                resolve(parent);
            })
            .catch(resp => console.log(resp));
        });
    }

    getParentWithChildren(parentId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getParentChildren`, parentId, this.config)
                .then(parent => {
                    let kids = [];
                    parent.data.user.children.forEach(child => {
                        kids.push(new Child(child["name"], child["grade"], child["school"],
                        child["healthConditions"], child["username"], child["id"], child["password"]));
                    });
                    let ret = new ParentUser(parent["id"], parent["email"], parent["phone"], parent["homeAddr"],
                    parent["workAddr"], parent["name"], kids, parent["password"], parent["username"]);
                    resolve(ret);
                });
        })
    }

    // changeParentPassword(parentId, newPassword) {
    //     return new Promise((resolve, reject) => {
    //         axios.put(`${this.url}/changeParentPassword`, parentId, newPassword, this.config)
    //         .then(resp => resolve(resp.data)/*handle successful change*/)
    //         .catch(resp => /*handle failed pass change*/);
    //     });
    // }

    addDriver(driver) {
        const ps = createHash('sha256');
        ps.update(driver.password);
        driver.password = ps.digest('hex');
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addDriver`, driver, this.config)
            .then(resp => {
                console.log("data", resp.data);
                driver = new DriverUser(resp.data.user.id, resp.data.user.name, resp.data.user.gender, resp.data.user.bio, resp.data.user.email, resp.data.user.phone, resp.data.user.make, resp.data.user.model, resp.data.user.year, resp.data.user.color, resp.data.user.liscense, resp.data.user.numSeats, resp.data.user.condition, resp.data.user.ammenities,resp.data.user.username, resp.data.user.password);
                resolve(driver);})
            .catch(resp => alert(resp));
        });
    }

    getDriver(driverId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getDriver`, {params: {id: driverId}}, this.config)
            .then(resp => resolve(resp.data) /*handle successful get*/)
            .catch(resp => alert(resp));
        });
    }

    updateDriver(driver) {
        console.log("updating driver");
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/updateDriver`, driver, this.config)
            .then(resp => { resolve(driver);})
            .catch(resp => alert(resp));
        });

    }

    addService(service) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addService`, service, this.config);
        });
    }

    getServices(driverId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getServices`, {params: {id: driverId}}, this.config)
            .then(resp => resolve(resp.data) /*handle successful get*/)
            .catch(resp => alert(resp));
        });
    }

    addAccident(accident) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addAccident`, accident, this.config);
        });
    }

    getAccidents(driverId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getAccidents`, {params: {id: driverId}}, this.config)
            .then(resp => resolve(resp.data) /*handle successful get*/)
            .catch(resp => alert(resp));
        });
    }

    addAvailability(availability) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addAvailability`, availability, this.config);
        });
    }

    getAvailabilities(driverId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getAvailabilities`, {params: {id: driverId}}, this.config)
            .then(resp => resolve(resp.data) /*handle successful get*/)
            .catch(resp => alert(resp));
        });
    }

    // addChild(child) {
    //     return new Promise((resolve, reject) => {
    //         axios.post(`${this.url}/addChild`, child, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful add*/)
    //         .catch(resp => alert(resp));
    //     });
    // }

    // getChild(childId) {
    //     return new Promise((resolve, reject) => {
    //         axios.get(`${this.url}/getChild`, childId, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful get*/)
    //         .catch(resp => alert(resp));
    //     });
    // }

    // updateChild(childId, child) {
    //     return new Promise((resolve, reject) => {
    //         axios.put(`${this.url}/updateChild`, childId, child, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful update*/)
    //         .catch(resp => alert(resp));
    //     });
    // }


    //This needs to be changed when we kknow what the actual route for getting drivers is
    getAvailableDrivers(dateTime) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/something`, dateTime, this.config)
            //.then(resp => )
            //.catch(resp => alert(resp))
        });
    }

     addRide(ride) {
         return new Promise((resolve, reject) => {
             axios.post(`${this.url}/addRideSchedule`, {pick_up_location: ride.pickupAddr, drop_off_location: ride.destAddr, pick_up_time: ride.pickupAddr, drop_off_time: ride.dropoff_time, active: 1, child: ride.childId, driver: ride.driverId}, this.config)
             .then(resp => {
                 resolve(resp.data); //returning the id of the ride
             })
             .catch(resp => alert(resp));
         });
     }

     //Get the rides a parent has ordered
     getRides(parentId) {
         return new Promise((resolve, reject) => {
             axios.get(`${this.url}/getRideSchedule`, parentId, this.config)
                .then(rides => {
                    let activeRides = [];
                    let pastRides = [];
                    rides.forEach(ride => {
                        if (ride["active"] == 0) {
                            pastRides.push(new Ride(ride["id"], ride["pick_up_time"], ride["drop_off_time"], 
                            ride["child"], ride["childName"], ride["pick_up_location"], ride["drop_off_location"],
                            ride["notes"], ride["driver"], ride["driverName"], new Child(null)));
                        } else {
                            activeRides.push(new Ride(ride["id"], ride["pick_up_time"], ride["drop_off_time"], 
                            ride["child"], ride["childName"], ride["pick_up_location"], ride["drop_off_location"],
                            ride["notes"], ride["driver"], ride["driverName"], new Child(null)));
                        }
                    });
                    let ret = { activeRides: activeRides, pastRides: pastRides };
                    resolve(ret);
                });
         });
     }

     cancelParentRide(rideId) {
         return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/deleteRideSchedule`, rideId, this.config)
            .then(resp => resolve(resp.data))
            .catch(resp => alert(resp));
         });
     }

     getRidesDriver(driverId) {
         return new Promise((resolve, reject) => {
             axios.get(`${this.url}/getDriverSchedule`, driverId, this.config)
                .then(rides => {
                    let ret = [];
                    rides.forEach(ride => {
                        ret.push(new Ride(ride["id"], ride["pick_up_time"], ride["drop_off_time"], ride["childId"], ride["childName"],
                        ride["pick_up_location"], ride["drop_off_location"], "", ride["driver"], "", 
                        new Child(ride["name"], ride["grade"], ride["school"], ride["health"], ride["username"], ride["id"], ride["password"])));
                    });
                    resolve(ret);
                })
         });
     }

     getRidesChild(childId) {
         return new Promise((resolve, reject) => {
             axios.get(`${this.url}/getChildSchedule`, childId, this.config)
                .then(rides => {
                    let ret = [];
                    rides.forEach(ride => {
                        ret.push(new Ride(ride["id"], ride["pick_up_time"], ride["drop_off_time"], ride["childId"], ride["childName"],
                        ride["pick_up_location"], ride["drop_off_location"], "", ride["driver"], "", 
                        new Child(ride["name"], ride["grade"], ride["school"], ride["health"], ride["username"], ride["id"], ride["password"])));
                    });
                    resolve(ret);
                });
         });
     }

    // deleteRideSchedule(rideId) {
    //     return new Promise((resolve, reject) => {
    //         axios.delete(`${this.url}/deleteRideSchedule`, rideId, this.config)
    //         .then(re sp => resolve(resp.data) /*handle successful delete*/)
    //         .catch(resp => alert(resp));
    //     });
    // }

    // addCar(driverId, car) {
    //     return new Promise((resolve, reject) => {
    //         axios.post(`${this.url}/addCar`, driverId, car, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful get*/)
    //         .catch(resp => alert(resp));
    //     });
    // }

    // getCar(carId) {
    //     return new Promise((resolve, reject) => {
    //         axios.get(`${this.url}/getCar`, carId, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful get*/)
    //         .catch(resp => alert(resp));
    //     });
    // }

    // updateCar(carId, car) {
    //     return new Promise((resolve, reject) => {
    //         axios.put(`${this.url}/updateCar`, carId, car, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful get*/)
    //         .catch(resp => alert(resp));
    //     });
    // }

    // addCarService(carId, newService) {
    //     return new Promise((resolve, reject) => {
    //         axios.post(`${this.url}/addCarService`, carId, newService, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful addition*/)
    //         .catch(resp => alert(resp));
    //     });
    // }

    // addCarAccident(carId, newAccident) {
    //     return new Promise((resolve, reject) => {
    //         axios.put(`${this.url}/addCarAccident`, carId, newAccident, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful addition*/)
    //         .catch(resp => alert(resp));
    //     });
    // }


    // saveCreditCard(userId, creditCard) {
    //     return new Promise((resolve, reject) => {
    //         axios.post(`${this.url}/saveCreditCard`, userId, creditCard, this.config)
    //         .then(resp => resolve(resp.data)/*handle successful add*/)
    //         .catch(resp => alert(resp));
    //     });
    // }
}