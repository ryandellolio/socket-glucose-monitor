function nextReading(dateString) {
    
    var lastReading = moment(dateString);
    var nextReading = lastReading.add(moment.duration(5, 'minutes'));
    var output = nextReading.format("llll")
    return output;
}

function countdownTime(lastReading) {
    var lastReading = moment(lastReading);
    var nextReading = lastReading.add(moment.duration(5, 'minutes'));
    var minutes = nextReading.diff(moment(), 'minutes');
    var seconds = nextReading.diff(moment(), 'seconds');

    var output = minutes + "m or " + seconds + "s left";
    return output;
}