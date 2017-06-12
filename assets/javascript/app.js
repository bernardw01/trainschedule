/* 
 Bernard Williams
 UCF Bootcamp APR2017 Week 7
 Train Schedule APP
 */


$(document).ready(function () {

    function refreshSchedule() {

        //Clear the schedule table

        //connect to the db

        //get the schedule array

        //Build the schedule table
    }

    function addTrain() {

        //prepare the train object

        //Connect to the database

        //get a primary key

        //add the train

        //refresh the schedule
        refreshSchedule();
    }

    function deleteTrain() {
        //connect to the db

        //delete the train using the key from the DB

        refreshSchedule();
    }


    $('#submit').click(addTrain);

    //Change the schedule interval based on the slider position
    $('#schedInterval').change(function () {
        $('#schedIntervalText').text($(this).val());
    });


});

