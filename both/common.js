import {Mongo} from 'meteor/mongo';

export const Books = new Mongo.Collection('books');

let Schema ={};

Schema.Book = new SimpleSchema({
    title:{
        type:String,
        label:"Title",
        max:200
    },
    author:{
        type:String,
        label:"Author"
    },
    price:{
        type:Number,
        label:"Price"
    }
});

Books.attachSchema(Schema.Book);