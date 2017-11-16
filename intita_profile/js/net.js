var API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkyNGZlYjVlNjlkNzhmMGY3YWFkYTI1NWJkYWU0NTVjMWIyOTI3ZmM1OTEyMjEwMWM1YWRlNDM1MWJmNGEzZWE4NDNhMWVjZTEwN2M1MzFiIn0.eyJhdWQiOiIxMCIsImp0aSI6IjkyNGZlYjVlNjlkNzhmMGY3YWFkYTI1NWJkYWU0NTVjMWIyOTI3ZmM1OTEyMjEwMWM1YWRlNDM1MWJmNGEzZWE4NDNhMWVjZTEwN2M1MzFiIiwiaWF0IjoxNTA3NjU0MzY5LCJuYmYiOjE1MDc2NTQzNjksImV4cCI6MTgyMzE4NzE2OSwic3ViIjoiNzY5Iiwic2NvcGVzIjpbInVzZXJCYXNlSW5mbyIsInVzZXJEZXRhaWxlZEluZm8iLCJ1c2VyQ291cnNlSW5mbyJdfQ.pOL3ZXO5FP4XwfFvttf7pj830zv6B65rcQ8stExdUKd8yXOpf4wCOdsiXWYnHnLo6lzD934rricLavY3IQD-YHrnlCoIAgWTCGVJOxxvV--sZRnwyHr2kPXH7jsBbnRPGZTz0mb8V6Sohi2AwCLrvpKwwoPDCAWJvaESaK0flHiepJXtTy8vVlNPB7UzUsFMCBhcdhoUG6luv6mXIMNVdMXa7CLNsua5bXwdo8OPQTEtspKzBmO3RHxmqEq8W_HmfbhEur7GCubZsmsL4714pJS5h09WAKfZAyTYk6aWaUh6sQdt_hUeK8W8qqm0r077jJ39na9rWg3oIrX5pEqZAdiykxPJ7tdZ8dgdjwP2oGhzYmAKtU6cMdQyQWIaUxHtvM2Qg1mv5uNpHf5_fgrCeFOz2jr23tpiCxhNQzcdtZuX0GKU0zhwPFvNhW2bkn1OFiMRaLcWrtdmX2lZn5YnJJ2QED-3uioWMf1Y-9tbuW7-_0Y7WgIi5dD8Ilc8v_wphIpoTB0-STUZqAW4tZgBwpJk8J0Wz8lgFPwuSo4_3oC-l25rjY8sB1dHefxthulhbQ3lkxlmoq5DYBy5LuKJgoqN73xbDzcaskoTWkTgke7CRD8dxzHcATNVdwoZTTajNCiMneFA9sUzRRwIH3unu5qKHIueVFm9Pf04K8OUnRo';
var client = new INTITAClient({
key : API_KEY,
});
var user_id = 769;

/*
var myId = 777;


client.getUserCoursesAndModules(myId, function (error, data) {
    console.log(data);
    data.courses.forEach(function (element){
        //console.log(element);
        var id = element.id;
        //console.log('course info ', data);

        client.getCourseInfo(id, function (error, data){ //getUserCourseInfo
            //console.log('course details ', data);

            client.getCourseModules(id, function (error, data){//getUserCoursesAndModules
               //console.log('course modules ', data);
               data.forEach(function (module){

                 client.getModuleInfo(module.id, function (error, data){
                   //console.log('module details ', module.id, data);
                 });
               });
             });
        });
    });

});
*/

client.getUserDetails(user_id, function (error, data) {
    document.getElementById("image").src = data.avatar;
    document.getElementById("name").innerHTML = data.firstName + " " + data.secondName;
    document.getElementById("adress").innerHTML = data.city + ", " + data.address;
    document.getElementById("edu").innerHTML = data.education;
    document.getElementById("email").innerHTML = data.email;
    document.getElementById("phone").innerHTML = data.phone;
    document.getElementById("skype").innerHTML = data.skype;
    document.getElementById("interests").innerHTML = data.interests
    document.getElementById("about").innerHTML = data.aboutMy;
    document.getElementById("facebook").href = data.facebook;
    document.getElementById("vk").href = data.vkontakte;
    document.getElementById("google").href = data.googleplus;
});

client.getUserCoursesAndModules(user_id, function (error, data) {
    data.courses.forEach(function (element)
    {
        //document.getElementById("module").innerHTML = data.courses[0].title;
        var courses = document.getElementById("courses");
        var course = document.createElement("div");
        course.innerHTML = element.title;
        courses.appendChild(course);

        client.getCourseModules(element.id, function (error, modules) {

            modules.forEach(function (module)
            {
                var modules = document.getElementById("modules");
                var current_module = document.createElement("li");
                current_module.innerHTML = module.title;
                modules.appendChild(current_module);
                var ul_lecture = document.createElement("ul");
                current_module.appendChild(ul_lecture);
                client.getModuleLectures(module.id, function(error, lectures) {
                    lectures.forEach(function (lecture){
                        var current_lecture = document.createElement("li");
                	current_lecture.innerHTML = lecture.title;
			ul_lecture.appendChild(current_lecture);
                        
			});
			
                });

            });
        });

    });
});


var show_modules = document.getElementById("show_modules");
show_modules.onclick = function() {
    if(document.getElementById("modules").style.display == "none")
    {
        document.getElementById("modules").style.display = "block";

        document.getElementById("show_modules").innerHTML = "скрыть подробности"
    }
    else
    {
        document.getElementById("modules").style.display = "none";
        document.getElementById("show_modules").innerHTML = "показать подробности";
    }
};


/*
//user info
client.getUserDetails(700, function (error, data) {
console.log(error, data)
});

//get array of user courses (
client.getUserCoursesAndModules(769, function (error, data) {
console.log(error, data)
});

//information about id of cource
client.getCourseInfo(1, function (error, data) {
console.log(error, data)

});
//information about id module
client.getModuleInfo(1, function (error, data) {
console.log(error, data)
});

//get information abour all modules present in id cource
client.getCourseModules(1, function (error, data) {
console.log(error, data);
});

//empty
client.getCourseTags(1, function(error, data) {
console.log(error, data);
});
//empty
client.getModuleTags(1, function(error, data) {
console.log(error, data);
});

//info about lection of id module
client.getModuleLectures(1, function(error, data) {
console.log(error, data);
});
  */



//---------------------------------
//client.getUserCoursesAndModules(myId)
//    .then(functon(data){
//    return data.course.map(function (item){
//        return client.getCourseInfo(item.id)
//    });
//});
//---------------------------------
