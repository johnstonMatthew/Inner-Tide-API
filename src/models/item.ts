import mongoose, { Model, Schema } from "mongoose";

interface IItem {
    sprite: string;
    name: string;
    description: string;
    price : number;
    gridSpace : string;
}

const ItemSchema = new Schema<IItem> ({
    sprite : {
        type : String,
        required : [true, 'Sprite is Required']
    },
    name : {
        type : String,
        required : [true, 'Name is Required'],
        maxLength: 50
    },
    description : {
        type : String,
        required : [true, 'Description is Required']
    },
    price : {
        type : Number,
        required : [true, 'Price is Required'],
        minLength : 0
    },
    gridSpace : {
        type : String,
        required : [true, 'Grid Space is Required']
    }
});

//Declare the Model Definition, Then Make the Definition Public
const Item = mongoose.model<IItem>('Item', ItemSchema);
export default Item;