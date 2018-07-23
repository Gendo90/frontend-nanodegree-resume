/*
This is empty on purpose! Your code to build the resume will go here.
 */
model ={
  //work sub-object for the model, contains personal info
  work: {
    name: "Patrick Gendotti",
    role: "Engineer",
    contacts: {
      mobile: "(650) 455-0086",
      email: "patrick.gendotti@gmail.com",
      github: "Gendo90",
      twitter: "",
      location: "SF Bay Area"
    },

  welcomeMessage: "It's nice of you to stop by!",
  skills: ["JavaScript", "JQuery", "MatLab", "Python", "CSS", "HTML"],
  biopic: "https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-1/p160x160/28468001_10213889180397993_1393147267348055548_n.jpg?_nc_cat=0&oh=607a4e5bd966ed2fea4d0891b870299e&oe=5BC52E6C"

  },

  projects: {


  },

  education: {


  },

  bio: {


  }
};



octopus = {
  work: model.work,
  updateWorkHTMLStrings: function(){
    //setup Header HTML strings
    HTMLheaderName = HTMLheaderName.replace("%data%", octopus.work.name);
    HTMLheaderRole = HTMLheaderRole.replace("%data%", octopus.work.role);

    //setup topContacts HTML strings
    HTMLmobile = HTMLmobile.replace("%data%", octopus.work.contacts.mobile);
    HTMLemail = HTMLemail.replace("%data%", octopus.work.contacts.email);
    HTMLtwitter = (this.work.contacts.twitter !== "") ? HTMLtwitter.replace("%data%", octopus.work.contacts.twitter):null;
    HTMLgithub = HTMLgithub.replace("%data%", octopus.work.contacts.github);
  }
};



view = {
  renderWork: function(){
    //sets up the Header
    $("#header").prepend(HTMLheaderRole);
    $("#header").prepend(HTMLheaderName);

    //sets up the contacts
    $("#topContacts").append(HTMLmobile);
    $("#topContacts").append(HTMLemail);
    $("#topContacts").append(HTMLtwitter);
    $("#topContacts").append(HTMLgithub);
  }
};

octopus.updateWorkHTMLStrings();
view.renderWork();


/*


var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="orange-text">email</span><span class="white-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="orange-text">twitter</span><span class="white-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="orange-text">github</span><span class="white-text">%data%</span></li>';
var HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>';

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="flex-column"></ul>';
var HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';



var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="#">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%">';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="#">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a href="#">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a href="#">%data%</a>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';
*/
