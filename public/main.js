const form= document.getElementById('vote-form');


// form submit event
form.addEventListener('submit',e =>{
    const choice= document.querySelector('input[name=os]:checked').value;
    const data={os:choice};
    fetch('http://localhost:3000/poll',{
        method:'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'content-Type':'application/json'
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .then(err=>console.log(err))


    e.preventDefault();
});


let datapoints=[
    {  label:'Windows' ,y:0},
    {label:'MacOs',y:0},
    {label:'Linux',y:0},
    {label:'Other',y:0}

];

const chartcontainer = document.querySelector('#chartContainer');

if (chartcontainer){
    var chart = new CanvasJS.Chart('chartContainer',{
        animationEnabled:true,
        theme :'theme1',
        title:{
            text:'Os Results'
        },
        data:[{
            type:'column',
            dataPoints: datapoints
        }]
    });
    chart.render();

    
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('199c9e1a2c14e5fc9391', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('os-poll');
    channel.bind('os-vote', function(data) {
      datapoints=datapoints.map(x=>{
        if (x.label==data.os){
            x.y+=data.points;
            return x;
        }
        else{
            return x;
        }
      });
      chart.render();
    });
}