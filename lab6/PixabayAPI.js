var API_KEY = 'YOUR_API_KEY';
var URL = "https://pixabay.com/api/?key="+"8594252-c5bcbfbb14b8e301fde5f14b1"+"&q="+encodeURIComponent('red roses');
$.getJSON(URL, function(data){
if (parseInt(data.totalHits) > 0)
    $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
else
    console.log('No hits');
});