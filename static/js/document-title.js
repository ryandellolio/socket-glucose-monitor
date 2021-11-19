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

  return msg.sgv + " " + delta + " " + direction_ascii;
}
