/*
This is empty on purpose! Your code to build the resume will go here.
 */

//
function formalSchool(name, location, degree, majors, dates, url) {
  this.name = name;
  this.location = location;
  this.degree = degree;
  this.majors = majors;
  this.dates = dates;
  this.url = url||"";
}

college = new formalSchool("University of Southern California", "Los Angeles, CA",
"Bachelor of Science", ["Aerospace Engineering"], "2008-2013");

graduate_school = new formalSchool("University of Southern California", "Los Angeles, CA",
"Master of Science", ["Mechanical Engineering"], "2013");



function onlineSchool(title, school, dates, url) {
  this.title = title;
  this.school = school;
  this.dates = dates;
  this.url = url;
}

online_education = new onlineSchool("Introduction to Programming Nanodegree",
"Udacity", "2018", "www.udacity.com")




model ={
  //work sub-object for the model, contains personal info
  bio: {
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

  education: {
    schools: [college, graduate_school],
    onlineCourses: [online_education]
  },

  work: {


  },

  projects: {


  }
};



octopus = {
  bio: model.bio,

  //Updates the bio HTML strings so the correct information from the model is included
  updateBioHTMLStrings: function(){
    //setup Header HTML strings
    HTMLheaderName = HTMLheaderName.replace("%data%", octopus.bio.name);
    HTMLheaderRole = HTMLheaderRole.replace("%data%", octopus.bio.role);

    //setup topContacts HTML strings
    HTMLmobile = HTMLmobile.replace("%data%", octopus.bio.contacts.mobile);
    HTMLemail = HTMLemail.replace("%data%", octopus.bio.contacts.email);
    HTMLtwitter = (this.bio.contacts.twitter !== "") ? HTMLtwitter.replace("%data%", octopus.bio.contacts.twitter):null;
    HTMLgithub = HTMLgithub.replace("%data%", octopus.bio.contacts.github);
    HTMLlocation = HTMLlocation.replace("%data%", octopus.bio.contacts.location);

    //setup bio picture! Must be class-> "biopic"
    HTMLbioPic = HTMLbioPic.replace("%data%", octopus.bio.biopic);

    //setup welcome message!
    HTMLwelcomeMsg = HTMLwelcomeMsg.replace("%data%", octopus.bio.welcomeMessage);

    //setup skills from array!
    var HTMLskills_update = HTMLskills;
    this.bio.skills.forEach(function(item, index) {
      if(index===0){
        HTMLskills_update = HTMLskills.replace("%data%", item);
      }
      else{
        HTMLskills_update += HTMLskills.replace("%data%", item);
      }
    })
    HTMLskills = HTMLskills_update;
  },

  //creates an "education" object identical to the model's one in the octopus!
  education: model.education,

  //Updates the education HTML strings so the correct information from the model is included
  updateEducationHTMLStrings: function(){

    //octopus.education = model.education;


    let school_strings = [];
      if(octopus.education.schools.length !== 0){
          $.each(octopus.education.schools, function(index, item) {
            let HTMLschoolName_current = HTMLschoolName.replace("%data%", item.name);
            let HTMLschoolDegree_current = HTMLschoolDegree.replace("%data%", item.degree);
            let HTMLschoolDates_current = HTMLschoolDates.replace("%data%", item.dates);
            let HTMLschoolLocation_current = HTMLschoolLocation.replace("%data%", item.location);
            let HTMLschoolMajor_current = HTMLschoolMajor.replace("%data%", item.majors[0]); //update to cases with more than one major later!!!!

            school_strings.push(HTMLschoolName_current + HTMLschoolDegree_current + HTMLschoolDates_current + HTMLschoolLocation_current + HTMLschoolMajor_current);
          });
        }
  //console.log(school_strings);
  return school_strings;

    /*this.education.schools.forEach(function(element) {
      console.log(element);

    });*/



    /*var HTMLonlineClasses = '<h3>Online Classes</h3>';
    var HTMLonlineTitle = '<a href="#">%data%';
    var HTMLonlineSchool = ' - %data%</a>';
    var HTMLonlineDates = '<div class="date-text">%data%</div>';
    var HTMLonlineURL = '<br><a href="#">%data%</a>';*/

  }
};



view = {
  //makes the bio section of the resume visible on the webpage
  renderBio: function(){
    //sets up the Header
    $("#header").prepend(HTMLheaderRole);
    $("#header").prepend(HTMLheaderName);

    //sets up the contacts
    $("#topContacts").append(HTMLmobile);
    $("#topContacts").append(HTMLemail);
    $("#topContacts").append(HTMLtwitter);
    $("#topContacts").append(HTMLgithub);
    $("#topContacts").append(HTMLlocation);

    //add bio picture
    $("#header").append(HTMLbioPic);

    //add welcome message
    $("#header").append(HTMLwelcomeMsg);

    //add skills to header
    $("#header").append(HTMLskillsStart);
    $("#header").append(HTMLskills);

  },

  //makes the education section of the resume visible on the webpage
  renderEducation: function(list) {
    $("#education").append(HTMLschoolStart);
    $.each(list, function (index, item) {
      $("#education").append(item);
  })
  }
};

octopus.updateBioHTMLStrings();
view.renderBio();
let name_list = octopus.updateEducationHTMLStrings();
view.renderEducation(name_list);


/*


var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';

var HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';





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
