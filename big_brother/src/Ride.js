export class Ride {
    constructor(id,date, time, childId, childName, pickupAddr, destAddr, notes, driverId, driverName) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.childId = childId;
        this.childName = childName;
        this.pickupAddr = pickupAddr;
        this.destAddr = destAddr;
        this.notes = notes;
        this.driverId = driverId;
        this.driverName = driverName;
    }
}