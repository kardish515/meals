import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { ApiCall } from './api.js'

$(function(){
  let apiCall = new ApiCall();

  let displayData = function(results) {
    $('#ingredients').empty();
    $('#measurements').empty();
    let body=JSON.parse(results);
    $("#meal-name").text(body.meals[0].strMeal);
    for (let key in body.meals[0]) {
      if(key.includes('strIngredient') &&  body.meals[0][key] != null && body.meals[0][key] != '') {
        $('#ingredients').append("<li>" + body.meals[0][key] + "</li>");
      }
      if(key.includes('strMeasure') &&  body.meals[0][key] != null && body.meals[0][key] != '') {
        $('#measurements').append("<li>" + body.meals[0][key] + "</li>");
      }
    }
  }

  $('#find-meal').submit(function(event){
    event.preventDefault();
    let userInput = $("#user-input").val();
    apiCall.getData(userInput, displayData);
  });

});
