import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { ApiCall } from './api.js'

function clearData() {
  $('#meal-name').empty();
  $('#title').empty();
  $('#categories').empty();
  $('#ingredients').empty();
  $('#measurements').empty();
  $('.images').empty();
  $('#meal-image').empty();
  $('#instructions').empty();
}

function display(response) {
  let body = JSON.parse(response);
  if (body.meals ===  null) {
    $('#title').text('Recipe not found');
  } else{
    $('#meal-image').append('<img src="' + body.meals[0].strMealThumb + '">');
    $('#meal-name').text(body.meals[0].strMeal);
    $('#instructions').text(body.meals[0].strInstructions);
    for (let key in body.meals[0]) {
      if(key.includes('strIngredient') &&  body.meals[0][key] != null && body.meals[0][key] != '') {
        $('#title').text('ingredients');
        $('#ingredients').append('<li>' + body.meals[0][key] + '</li>');
      }
      if(key.includes('strMeasure') &&  body.meals[0][key] != null && body.meals[0][key] != '') {
        $('#title').text('ingredients');
        $('#measurements').append('<li>' + body.meals[0][key] + '</li>');
      }
    }
  }
}

$(function(){
  let apiCall = new ApiCall();

  let displayData = function(results) {
    clearData();
    display(results);
  }

  let displayData2 = function(results){
    clearData();
    let body=JSON.parse(results);
    for (let key in body.meals) {
      $('#title').text('Dishes');
      $('.images').append('<figure class="figselect" id="' + body.meals[key].idMeal + '"><img src="' + body.meals[key].strMealThumb + '"  ><figCaption>' + body.meals[key].strMeal + '</figCaption></figure>');
    }
  }

  let displayData3 = function(results) {
    clearData();
    display(results);
  }

  $('#find-meal').submit(function(event){
    event.preventDefault();
    let userInput = $('#user-input').val();
    apiCall.getData(userInput, displayData);
  });
  $('#category').submit(function(event){
    event.preventDefault();
    let category = $('#user-input2').val();
    apiCall.getData2(category, displayData2);
  });

  $(".images").on('click', '.figselect', function () {
    let mealId = ($(this).attr('id'));
    console.log(mealId);
    apiCall.getData3(mealId, displayData3);
  });

});
