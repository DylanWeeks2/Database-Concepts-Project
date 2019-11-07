export class Ride {
    constructor(date, time, childId, childName, pickupAddr, destAddr, notes) {
        this.date = date;
        this.time = time;
        this.childId = childId;
        this.childName = childName;
        this.pickupAddr = pickupAddr;
        this.destAddr = destAddr;
        this.notes = notes;
    }
}