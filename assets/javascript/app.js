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
    var database = firebase.database();


    var trains = firebase.database().ref('trains/');

    trains.orderByChild('trainName').on('value', function (snapshot) {

        //console.log(snapshot.val());
        snapshot.forEach(function (childSnapshot) {

            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log(childKey);
            console.log(childData);
            var $newRow = $('<tr>');
            var $newTrainName = $('<td>');
            var $newDestination = $('<td>');
            var $newFrequency = $('<td>');
            var $newNextArrival = $('<td>');
            var $newMinAway = $('<td>');

            $newTrainName.text(childData.trainName);
            $newDestination.text(childData.destination);
            $newFrequency.text(childData.schedInterval);
            //TODO Calculate the next arrival time
            $newNextArrival.text('');
            //TODO Calculate the minutes away
            $newMinAway.text('');

            $newRow.append($newTrainName);
            $newRow.append($newDestination);
            $newRow.append($newFrequency);
            $newRow.append($newNextArrival);
            $newRow.append($newMinAway);

            $('#schedTable').append($newRow);

        });
    });

    function refreshSchedule(localTrains) {

        console.log('-------- Refresh Schedule function');

        console.log('Train Schedule Object----------');
        console.log('This is the object ' + JSON.parse(localTrains));
        console.log('This is the length of the object ' + localTrains.length);
        for (var i = 0; i < localTrains.length; i++) {
            //Build the schedule table

            console.log('Train loop ' + localTrains[i]);
        }


    }

    function addTrain() {
        console.log('---------Add Train function')
        //prepare the train object
        var newTrain = {
            trainName: $('#trainName').val().trim(),
            destination: $('#destination').val().trim(),
            firstTrainDateTime: $('#firstTrainDateTime').val(),
            schedInterval: $('#schedInterval').val().trim()
        }

        //get a unique key
        // Get a key for a new Post.
        var newTrainID = firebase.database().ref().child('trains').push().key;

        //add the train
        firebase.database().ref('trains/' + newTrainID).set(newTrain);


        console.log(newTrain);


    }

    function deleteTrain() {
        //connect to the db

        //delete the train using the key from the DB

        refreshSchedule();
    }


    $('#submit').click(addTrain);


});

