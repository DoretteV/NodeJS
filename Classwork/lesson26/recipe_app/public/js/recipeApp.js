//listing 26.6
//wait for the DOM to load
$(document).ready(() => {
  //listen for a click event on the modal button
  $("#modal-button").click(() => { 
    //clear the modal from any previous content
    $(".modal-body").html("");
    //request data from /courses?format=js on asynchronously
    $.get("/courses?format=json", data => {
      //loop through array of data in the response
      data.forEach(course => {
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<div class="course-description">
							${course.description}
						</div>
					</div>` //append each course to the modal
        );
      });
    });
  });
});
