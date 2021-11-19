function generateTitle(msg, delta) {
  var direction_ascii;
  switch (msg.direction) {
    case "FortyFiveDown":
      direction_ascii = "↘";
      break;
    case "FortyFiveUp":
      direction_ascii = "↗";
      break;
    case "Flat":
      direction_ascii = "→";
      break;
    case "SingleUp":
      direction_ascii = "↑";
      break;
    
    default:
      break;
  }
  var modifier = "";
  if(delta >= 0){
    var modifier = "+";
  }

  return msg.sgv + " " + modifier + delta + " " + direction_ascii;
}
