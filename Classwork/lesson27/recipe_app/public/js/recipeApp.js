$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    //listing 27.3
    $.get("/api/courses", (results = {}) => {
      //set up a local variable to represent data
      let data = results.data;
      //check that the data object contains course information
      if (!data || !data.courses) return;
      //loop through course data, and add elements to modal
      data.courses.forEach(course => {
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<button class='button ${course.joined ? "joined-button" : "join-button"}' data-id="${course._id}">
							${course.joined ? "Joined" : "Join"}
						</button>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        );
      });
    }).then(() => {
      //call addjoinbuttonlistener to add an event listener on your buttons after the ajax request completes
      addJoinButtonListener();
    });
  });
});
//create the event listener for the modal button
let addJoinButtonListener = () => {
  $(".join-button").click(event => {
    let $button = $(event.target),
    //grab the button and button ID data
      courseId = $button.data("id");
      //make an ajax request with the course's ID to join
    $.get(`/api/courses/${courseId}/join`, (results = {}) => {
      let data = results.data;
      //check whether the join action was successful and modify the button
      if (data && data.success) {
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeClass("join-button");
      } else {
        $button.text("Try again");
      }
    });
  });
};
