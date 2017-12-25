import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import numeral from 'numeral';
import moment from 'moment';

//Collection
import { Tasks } from '../both/collection.js'
import { Books } from '../both/common.js';
import './main.html';


let localCollection = new Mongo.Collection(null);

Template.data.onCreated(function helloOnCreated() {
  const instance = Template.instance();
  loadData(instance);
  console.log(moment().add(2, 'days').calendar());
  this.infos = new ReactiveVar();
  this.txtid = new ReactiveVar();
  this.txtgender = new ReactiveVar();
  this.txtage = new ReactiveVar();
  this.txtname = new ReactiveVar();
  this.txtdate = new ReactiveVar();
  this.txtnumber = new ReactiveVar();
});

Template.data.helpers({
  listAllTask() {
    const instance = Template.instance();
    return instance.infos.get();
  },
  txtid() {
    const instance = Template.instance();
    return instance.txtid.get();
  },
  txtname() {
    const instance = Template.instance();
    return instance.txtname.get();
  },
  txtgender() {
    const instance = Template.instance();
    return instance.txtgender.get()
  },
  txtage() {
    const instance = Template.instance();
    return instance.txtage.get();
  },
  txtdate() {
    const instance = Template.instance();
    return instance.txtdate.get();
  }
});

Template.data.events({
  'click [name="btn-add"]'(event, instance) {
    event.preventDefault();
    let name = instance.txtname.get();
    let gender = instance.txtgender.get();
    let age = instance.txtage.get();
    let insertOjb = {
      name: name,
      gender: gender,
      age: age
    };
    Meteor.call('insertData', insertOjb, (error, ers) => {
      alertify.success('Save Success');
    })
    loadData(instance);
    clearData(instance);
  },
  'click .remove'(event, instance) {

    let id = this._id;
    Meteor.call('removeinfo', id, (error, res) => {
      loadData(instance);
    })

  },
  'click .btn-edit'(event, instance) {
    instance.txtid.set(this._id);
    instance.txtname.set(this.name);
    instance.txtgender.set(this.gender);
    instance.txtage.set(this.age);
  },
  'click .btn-update'(event, instance) {
    event.preventDefault();
    let id = instance.txtid.get();
    let name = instance.txtname.get();
    let gender = instance.txtgender.get();
    let age = instance.txtage.get();
    let updateObj = {
      name: name,
      gender: gender,
      age: age
    };
    Meteor.call('updateData', id, updateObj, (error, res) => {
      alertify.success('Update Success');
      clearData(instance);
      loadData(instance);

    })
  },
  'click .btn-getdate'(event, instance) {
    event.preventDefault();
    let date = instance.txtdate.get();
    let number = instance.txtnumber.get();

    console.log(numeral(number).format('$0,0'));
  },
  'keyup [name="name"]'(event, instance) {
    instance.txtname.set(event.currentTarget.value);
  },
  'keyup [name="gender"]'(event, instance) {
    instance.txtgender.set(event.currentTarget.value);
  },
  'keyup [name="age"]'(event, instance) {
    instance.txtage.set(event.currentTarget.value);
  },
  'keyup [name="id"]'(event, instance) {
    instance.txtid.set(event.currentId.value);
  },
  'keyup [name="date"]'(event, instance) {
    instance.txtdate.set(event.currentTarget.value);
  },
  'click [name="date"]'(event, instance) {
    instance.txtdate.set(event.currentTarget.value);
  },
  'keyup [name="number"]'(event, instance) {
    instance.txtnumber.set(event.currentTarget.value);
  }
});

//load Data
function loadData(instance) {
  Meteor.call('getAllInfo', (error, result) => {
    instance.infos.set(result);
  });
}

//Clear
function clearData(instance) {
  id = instance.txtid.set('');
  name = instance.txtname.set('');
  gender = instance.txtgender.set('');
  age = instance.txtage.set('');
}
