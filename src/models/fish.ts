import mongoose, { Schema } from "mongoose";

interface IFunFacts {
    fact: string;
}

interface IFish {
    sprite: string;
    species: string;
    description: string;
    price: number;
    height: number;
    width: number;
    funFacts: IFunFacts[];
}

const FunFactSchema = new Schema<IFunFacts>({
    fact: {
        type: String,
        required: true
    }
});

const FishSchema = new Schema<IFish>({
    sprite: {
        type: String,
        required: [true, 'Sprite is Required']
    },
    species: {
        type: String,
        required: [true, 'Species is Required']
    },
    description: {
        type: String,
        required: [true, 'Description is Required']
    },
    price: {
        type: Number,
        required: [true, 'Price is Required'],
        min: 0
    },
    height: {
        type: Number,
        required: [true, 'Height is Required'],
        min: 1
    },
    width: {
        type: Number,
        required: [true, 'Width is Required'],
        min: 1
    },
    funFacts: {
        type: [FunFactSchema],
        default: []
    }
});

const Fish = mongoose.model<IFish>('Fish', FishSchema);

export default Fish;