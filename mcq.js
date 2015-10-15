//users = new Meteor.Collection('users');
if (Meteor.isClient) {
  // counter starts at 0
 Template.Register.events({
   'submit #register-form': function(event, template){
     event.preventDefault();
     var data = {
       email: event.target.email.value,
       password: event.target.password.value,
       profile:{
         userType: 'normal',
         resources: {
           brimstone: 1000, 
           crystal: 1000, 
           essence: 1000, 
           granite: 1000,
           power: 1000
         }, 
         imps: {
           brimstone: 0,
           crystal: 0,
           essence: 0,
           granite: 0
         },
         // Add the player level en Xp
         character: {
           level: 1, 
           xp: 0
         }
       }
     };
     Accounts.createUser(data, function(err){
       if (err) {
         console.log(err);
         $('#messages').html(err).css('display', 'inherit');
       } else {
         $('#messages').html('You have successfully created an account. in a couple of minutes a mail will be sent to confirm your account.').css('display', 'inherit');
       }
     });
     return false;
   }
 });
 Template.setMagePreferences.events({
   'submit #setDetails': function(event, template){
      event.preventDefault();
      var username = event.target.username.value;
      var userID= Meteor.userId();
      var gender = event.target.gender.value;
      var age = event.target.age.value;
      Meteor.users.update(Meteor.userId(), {$set: {"profile.username": username, "profile.age": age, "profile.gender": gender}}, function(err, count){
        if(err) console.log(err);
        console.log(count);
        Accounts.setUsername(Meteor.userId(), username);
      });
      console.log(Meteor.user());
      return false;
   }
 });
 Template.setMageClass.events({
   'click .chooseClass': function(event){
     event.preventDefault();
      var userClass = $(event.currentTarget).attr('id');
      console.log(userClass);
      Meteor.users.update(Meteor.userId(), {$set: {"profile.userClass": userClass}}, function(err, count){
        if(err) console.log(err);
        console.log(count);
      });
     return false;
   },
 });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
