var list = []; 
var currentObj = {}; 

$(document).ready(function(){

	refreshTodoList(); 

	$("#addForm").submit(function() {

		var name = $("#addName").val(); 
		var date = $("#addDate").val(); 

	    Obj = { "name": $("#addName").val(), 
				"date": $("#addDate").val()}; 

		addTodo(Obj); 
		return false; 
	})

	$("#editForm").submit(function() {

	    newObj = { "name": $("#editName").val(), 
				   "date": $("#editDate").val()}; 

		if (JSON.stringify(newObj) == JSON.stringify(currentObj)) {
			return false;
		}

		deleteTodo(currentObj);
		addTodo(newObj); 

		return false;
	})

	$("#clearButton").click(function() {
		localStorage.clear(); 
		list = [];
	});

    $('.todoLinks').click(function() {
     	$("input[name=editName]").val($(this).data("todoname")); 
    	$("input[name=editDate]").val($(this).data("tododate")); 
	    currentObj = { "name":  $("input[name=editName]").val(), 
				 	    "date" : $("input[name=editDate]").val()}; 
    });

    $('#delete').click(function() {
    	deleteTodo(currentObj); 
    })

})

function refreshTodoList() {
	var i = 0; 
	list = JSON.parse(localStorage.getItem("todoList")); 
	if (list != null) {
		$.each(list, function(key, value) {
			$('#todos').prepend('<li id="task-' + i +
								'"><a class="todoLinks" href="#edit" data-todoName="' + value.name +
								'" data-todoDate="' + value.date + 
								'">' + value.name + 
								'</a></li>');
			i++
		})
		$('#todos').listview("refresh");
	}
}

function addTodo(obj) {
		// var name = $("#addName").val(); 
		// var date = $("#addDate").val(); 

		if (obj.name == "") {
			alert("Please enter a title for the todo")
			return false;
		}

		if (obj.date == "") {
			alert("Please enter a date"); 
			return false; 
		}

		var todoList = JSON.parse(localStorage.getItem("todoList")); 
		if (todoList == null) {
			todoList = [];
		}


		todoList.push(obj); 
		localStorage.setItem("todoList", JSON.stringify(todoList));
}

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
