export class ParentUser {
    constructor(id, email, phone, homeAddr, workAddr, name, children) {
        this.id = id;
        this.email = email;
        this.phone = phone;
        this.homeAddr = homeAddr;
        this.workAddr = workAddr;
        this.name = name;
        this.children = children;
    }
}