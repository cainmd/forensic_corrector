var gun_check = function(report, GSW_entries){
	var start = 0;
	var temp = report.toUpperCase();
	
	var gsw_message = "This section of the report shows the following:";
	
	//var stippling = temp.indexOf("stippling");
	//var soot = temp.indexOf("stippling");
	var soot = (temp.match(/SOOT/g) || []).length;
	var stippling = (temp.match(/STIPPLING/g) || []).length;

/*	
	if (soot <= 0){
			gsw_message = gsw_message + "<br/>\n\u2022 soot"; 
	}
	if (stippling <=0){
			gsw_message = gsw_message + "<br/>\n\u2022 stippling";
	}	
	$gun_append = $("p").append("<b>" + gsw_message + "</b><br/>");
	alert (GSW_entries);
*/
	gsw_message = gsw_message + "<br/>\n\u2022 Soot appears " + soot + " times for " + GSW_entries + " entry wounds";
	gsw_message = gsw_message + "<br/>\n\u2022 Stippling appears " + stippling + " times for " + GSW_entries + " entry wound";
	$gun_append = $("p").append("<b>" + gsw_message + "</b><br/>");
}
