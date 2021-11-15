function generateTitle(msg) {
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
    default:
      break;
  }

  return msg.sgv + " " + direction_ascii;
}
