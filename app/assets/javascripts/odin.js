/**
 * Created by alchemy on 12/2/15.
 */

$(document).ready(function(){
  getIdeas();
  createIdea();
});

function getIdeas() {
  $.ajax({
    type: "get",
    url: "/api/v1/ideas",
    data: { format: 'json'},
    dataType: "JSON",
    success: function(ideas) {
      ideas.forEach(function(data) {
        var $idea = $(
        "<div id='idea-" + data.id
          + "'><h3 class='title' data-id='" + data.id + "'>"
          + data.title
          + "</h3>"
          + "<p class='body'>"
          + data.body
          + "</p>"
          + "<p class='quality'>"
          + data.quality
          + "</p>"


          +"<button class='tiny' id='edit-" + data.id +"'>Edit Idea #" + data.id + "</button>"
          +"<button class='tiny' id='delete-" + data.id + "'>Delete Idea #" + data.id + "</button>"

          +"<div class='hidden' id='editForm-" + data.id + "'>"
            + "<form id='editIdeaForm-" + data.id + "'>"
              + "<input type='hidden' name='method' value='put'/>"
              + "<input type='text' name='idea[title]' placeholder='" + data.title + "' id='editIdeaTitle-'" + data.id +"'/>"
              + "<textarea name='idea[body]' placeholder='" + data.body + "' id='editIdeaBody-'" + data.id + "'></textarea>"
              + "<input type='submit' class='tiny button' id='confirmEdit-" + data.id + "' value='Update'" + data.id + "'/>"
            + "</form>"
          +"</div>"
        + "</div>"

        );

        $('.currentIdeas').prepend($idea);

        editIdea(data);
        confirmEdit(data);
        deleteIdea(data);


      })
    }
  })
}

function createIdea() {
  $('#newIdeaForm').on('submit', function(e) {
    e.preventDefault();

    var details = $('#newIdeaForm').serialize();

    $.ajax({
      type: "post",
      url: '/api/v1/ideas',
      data: details,
      dataType: "JSON",
      success: function(data) {

        var $idea = $(
        "<div id='idea-" + data.id
          + "'><h3 class='title' data-id='" + data.id + "'>"
            + data.title
          + "</h3>"
          + "<p class='body'>"
            + data.body
          + "</p>"
          + "<p class='quality'>"
            + data.quality
          + "</p>"

          +"<button class='tiny' id='edit-" + data.id +"'>Edit Idea #" + data.id + "</button>"
          +"<button class='tiny' id='delete-" + data.id + "'>Delete Idea #" + data.id + "</button>"

          +"<div class='hidden' id='editForm-" + data.id + "'>"
            + "<form id='editIdeaForm-" + data.id + "'>"
              + "<input type='hidden' name='method' value='put'/>"
              + "<input type='text' name='idea[title]' placeholder='" + data.title + "' id='editIdeaTitle-'" + data.id +"'/>"
              + "<textarea name='idea[body]' placeholder='" + data.body + "' id='editIdeaBody-'" + data.id + "'></textarea>"
              + "<input type='submit' class='tiny button' id='confirmEdit-" + data.id + "' value='Update'" + data.id + "'/>"
            + "</form>"
          +"</div>"
        + "</div>"

        );

        $('.currentIdeas').prepend($idea);

        editIdea(data);
        confirmEdit(data);
        deleteIdea(data);
      }
    });
  })
}

function deleteIdea(idea) {
  $('#delete-' + idea.id).on("click", function() {

    $.ajax({
      type: "DELETE",
      url: "/api/v1/ideas/" + idea.id,
      dataType: "JSON",
      success: function() {
        $('#idea-' + idea.id).remove();
      }
    });
  });
}

function editIdea(idea) {
  $('#edit-' + idea.id).on("click", function(e) {
    e.preventDefault();
    console.log("you are editing" , idea);
    $('#editForm-' + idea.id).removeClass('hidden');
  })
}

function confirmEdit(idea) {
  $('#confirmEdit-' + idea.id).on('click', function() {

  var details = $("#editIdeaForm-" + idea.id).serialize();

    return $.ajax({
      type: "PUT",
      url: "/api/v1/ideas/" + idea.id,
      data: details,
      dataType: "JSON",
      success: function() {
        console.log("does this shit work?");
        $("#editForm-" + idea.id).addClass('hidden');
        editIdea()
      }
    });
  })
}
