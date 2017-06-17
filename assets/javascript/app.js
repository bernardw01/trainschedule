/* 
 Bernard Williams
 UCF Bootcamp APR2017 Week 7
 Train Schedule APP
 */

var trainSched = [];

$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAN7jRJJ0XNwtMkshongw7Cp7gXTEbp164",
        authDomain: "trainschedule-37df9.firebaseapp.com",
        databaseURL: "https://trainschedule-37df9.firebaseio.com",
        projectId: "trainschedule-37df9",
        storageBucket: "trainschedule-37df9.appspot.com",
        messagingSenderId: "270247901186"
    };

    firebase.initializeApp(config);

    // Get a reference to the database service
    var trains = firebase.database().ref('trains/');

    trains.orderByChild('trainName').on('value', function (snapshot) {

        $('#schedTable').empty();
        //console.log(snapshot.val());
        snapshot.forEach(function (childSnapshot) {

            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            //console.log(childKey);
            //console.log(childData);
            var $deleteButton = $('<i>');
            $deleteButton.addClass("fa fa-trash-o");
            $deleteButton.attr('aria-hidden', 'true');
            $deleteButton.attr('id', childKey);
            $deleteButton.on('click', deleteTrain);

            var $newRow = $('<tr>');
            var $newTrainName = $('<td>');
            var $newDestination = $('<td>');
            var $newFrequency = $('<td>');
            var $newNextArrival = $('<td>');
            var $newMinAway = $('<td>');
            var $delBtnCell = $('<td>');


            $newTrainName.text(childData.trainName);
            $newDestination.text(childData.destination);
            $newFrequency.text(childData.schedInterval);
            //TODO Calculate the next arrival time
            var nextArrival = calcNextArrival(childData.firstTrainDateTime, childData.schedInterval);
            $newNextArrival.text(nextArrival);
            //TODO Calculate the minutes away
            var minAway = calcMinAway(nextArrival);
            //TODO Fix the issue to show the right number of hours before a train arrives.
            //var hours = moment.duration(minAway, 'minutes').asHours();
            //var time = moment(hours, 'hours').format("HH:mm");
            $newMinAway.text(minAway);

            $delBtnCell.append($deleteButton);

            $newRow.append('<td></td>');
            $newRow.append($delBtnCell);
            $newRow.append($newTrainName);
            $newRow.append($newDestination);
            $newRow.append($newFrequency);
            $newRow.append($newNextArrival);
            $newRow.append($newMinAway);

            $('#schedTable').append($newRow);
        });
    });

    /**
     * This function calculates when the next event will occur based on a given start date and an interval
     * @param firstTrainDateTime This is the first date that
     * @param intervalMin Minutes between trains
     */
    function calcNextArrival(firstTrainDateTime, intervalMin) {

        console.log('---- calNextArrival function')
        //How long ago
        console.log(firstTrainDateTime);
        var startDateTime = moment(firstTrainDateTime, "YYYY-MM-DDThh:mm A")
        console.log(startDateTime);
        var minSinceStart = moment(startDateTime).diff(moment(), "minutes");
        console.log('Moment Date Difference ' + minSinceStart);
        //How many events since start
        var numEvents = Math.floor(Math.abs(minSinceStart) / intervalMin);
        console.log('Number of Events ' + numEvents);

        //How many minutes from first event to the last whole one
        var minFromFirstEvent = numEvents * intervalMin;
        console.log('Min from first event ' + minFromFirstEvent);
        var lastEventDate = startDateTime.add(minFromFirstEvent, 'minutes');
        console.log('Last Event Date ' + lastEventDate.format('MM/DD/YYYY hh:mm'));

        return lastEventDate.add(intervalMin, 'minutes');


    }

    function calcMinAway(nextTrainTime) {
        var minRemaining = moment(nextTrainTime).diff(moment(), "minutes");
        return minRemaining;
    }

    function addTrain() {
        console.log('---------Add Train function');
        //prepare the train object
        var newTrain = {
            trainName: $('#trainName').val().trim(),
            destination: $('#destination').val().trim(),
            firstTrainDateTime: $('#firstTrainDateTime').val(),
            schedInterval: $('#schedInterval').val().trim(),
            entryDate: Date.now()
        }

        //get a unique key
        // Get a key for a new Post.
        var newTrainID = firebase.database().ref().child('trains').push().key;

        //add the train
        firebase.database().ref('trains/' + newTrainID).set(newTrain);

        //console.log(newTrain);


    }

    function deleteTrain() {
        //connect to the db
        console.log('Delete ID ' + $(this).attr('id'));
        //delete the train using the key from the DB
        var train = firebase.database().ref('trains/' + $(this).attr('id'));
        train.remove();

    }

    $('#submit').click(addTrain);

});

