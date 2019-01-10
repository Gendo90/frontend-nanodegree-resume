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
"Bachelor of Science", ["Aerospace Engineering"], "2008-2013", "https://www.usc.edu/");

graduate_school = new formalSchool("University of Southern California", "Los Angeles, CA",
"Master of Science", ["Mechanical Engineering"], "2013", "https://www.usc.edu/");



function onlineSchool(title, school, dates, url) {
  this.title = title;
  this.school = school;
  this.dates = dates;
  this.url = url;
}

online_education_1 = new onlineSchool("Introduction to Programming Nanodegree",
"Udacity", "2018", "https://www.udacity.com/course/intro-to-programming-nanodegree--nd000")

online_education_2 = new onlineSchool("Full Stack Web Developer Nanodegree",
"Udacity", "2018", "https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd004")



function heldJobs(employer, title, location, dates, description) {
  this.employer = employer;
  this.title = title;
  this.location = location;
  this.dates = dates;
  this.description = description;
}

last_job = new heldJobs("Stanford Healthcare", "Project Engineer/Drafter", "Menlo Park, CA",
"01/2018-03/18", "Inspected piping at the main Stanford Hospital and created as-built drawings.");

law_office = new heldJobs("Law Offices of Diana Dean-Gendotti", "Legal Assistant", "Los Altos, CA",
"08/2018-01/18", "Helped check and prepare legal documents for estate planning meetings; performed various administrative tasks.");


function completeProjects(title, dates, description, images){
  this.title = title;
  this.dates = dates;
  this.description = description;
  this.images = images;
}

sqlProject = new completeProjects("Newspaper Database Query Project", "04/18",
"Queried a fictional newspaper website's Linux server database using PostgreSQL and a Python script to "
+"determine the most popular authors and articles on the site, and to determine days when "
+"the site had a high error rate when loading.", ["images/Newspaper_DB_Query.png"])




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
  biopic: "images/Biopic.jpg"

  },

  education: {
    schools: [college, graduate_school],
    onlineCourses: [online_education_1, online_education_2]
  },

  work: {
    jobs: [last_job, law_office]
  },

  projects: {
    projects: [sqlProject]
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
  updateFormalEducationHTMLStrings: function(){

    let school_strings = [];
      if(octopus.education.schools.length !== 0){
          $.each(octopus.education.schools, function(index, item) {
            let HTMLschoolName_current = HTMLschoolName.replace("%data%", item.name);
            HTMLschoolName_current = item.url !=="" ? HTMLschoolName_current.replace("#", item.url):HTMLschoolName_current;
            let HTMLschoolDegree_current = HTMLschoolDegree.replace("%data%", item.degree);
            let HTMLschoolDates_current = HTMLschoolDates.replace("%data%", item.dates);
            let HTMLschoolLocation_current = HTMLschoolLocation.replace("%data%", item.location);
            let HTMLschoolMajor_current = HTMLschoolMajor.replace("%data%", item.majors[0]); //update to cases with more than one major later!!!!

            school_strings.push(HTMLschoolName_current + HTMLschoolDegree_current + HTMLschoolDates_current + HTMLschoolLocation_current + HTMLschoolMajor_current);
          });
        }
  return school_strings;
},

updateOnlineEducationHTMLStrings: function() {
  let school_strings = [];

  $.each(octopus.education.onlineCourses, function(index, item) {
    let HTMLonlineTitle_current = HTMLonlineTitle.replace("%data%", item.title);
    let HTMLonlineSchool_current = HTMLonlineSchool.replace("%data%", item.school);
    let HTMLonlineDates_current = HTMLonlineDates.replace("%data%", item.dates);
    let HTMLonlineURL_current = HTMLonlineURL.replace("%data%", item.url);
    HTMLonlineURL_current = HTMLonlineURL_current.replace("#", item.url);

    school_strings.push(HTMLonlineTitle_current+HTMLonlineSchool_current+HTMLonlineDates_current+HTMLonlineURL_current);
    });
    return school_strings;
  },

  //get work info from the model to use within the octopus!
  work: model.work,

updateJobHTMLStrings: function() {
  let work_strings = [];

  $.each(octopus.work.jobs, function(index, item) {
    let HTMLworkEmployer_current = HTMLworkEmployer.replace("%data%", item.employer);
    let HTMLworkTitle_current = HTMLworkTitle.replace("%data%", item.title);
    let HTMLworkDates_current = HTMLworkDates.replace("%data%", item.dates);
    let HTMLworkLocation_current = HTMLworkLocation.replace("%data%", item.location);
    let HTMLworkDescription_current = HTMLworkDescription.replace("%data%", item.description);

    work_strings.push(HTMLworkEmployer_current+HTMLworkTitle_current
      +HTMLworkDates_current+HTMLworkLocation_current+HTMLworkDescription_current);
    });
  return work_strings;
},

 projects: model.projects,

 updateProjectsHTMLStrings: function() {
   let project_strings = [];


   $.each(octopus.projects.projects, function(index, item) {
     let HTMLprojectTitle_current = HTMLprojectTitle.replace("%data%", item.title);
     let HTMLprojectDates_current = HTMLprojectDates.replace("%data%", item.dates);
     let HTMLprojectDescription_current = HTMLprojectDescription.replace("%data%", item.description);

     let HTMLprojectImage_current = ""
     $.each(this.images, function(index, item){
       HTMLprojectImage_current += HTMLprojectImage.replace("%data%", item); //should add multiple images... TEST!!!
     });

     project_strings.push(HTMLprojectTitle_current+HTMLprojectDates_current
       +HTMLprojectDescription_current+HTMLprojectImage_current);
     });
   return project_strings;


   /*
   var HTMLprojectTitle = '<a href="#">%data%</a>';
   var HTMLprojectDates = '<div class="date-text">%data%</div>';
   var HTMLprojectDescription = '<p><br>%data%</p>';
   var HTMLprojectImage = '<img src="%data%">';
   */
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

  renderFooter: function(){
    //adds contacts to the footer
    $("#footerContacts").append(HTMLmobile);
    $("#footerContacts").append(HTMLemail);
    $("#footerContacts").append(HTMLtwitter);
    $("#footerContacts").append(HTMLgithub);
    $("#footerContacts").append(HTMLlocation);
  },

  //makes the education section of the resume visible on the webpage
  renderEducation: function(list, online_programs) {
    //Header for the education section added here:
    $("#education").append(HTMLschoolStart);
    //iterate through the list of formal schools one has attended and add to webpage
    $.each(list, function (index, item) {
      $(".education-entry").append(item);
    })

    //adds the online education section to the Education part of the resume
    //div added so that the online courses are separate from the formal education programs
    $("#education").append(HTMLonlineClasses + "<div class=education-entry></div>");
    //iterate through the list of formal schools one has attended and add to webpage
    $.each(online_programs, function (index, item) {
      $(".education-entry").last().append(item);
  })},

  //makes the work section of the resume visible on the webpage
  renderWork: function(input_list) {
    //setup the header for the WORK section
    $("#workExperience").append(HTMLworkStart);

    //iterate through the list of jobs worked and add to webpage
    $.each(input_list, function (index, item) {
      $(".work-entry").append(item);
    })},

  //makes the projects section of the resume visible on the webpage
  renderProjects: function(input_list) {
    //setup the header for the PROJECTS section
    $("#projects").append(HTMLprojectStart);

    //iterate through the list of jobs worked and add to webpage
    $.each(input_list, function (index, item) {
      $(".project-entry").append(item);
    })},

  renderMap: function() {
    $("#mapDiv").append(googleMap)
  }
};

octopus.updateBioHTMLStrings();
view.renderBio();
view.renderFooter();
let name_list = octopus.updateFormalEducationHTMLStrings();
let online_list = octopus.updateOnlineEducationHTMLStrings();
view.renderEducation(name_list, online_list);
let workList = octopus.updateJobHTMLStrings();
view.renderWork(workList);
let projList = octopus.updateProjectsHTMLStrings();
view.renderProjects(projList);
view.renderMap();
