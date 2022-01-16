export class Book {
    public _id?: string;
    public title?: string;
    public author?: string;
    public numOfPages?: number;
    public dateFrom?: string;
    public dateTo?: string;
    public userId?: number;
    constructor() { 
        this._id = "";
    };

    // constructor(
    //     public _id: number,
    //     public title: string,
    //     public author: string,
    //     public numOfPages: number,
    //     public dateFrom: Date,
    //     public dateTo: Date,
    //     public userId: number
    // ){}
}
