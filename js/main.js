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

var organ_error = "";
var gender_error = "";
var death_error = "";
var name;
var age;
var sex;
var race;
var mod;
var cod;
var $gun_append;
var $organ_append;
var $gender_append;


$(document).ready(function () {
		$("#GSW").click(function(){
			$("#GSW_div").toggle();
		});
	 $("#submit").click(function(){
		//countChecked();
		reset_messages();
		var GSW_entries =  document.getElementById("GSW_entries").value;
		var checkedValues = $('input:checkbox:checked').map(function() {
			return this.value;
		}).get();
	
		var report_text = document.getElementById("report").value;
		//document.getElementById("demo").innerHTML = report;
	
		 interpret_report(report_text);
		 organ_search(report_text);
		 check_name(report_text);
         
		for (i = 0; i < checkedValues.length; i++){
			switch (checkedValues[i]) {
				case "GSW":
					gun_check(report_text, GSW_entries);
				break;
				case "OD":
					OD_check(report_text);
				break;
				case "STR":
					strangulation_check(report_text);
				break;
			}
		}
    });
});

var reset_messages = function () {
	//$('#results').html('');
	//$('#results').empty();
	organ_append = "";
	organ_error = "The following organs are missing:";
	$('p').remove();
	$('#results').append('<p></p>');
	
}


//submit.onclick = function(){interpret_report ()};
var organ_search = function (report) {
	var temp = report.toUpperCase();
	//need liver and pancreas already show up in heading
	var headings = ["Cardiovascular System", "Respiratory System", "Liver and Pancreas", "Lymphoid System", "Endocrine System", "Gastrointestinal Tract", "Genitourinary System", "Musculoskeletal System", "Neck Organs", "Head and Central Nervous System"];
	var organs = ["Heart", "Lung", "Liver", "Spleen", "Stomach", "Pancreas", "Thyroid", "Adrenal", "Kidney", "Bladder", "Prostate", "Brain", "Ovary", "Uterus", "Uterine"];
	
	var current_organ = "";
	var start = 0;
	var current_heading = "";
	var organ_site = "";
	
	var counter = 0;
	var female_parts = 0;
		
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
				if (current_organ == "OVARY"){
					if (organ_site <=0){
						temp_string = temp.substr(start + current_heading.length);
						organ_site = temp_string.indexOf("OVARIES");
					}
					
				}
				
				
				if (organ_site <= 0){
					if (current_organ == "OVARY" || current_organ == "OVARIES" || current_organ == "UTERUS" || current_organ == "UTERINE"){
						//if it didn't find the organ and they are male, this is okay.
						if (sex == "Male"){
								counter++;
						}
						
					}
					else if (current_organ == "PROSTATE"){
						if (sex == "Female"){
								counter++;
						}
					}
					
				}
				
				//fix this if ovaries vs ovary ---
				if (organ_site > 0) {
					counter++;
					if (current_organ == "OVARY" || current_organ == "OVARIES" || current_organ == "UTERUS" || current_organ == "UTERINE"){
						if (sex == "Male"){
							//gender id
							gender_error = "Potential error: Your report indicates this man has female anatomy...";
						}
						else {
							female_parts = 1;
						}
						
					}
					else if (current_organ == "PROSTATE"){
						if (sex == "Female"){
							//gender id
							gender_error = "Potential error: Your report indicates this female has male anatomy.";
						}
					}	
				}
			}
			//was <=
				if (counter <= 0) {
						organ_error = organ_error + "<br/>\n\u2022" + organs[i];
					}
		}	
	$organ_append = $("p").append("<b>" + organ_error + "</b><br/>");
	$gender_append = $("p").append("<b>" + gender_error + "</b><br/>");
	check_demographics(report, sex, race);
}

var check_name = function(report) {
	
	var extracted_value = "";
	var start = 0;
	var end = 0;
	var temp_report = report.toUpperCase();
	
	start = report.indexOf("NAME:");
	//at start
	end = report.indexOf("\r", start);
	if (end <= 0){
		end = report.indexOf("\n", start);
	}
	
	extracted_value = report.substr(start + 5, end);	

	
	
}

var interpret_report = function (report) {
	
	var extracted_value = "";
	var start = 0;
	var temp_report = report.toUpperCase();
	
	start = report.indexOf("AGE");
	//at start
	extracted_value = report.substr(start + 5, 3);	
	age = extracted_value.replace(/\s+/g, '');
	alert (age);
	//age = age.match(/\d+/)[0];
	start = report.indexOf("SEX");
		end_pt = report.indexOf("HEIGHT");
	//at start
	diff = end_pt - start;
	extracted_value = report.substr(start + 5, diff - 5);
	
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

var check_demographics = function (report, sex, race) {
	
	var gender_consistency = "";
	var race_consistency = "";
	var extracted_value = "";
	var age_consistency = "";
	var temp_report = report.toUpperCase();
	
	
	
	if (sex == "Male"){
		
			var ck_sex = temp_report.indexOf("FEMALE");
			
			if (ck_sex > 0){
				gender_consistency = "Check gender consistency";
				//$("#report").val(function(start, text){
					//return text + "World";
			}
		
		switch (race) {		
		case "White":
			
			var r1 = temp_report.indexOf("BLACK MALE");
			var r2 = temp_report.indexOf("ASIAN MALE");
			var r3 = temp_report.indexOf("HISPANIC MALE");
			var r4 = temp_report.indexOf("BLACK FEMALE");
			var r5 = temp_report.indexOf("ASIAN FEMALE");
			var r6 = temp_report.indexOf("HISPANIC FEMALE");	
				if (r1 > 0 || r2 > 0 || r3 > 0 || r4 > 0 || r5 > 0 || r6 > 0){
					race_consistency = "Check racial consistency";
				}
			break;
		case "Asian":
			var r1 = temp_report.indexOf("BLACK MALE");
			var r2 = temp_report.indexOf("WHITE MALE");
			var r3 = temp_report.indexOf("HISPANIC MALE");
			var r4 = temp_report.indexOf("BLACK FEMALE");
			var r5 = temp_report.indexOf("WHITE FEMALE");
			var r6 = temp_report.indexOf("HISPANIC FEMALE");
				if (r1 > 0 || r2 > 0 || r3 > 0 || r4 > 0 || r5 > 0 || r6 > 0){
					race_consistency = "Check racial consistency";
				}
			break;
		case "Black":
			var r1 = temp_report.indexOf("WHITE MALE");
			var r2 = temp_report.indexOf("ASIAN MALE");
			var r3 = temp_report.indexOf("HISPANIC MALE");
			var r4 = temp_report.indexOf("WHITE FEMALE");
			var r5 = temp_report.indexOf("ASIAN FEMALE");
			var r6 = temp_report.indexOf("HISPANIC FEMALE");
				if (r1 > 0 || r2 > 0 || r3 > 0 || r4 > 0 || r5 > 0 || r6 > 0){
					race_consistency = "Check racial consistency";
				}
			break;
		case "Hispanic":
			var r1 = temp_report.indexOf("BLACK MALE");
			var r2 = temp_report.indexOf("ASIAN MALE");
			var r3 = temp_report.indexOf("WHITE MALE");
			var r4 = temp_report.indexOf("BLACK FEMALE");
			var r5 = temp_report.indexOf("ASIAN FEMALE");
			var r6 = temp_report.indexOf("WHITE FEMALE");	
				if (r1 > 0 || r2 > 0 || r3 > 0 || r4 > 0 || r5 > 0 || r6 > 0){
					race_consistency = "Check racial consistency";
				}
			break;
	}	
			
			
	}
	else {
		var ck_sex = report.indexOf("MALE");
			if (ck_sex > 0){
				gender_consistency = "Check gender consistency";
			}
	switch (race) {		
		case "White":
			
			var r1 = temp_report.indexOf("BLACK MALE");
			var r2 = temp_report.indexOf("ASIAN MALE");
			var r3 = temp_report.indexOf("HISPANIC MALE");
			var r4 = temp_report.indexOf("BLACK FEMALE");
			var r5 = temp_report.indexOf("ASIAN FEMALE");
			var r6 = temp_report.indexOf("HISPANIC FEMALE");	
				if (r1 > 0 || r2 > 0 || r3 > 0 || r4 > 0 || r5 > 0 || r6 > 0){
					race_consistency = "Check racial consistency";
				}
			break;
			
		case "Asian":
			var r1 = temp_report.indexOf("BLACK MALE");
			var r2 = temp_report.indexOf("WHITE MALE");
			var r3 = temp_report.indexOf("HISPANIC MALE");
			var r4 = temp_report.indexOf("BLACK FEMALE");
			var r5 = temp_report.indexOf("WHITE FEMALE");
			var r6 = temp_report.indexOf("HISPANIC FEMALE");
				if (r1 > 0 || r2 > 0 || r3 > 0 || r4 > 0 || r5 > 0 || r6 > 0){
					race_consistency = "Check racial consistency";
				}
			break;
			
		case "Black":
			var r1 = temp_report.indexOf("WHITE MALE");
			var r2 = temp_report.indexOf("ASIAN MALE");
			var r3 = temp_report.indexOf("HISPANIC MALE");
			var r4 = temp_report.indexOf("WHITE FEMALE");
			var r5 = temp_report.indexOf("ASIAN FEMALE");
			var r6 = temp_report.indexOf("HISPANIC FEMALE");
				if (r1 > 0 || r2 > 0 || r3 > 0 || r4 > 0 || r5 > 0 || r6 > 0){
					race_consistency = "Check racial consistency";
				}
			break;
		case "Hispanic":
			var r1 = temp_report.indexOf("BLACK MALE");
			var r2 = temp_report.indexOf("ASIAN MALE");
			var r3 = temp_report.indexOf("WHITE MALE");
			var r4 = temp_report.indexOf("BLACK FEMALE");
			var r5 = temp_report.indexOf("ASIAN FEMALE");
			var r6 = temp_report.indexOf("WHITE FEMALE");	
				if (r1 > 0 || r2 > 0 || r3 > 0 || r4 > 0 || r5 > 0 || r6 > 0){
					race_consistency = "Check racial consistency";
				}
			break;
		}	
	
	}
	
	
	
	
	
	var age_list = [];
	//var index = word.indexOf(guess);
	
	var index = temp_report.indexOf("YEAR");
	
	while (index >= 0) {
		age_list.push(index);
		index = temp_report.indexOf("YEAR", index + 1);
	}
	
	 

	
	
		
		for (i = 0; i < age_list.length; i++){
			age1 = report.substr(age_list[i] - 4, 4);
			age1 = age1.replace(/\s+/g, '');
			age_match = age1.match(/\d+/)[0];
			
			if (age1 != age){				
				age_consistency = "Check age consistency";
			}
		}
		
	//alert (age + " " + age_list[1]);
	//alert (age_list [1]);
	$gender_append = $("p").append("<b>" + gender_consistency + "</b><br/>");
	$race_append = $("p").append("<b>" + race_consistency + "</b><br/>");
	$age_append = $("p").append("<b>" + age_consistency + "</b><br/>");
	
	
}

function getMatches(needle, haystack) {
    var myRe = new RegExp("\\b" + needle + "\\b((?!\\W(?=\\w))|(?=\\s))", "gi"),
        myArray, myResult = [];
    while ((myArray = myRe.exec(haystack)) !== null) {
        myResult.push(myArray.index);
    }
    return myResult;
}
