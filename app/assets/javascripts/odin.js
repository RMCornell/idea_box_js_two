/**
 * Created by alchemy on 12/2/15.
 */

$(document).ready(function(){
  getIdeas();
  createIdea();
});

function getIdeas() {
  $.ajax({
    type: "GET",
    url: "/api/v1/ideas",
    data: { format: 'json'},
    dataType: "JSON",
    success: function(data) {
      data.forEach(function(datum) {

        var $idea = $(
          "<div id='idea-"
          + datum.id
          + "'><h3 class='title' datum-id='"
          + datum.id
          + "'>"
          + datum.title
          + "</h3><p class='body'>"
          + datum.body
          + "</p><p class='quality'>"
          + datum.quality
          + "</p><button class='tiny'>Edit Idea #"
          + datum.id
          + "</button><button class='tiny' id='delete-"
          + datum.id
          + "'>Delete Idea #"
          + datum.id
          + "</div>"
        );

        $('.currentIdeas').prepend($idea);

        deleteIdea(datum);

      })
    }
  })
}

function createIdea() {
  $('#newIdeaForm').on('submit', function(e) {
    e.preventDefault();

    var details = $('#newIdeaForm').serialize();

    $.ajax({
      type: "POST",
      url: '/api/v1/ideas',
      data: details,
      dataType: "JSON",
      success: function(data) {

        var $idea = $(
          "<div id='idea-"
          + data.id
          + "'><h3 class='title' data-id='"
          + data.id
          + "'>"
          + data.title
          + "</h3><p class='body'>"
          + data.body
          + "</p><p class='quality'>"
          + data.quality
          + "</p><button class='tiny'>Edit Idea #"
          + data.id
          + "</button><button class='tiny' id='delete-"
          + data.id
          + "'>Delete Idea #"
          + data.id
          + "</div>"
        );

        $('.currentIdeas').prepend($idea);

        deleteIdea(data)
      }
    });
  })
}

function deleteIdea(data) {
  $('#delete-' + data.id).on("click", function() {
    $('#idea-' + data.id).remove();
  });
}



