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

    url = "http://13.59.12.131:3000" //hello
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
            axios.get(`${this.url}/getParent`, {params: {id: parentId}}, this.config)
            .then(resp => {
                console.log("data", resp.data);
                let parent = new ParentUser(resp.data.data[0].id, resp.data.data[0].email, resp.data.data[0].phone, resp.data.data[0].homeAddr, 
                    resp.data.data[0].workAddr, resp.data.data[0].name, [], resp.data.data[0].password, resp.data.data[0].username);
                resolve(parent);
            })
            .catch(resp => console.log(resp));
        });
    }

    getParentWithChildren(parentId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getParentAndChildInfo`, {params: {id: parentId}}, this.config)
                .then(parent => {
                    let kids = [];
                    if(parent.data.data.length != 0) {
                        parent.data.data.forEach(child => {
                            kids.push(new Child(child["childName"], child["grade"], child["school"],
                            child["healthConditions"], child["childUsername"], child["childID"], child["childPass"]));
                        });    
                    }
                    let ret = new ParentUser(parent.data.data[0]["parentID"], parent.data.data[0]["email"], parent.data.data[0]["phone"], parent.data.data[0]["homeAddr"],
                    parent.data.data[0]["workAddr"], parent.data.data[0]["parentName"], kids, parent.data.data[0]["parentPass"], parent.data.data[0]["parentUsername"]);
                    resolve(ret);
                });
        })
    }

    updateParent(email, phone, homeAddr, workAddr, name) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/updateParent`, {email: email, phone: phone, homeAddr: homeAddr, workAddr: workAddr, name: name}, this.config)
            .then(resp => resolve(resp));
        });
    }
    // changeParentPassword(parentId, newPassword) {
    //     return new Promise((resolve, reject) => {
    //         axios.put(`${this.url}/changeParentPassword`, parentId, newPassword, this.config)
    //         .then(resp => resolve(resp.data)/*handle successful change*/)
    //         .catch(resp => /*handle failed pass change*/);
    //     });
    // }

    changePass(Id, newPassword, username) {
        return new Promise((resolve, reject) => {
            const ps = createHash('sha256');
            ps.update(newPassword);
            newPassword = ps.digest('hex');
            axios.put(`${this.url}/changePassword`, {newPassword: newPassword, userID: Id, username: username})
            .then(resp => resolve(resp.data))
            .catch(resp => alert(resp));
        });
    }

    addDriver(driver) {
        debugger;
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

    addChild(parentId, name, username, grade, school, health, password) {
        const ps = createHash('sha256');
        ps.update(password);
        password = ps.digest('hex');
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addChild`, {parentID: parentId, name: name, username: username, grade: grade, school: school, healthConditions: health, password: password}, this.config)
            .then(resp => resolve(resp.data) /*handle successful add*/)
            .catch(resp => alert(resp));
        });
    }

    // getChild(childId) {
    //     return new Promise((resolve, reject) => {
    //         axios.get(`${this.url}/getChild`, childId, this.config)
    //         .then(resp => resolve(resp.data) /*handle successful get*/)
    //         .catch(resp => alert(resp));
    //     });
    // }

    getChildren(parentId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getChildOfParent`, {params: {parent: parentId}}, this.config)
            .then(resp => {
                resolve(resp.data.data);
            })
        })
    }

    updateChild(name, grade, school, health, username, password, id) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/updateChild`, {name: name, grade: grade, username: username, password: password, id: id, healthConditions: health, school: school}, this.config)
            .then(resp => resolve(resp.data) /*handle successful update*/)
            .catch(resp => alert(resp));
        });
    }


    //This needs to be changed when we kknow what the actual route for getting drivers is
    getAvailableDrivers(dateTime) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/something`, dateTime, this.config)
            //.then(resp => )
            //.catch(resp => alert(resp))
        });
    }

     addRide(parentId, ride) {
         return new Promise((resolve, reject) => {
             axios.post(`${this.url}/addRideSchedule`, {pick_up_location: ride.pickupAddr, drop_off_location: ride.destAddr, pick_up_time: ride.pickupAddr, drop_off_time: ride.dropoff_time, child: ride.childId, driver: ride.driverId, parent: parentId}, this.config)
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
                    if(rides.data.data.length != 0) {
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
                    }
                    let ret = { activeRides: activeRides, pastRides: pastRides };
                    resolve(ret);
                });
         });
     }

     cancelParentRide(id) {
         return new Promise((resolve, reject) => {
            axios.post(`${this.url}/deleteRideSchedule`, id, this.config)
            .then(resp => resolve(resp.data))
            .catch(resp => alert(resp));
         });
     }

     cancelDriverRide(id) {
         return new Promise((resolve, reject) => {
            axios.post(`${this.url}/deleteRideSchedule`, id, this.config)
            .then(resp => resolve(resp.data))
            .catch(resp => alert(resp));
         });
     }

     getRidesDriver(driverId) {
         return new Promise((resolve, reject) => {
             axios.get(`${this.url}/getDriverSchedule`, {params: {driver: driverId}}, this.config)
                .then(rides => {
                    let ret = [];
                    if(rides.data.data.length != 0) {
                        rides.data.data.forEach(ride => {
                            ret.push(new Ride(ride["rideID"], ride["pick_up_time"], ride["drop_off_time"], ride["childID"], ride["name"],
                            ride["pick_up_location"], ride["drop_off_location"], "", ride["driver"], "", 
                            new Child(ride["name"], ride["grade"], ride["school"], ride["healthConditions"], ride["username"], ride["childID"], ride["password"])));
                        });
                    }
                    resolve(ret);
                })
         });
     }

     getRidesChild(childId) {
         return new Promise((resolve, reject) => {
             axios.get(`${this.url}/viewRideSchedule`, childId, this.config)
                .then(rides => {
                    let ret = [];
                    if(rides.data.data.length != 0) {
                        rides.forEach(ride => {
                            ret.push(new Ride(ride["id"], ride["pick_up_time"], ride["drop_off_time"], ride["childId"], ride["childName"],
                            ride["pick_up_location"], ride["drop_off_location"], "", ride["driver"], "", 
                            new Child(ride["name"], ride["grade"], ride["school"], ride["health"], ride["username"], ride["id"], ride["password"])));
                        });    
                    }
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