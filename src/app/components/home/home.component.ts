import { Component, OnInit } from '@angular/core';
import { HackerService } from 'src/app/services/hacker.service';
import { Chart } from 'chart.js'; 
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hackersList:any;
  hacker:any;
  // data: Data[];  
  votes = [];  
  hackerNames = [];  
  barchart :any;  

  post = {
    hackerNames: '',
    url: ''
  };

  constructor( private _hackerService:HackerService ,
    private _cookieService:CookieService) {
      this.getHackers();
   }

  ngOnInit() {
  }

  getHackers() {
    this._hackerService.getHackers().subscribe(
      (data)=>{
        console.log(data);
        if(data){
          this.hackersList=data;
          this.gettingData();
        }
      }
    )
  }

  displayDetails(hacker) {
      this.hacker=hacker;
  }
  vote(hacker) {

    if(!this._cookieService.check('isUserAlreadyVoted')){
      this._cookieService.set('isUserAlreadyVoted','True');
      alert(this._cookieService.check('isUserAlreadyVoted'));
    const thePost = this.hackersList.find(item => this.hacker._id === item._id);
    thePost.votes = thePost.votes + 1;
    this._hackerService.vote(this.hacker._id, this.hacker.Votes).subscribe((data) => {
      console.log(data);
    });
  }
   
  }

  
  // bar chart
  renderChart() {
    this.hackerNames = [...new Set(this.hackerNames)];
    this.barchart = new Chart('canvas', {  
      type: 'bar',  
      data: {  
        labels: this.hackerNames,  
        datasets: [  
          {  
            data:this.votes,  
            backgroundColor: [  
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 02, 255, 0.7)',
              'rgba(13, 102, 255, 0.7)',
              'rgba(131, 102, 25, 0.7)',
              'rgba(313, 102, 255, 0.7)',
              'rgba(255, 159, 164, 0.7)'
            ],  
            fill: true  
          }  
        ]  
      },  
      options: {  
        maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: true,
                    text: "Best Hackers Vote Poll",
        },
        legend: {  
          display: false,  
          position: 'bottom',
        }, 
        scales: {  
          xAxes: [{  
            display: true  ,
             ticks: {
                  fontColor: "black",
                  fontSize: 14,
                  stepSize: 1,
                  beginAtZero: true
              }
          }],  
          yAxes: [
        {               
       ticks: {
              fontColor: "black",
              fontSize: 14,
              beginAtZero: true,
              min: 0
              },
            display: true  
          }],  
        }  
      }  
    });  
  }

  gettingData() {
    this.hackerNames=[];
    this.votes=[];
    this.hackersList.forEach(x => {  
        this.hackerNames.push(x.Name);  
        this.votes.push(x.Votes);  
    });
  
    this.renderChart();
    this.updateChart();
  }

  updateChart () {
    this.barchart.update({
      duration: 1200,
      easing: 'easeOutBounce'
  })
  }

}
