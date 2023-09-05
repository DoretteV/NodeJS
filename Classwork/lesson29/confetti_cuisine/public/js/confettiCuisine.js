//wait for the DOM to load - web page to load
$(document).ready(() => {
  //handle a click event on the modal button
  $("#modal-button").click(() => {
    //reset the modal bodys contents to an empty string
    $(".modal-body").html("");
    //fetch course data via an AJAX GET request
    $.get(`/api/courses`, (results = {}) => { //show all the courses with an AJAX call
      let data = results.data;
      if (!data || !data.courses) return;
      //loop through each course, and append to the modal body
      data.courses.forEach(course => {
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<span class="course-cost">$${course.cost}</span>
						<button class="${course.joined ? "joined-button" : "join-button"} btn btn-info btn-sm" data-id="${course._id}">
							${course.joined ? "Joined" : "Join"}
						</button>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        );  //link to enroll the current user
      });
    }).then(() => {
      //call addJoinButtonListener to add an event listener on the course listing
      addJoinButtonListener();
    });
  });
});

let addJoinButtonListener = () => {
  $(".join-button").click(event => {
    let $button = $(event.target),
      courseId = $button.data("id");
			console.log(`/api/courses/${courseId}/join`)
      //make an API call to join the selected course
    $.get(`/api/courses/${courseId}/join`, (results = {}) => {  //AJAX api call to the courses end point
      let data = results.data;
      if (data && data.success) {
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeClass("join-button");
      } else {
        $button.text("Try again");  //not logged in
      }
    });
  });
};
