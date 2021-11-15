function nextReading(dateString) {
    
    var lastReading = moment(dateString);
    var nextReading = lastReading.add(moment.duration(5.2, 'minutes')); // this is tuned to the exact tick d
    return nextReading;
}


function countdownTime(lastReading) {
    var lastReading = moment(lastReading);
    var nextReading = lastReading.add(moment.duration(5.2, 'minutes'));  // this is tuned to the exact tick delay
    var minutes = nextReading.diff(moment(), 'minutes');
    var seconds = nextReading.diff(moment(), 'seconds');

    var output = minutes + "m or " + seconds + "s left";
    return output;
}