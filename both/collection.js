import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

let Schema = {};

Schema.Task = new SimpleSchema({
    name:{
        type:String,
        label:"Name",
        max:50
    },
    gender:{
        type:String,
        label:"Gender",
        max:10
    },
    age:{
        type:Number,
        label:"Age"
    }
});

Tasks.attachSchema(Schema.Task);