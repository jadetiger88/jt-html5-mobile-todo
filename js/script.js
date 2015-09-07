var list = []; 
var currentObj = {}; 


// Refresh the todo list everytime we display #home
$(document).on('pageshow', '#home', function() {
	refreshTodoList();
}); 

$(document).ready(function(){

    // Process addForm submit
	$("#addForm").submit(function() {

	    Obj = {"name": $("#addName").val(), "date": $("#addDate").val()}; 

        /* 
        ** Clear the add fields if added sucessfully. if not leave the fields
        ** along so the user don't have to re-enter everthing when s/he comes 
        ** back to this form.
        */ 
		if (addTodo(Obj)) { 
			clearAddFields();
		}

		return false; 
	});

     // Process editform submit
	$("#editForm").submit(function() {

	    newObj = { "name": $("#editName").val(), 
				   "date": $("#editDate").val()}; 

        // Only do the update if there are changes else do nothing
		if (JSON.stringify(newObj) != JSON.stringify(currentObj)) {
			deleteTodo(currentObj);
			addTodo(newObj); 
		}

		return false;
	});

    // Process add cancel button
	$("#addCancelButton").click(function() {

		// Clears the field if the user abort's the add operation.
		clearAddFields();
	});

    // Process the clear operation 
	$("#clearButton").click(function() {

		// Remove the entire to do list.
		localStorage.clear(); 
		list = [];
		refreshTodoList();

	});

    // Process the single entry todo item click
    // $('.todoLinks').click(function() {
	$('#todos').on('click','.todoLinks',function(){

		/* 
		** Get the value of the item clicked and 
		** put the info on the edit form.
		*/
     	$("input[name=editName]").val($(this).data("todoname")); 
    	$("input[name=editDate]").val($(this).data("tododate")); 
	    currentObj = { "name":  $("input[name=editName]").val(), 
				 	    "date" : $("input[name=editDate]").val()}; 
    });

    // Process the single entry delete operation
    $('#delete').click(function() {
    	deleteTodo(currentObj); 
    });

});

// Reresh the to do list. 
function refreshTodoList() {
	var i = 0; 

	$('#todos li').remove(); 
	list = JSON.parse(localStorage.getItem("todoList")); 
	if (list != null) {
		$.each(list, function(key, value) {
			$('#todos').prepend('<li id="task-' + i +
								'"><a class="todoLinks" href="#edit" data-todoName="' + value.name +
								'" data-todoDate="' + value.date + 
								'">' + value.name + 
								'<span>' + value.date + 
								'</span></a></li>');
			i++
		})
		$('#todos').listview("refresh");
	}
}

// Add an item to the localstorage list  and the in memory list
function addTodo(obj) {
		if (obj.name == "") {
			alert("Please enter a title for the todo")
			return false;
		}

		if (obj.date == "") {
			alert("Please enter a date"); 
			return false; 
		}

		if (list == null) {
			list = [];
		}


		list.push(obj); 
		localStorage.setItem("todoList", JSON.stringify(list));
		return true; 
}

// Remove an item to the localstorage list  and the in memory list
function deleteTodo(obj) {

	var objStr = JSON.stringify(obj); 

	for (var i = 0; i < list.length; i++) {
		var listObjStr = JSON.stringify(list[i]); 
		if (listObjStr ==  objStr) {
			list.splice(i, 1);
			break;
		}
	}
	localStorage.setItem("todoList", JSON.stringify(list));

}

// Clear the add fields
function clearAddFields() {
	$("#addName").val("");
	$("#addDate").val("");
}

