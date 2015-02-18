var OD_check = function(report){
	var start = 0;
	var temp = report.toUpperCase();
	
	var OD_message = "Ensure that you have inspected the following:";
	
	var tracks = temp.indexOf("TRACK");
	var nps = temp.indexOf("NEEDLE");

	
	if (nps <= 0){
			OD_message = OD_message + "<br/>\n\u2022 Needle puncture marks"; 
	}
	if (tracks <=0){
			OD_message = OD_message + "<br/>\n\u2022 Track marks";
	}

	if (nps <=0 || tracks <= 0){
	$OD_append = $("p").append("<b>" + OD_message + "</b><br/>");
	}
	else { $OD_append = $("p").append("<b>The needle puncture sites and track marks appear to be discussed in the report.</b><br/>"); }
}
