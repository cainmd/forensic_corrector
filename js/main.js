//Notes: need to div CC and AC SD by 2! Different paper. Done for this but not in excel
//Can check values too
   
//will need to change foot length to schulz...not an error message

/*
if (window.hasOwnProperty('jQuery') === false) {
     // NOTE: It also needs to be version 1.7.2. I have had trouble getting it
     // to work with "newer" versions of jQuery, and I'm not sure why yet ...
        throw new Error('jQuery is missing.');
    }
*/

    
var $ = window.jQuery;

//buttons

//var submit = document.getElementById("submit");

var organ_error = "The following organs are missing:";
var gender_error = "";
var death_error = "";
var age;
var sex;
var race;
var mod;
var cod;
var $gun_append;
var $organ_append;
var $gender_append;


$(document).ready(function () {
     
	 $("#submit").click(function(){
		//countChecked();
		reset_messages();
		var checkedValues = $('input:checkbox:checked').map(function() {
			return this.value;
		}).get();
	
		var report_text = document.getElementById("report").value;
		//document.getElementById("demo").innerHTML = report;
	
		 interpret_report(report_text);
		 organ_search(report_text);
         //alert (sex);
		for (i = 0; i < checkedValues.length; i++){
			switch (checkedValues[i]) {
				case "GSW":
					gun_check(report_text);
				break;
			}
		}
    });
});

var reset_messages = function () {
	$('p').html('');
}


//submit.onclick = function(){interpret_report ()};
var organ_search = function (report) {
	var temp = report.toUpperCase();
	//need liver and pancreas already show up in heading
	var headings = ["Cardiovascular System", "Respiratory System", "Liver and Pancreas", "Lymphoid System", "Endocrine System", "Gastrointestinal Tract", "Genitourinary System", "Musculoskeletal System", "Neck Organs", "Head and Central Nervous System"];
	var organs = ["Heart", "Lung", "Liver", "Spleen", "Stomach", "Pancreas", "Thyroid", "Kidney", "Bladder", "Ovary", "Ovaries", "Uterus", "Prostate", "Brain"];
	
	var current_organ = "";
	var start = 0;
	var current_heading = "";
	var organ_site = "";
	
	var counter = 0;
	
		for (i = 0; i < organs.length; i++){
			counter = 0;
			for (j = 0; j < headings.length; j++){		
				
				current_heading = headings[j];
				current_heading = current_heading.toUpperCase();
				
				current_organ = organs[i];
				current_organ = current_organ.toUpperCase();
				
				start = temp.indexOf(current_heading);
				temp_string = temp.substr(start + current_heading.length);
				organ_site = temp_string.indexOf(current_organ);
				
				if (organ_site <= 0){
					if (current_organ == "OVARY" || current_organ == "OVARIES" || current_organ == "UTERUS"){
						if (sex == "Male"){
								counter++;
						}
						
					}
					else if (current_organ == "PROSTATE"){
						if (sex == "female"){
								counter++;
						}
					}
					
				}
				
				if (organ_site > 0) {
					counter++;
					if (current_organ == "OVARY" || current_organ == "OVARIES" || current_organ == "UTERUS"){
						if (sex = "Male"){
							//gender id
							gender_error = "This man grew a pair...of ovaries!";
						}
					}
					else if (current_organ == "PROSTATE"){
						if (sex == "Female"){
							//gender id
							gender_error = "Alas, this lady's husband was devastated to find she had a prostate!";
						}
					}	
				}
			}
				if (counter <= 0) {
						organ_error = organ_error + "<br/>\n\u2022" + organs[i];
					}
		}	
	$organ_append = $("p").append("<b>" + organ_error + "</b><br/>");
	$gender_append = $("p").append("<b>" + gender_error + "</b><br/>");
	
}

var interpret_report = function (report) {
	
	var extracted_value = "";
	var start = 0;
	var temp_report = report.toUpperCase();
	
	start = report.indexOf("AGE");
	//at start
	extracted_value = report.substr(start + 5, 3);	
	age = extracted_value.replace(/\s+/g, '');
	
	start = report.indexOf("SEX");
	//at start
	extracted_value = report.substr(start + 5, 6);	
	sex = extracted_value.replace(/\s+/g, '');
	
	start = report.indexOf("RACE");
	//at start
	extracted_value = report.substr(start + 6, 5);	
	race = extracted_value.replace(/\s+/g, '');
	
	start = report.indexOf("CAUSE OF DEATH");
	//at start
	extracted_value = report.substr(start + 16, 5);	
	cod = extracted_value.replace(/\s+/g, '');
	
	start = report.indexOf("MANNER OF DEATH");
	//at start
	extracted_value = report.substr(start + 17, 5);	
	mod = extracted_value.replace(/\s+/g, '');
	
}  
var gun_check = function(report){
	var start = 0;
	var temp = report.toUpperCase();
	var gsw_message = "You are missing the following descriptions:";
	
	var stippling = temp.indexOf("stippling");
	var soot = temp.indexOf("stippling");
	
	if (soot <= 0){
			gsw_message = gsw_message + "<br/>\n\u2022 soot"; 
	}
	if (stippling <=0){
			gsw_message = gsw_message + "<br/>\n\u2022 stippling";
	}	
	$gun_append = $("p").append("<b>" + gsw_message + "</b><br/>");
	
}
