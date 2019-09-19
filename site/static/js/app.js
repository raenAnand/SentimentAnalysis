function classify() {
  var data = {"text": document.getElementById("tweetText").value}
 
  $.post("/classify", data, function(data, status){
    var img = document.getElementById('sentimentImg')
    if (data.probability <= 0.65) {
      img.setAttribute('src', 'static/img/neutral.svg');
      chart(data.probability,1-data.probability);
    }
    else if (data.sentiment == 'Positive') {
      img.setAttribute('src', 'static/img/happy.svg');
      chart(data.probability,1-data.probability);
    } else {
      img.setAttribute('src', 'static/img/sad.svg');
      chart(1-data.probability,data.probability);
    }
  }, "json");
  
}

// Prevent default submit behaviour
$("#tweet_form").submit(function(e) {
    e.preventDefault();
});

//for chart display.
function chart(p,n){
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    
    //passing data values
    data: [{
      type: "doughnut",
      startAngle: 60,
      //innerRadius: 60,
      indexLabelFontSize: 17,
      indexLabel: "{label} - #percent%",
      toolTipContent: "<b>{label}:</b> {y} (#percent%)",
      dataPoints: [
        { y: p, label: "Positive probability" },
        { y: n, label: "Negative probability" },
        ],
        
    }],
  });
  chart.render();//rendering

}

