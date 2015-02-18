var strangulation_check = function(report){
	var start = 0;
	var temp = report.toUpperCase();
	
	var strang_message = "Ensure that you have inspected the following:";
	
	var hyoid = temp.indexOf("HYOID");
	var cartilage = temp.indexOf("THYROID CARTILAGE");

	
	if (hyoid <= 0){
			strang_message = strang_message + "<br/>\n\u2022 Hyoid bone"; 
	}
	if (cartilage <=0){
			strang_message = strang_message + "<br/>\n\u2022 Thyroid cartilage";
	}

	if (hyoid <=0 || cartilage <= 0){
	$strang_append = $("p").append("<b>" + strang_message + "</b><br/>");
	}
	else { $strang_append = $("p").append("<b>The hyoid bone and thyroid cartilage are present in the report.</b><br/>"); }
}
