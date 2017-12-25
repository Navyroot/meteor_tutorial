import { Meteor } from 'meteor/meteor';
import { Tasks } from '../both/collection.js';


Meteor.startup(() => {
  Meteor.methods({
    'insertData'(insertOjb) {
      return Tasks.insert(insertOjb);
    },
    'getAllInfo'() {
      return Tasks.find().fetch();
    },
    'removeinfo'(id) {
      return Tasks.remove({ _id: id });
    },
    'updateData'(id, objupdate) {
      return Tasks.update({ _id: id }, { $set: objupdate });
    }
  })
});
