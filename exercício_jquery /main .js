$(document).ready(function() {

    $('#task-form').on('submit', function(event) {
        event.preventDefault(); 

        var taskText = $('#task-input').val().trim();

        if (taskText) {
            
            var newTask = $('<li>').text(taskText);
            
            
            $('#task-list').append(newTask);


            $('#task-input').val('');
        }
    });


    $('#task-list').on('click', 'li', function() {
        $(this).toggleClass('completed'); 
    });
});
