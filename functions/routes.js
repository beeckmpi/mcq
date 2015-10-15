var OnBeforeActions;

OnBeforeActions = {
  loginRequired: function(route, asd, pause) {
    if (!Meteor.userId()) {
      this.render('Login');
    } else {
      this.next();
    }
  },
  setPreferences: function(route, asd, pause){
    var user = Meteor.user();
    if(Meteor.userId() && user.profile['username']==undefined){
      this.render('setMagePreferences');
    } else  {
      this.next();
    }
  },
  classSelectRequired: function(route, asd, pause){
    var user = Meteor.user();
    if(Meteor.userId() && user.profile['userClass']==undefined){
      this.render('setMageClass');
    } else  {
      this.next();
    }
  }
};
Router.onBeforeAction(OnBeforeActions.loginRequired, {
  except: ['about', 'announcements', 'blog', 'gameRules', 'login', 'register', 'statistics']
});
Router.onBeforeAction(OnBeforeActions.setPreferences);
Router.onBeforeAction(OnBeforeActions.classSelectRequired);
Router.route('/', function(){
  this.render('Home');
});
Router.route('/register', function () {
 this.render('Register');
});