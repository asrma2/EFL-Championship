// first we have to declare th e module. note that [] is where we will declare the dependecies later. Right now we are leaving it blank
var football = angular.module('FootballApp',['ngRoute','angularUtils.directives.dirPagination','angular.filter']

  ); 

football.controller('allMatchController',['$http',function($http) {
  var main=this;
  this.baseUrl = 'https://apiv2.apifootball.com/?action=get_events&from=2019-08-01&to=2019-08-31&league_id=149&APIkey=2e55d24d899bc14c80acae4162cd1842ad04cf753ce2634d76b9337c07c6db53';

  this.year=[];
  this.getMatchDetails=[];
  this.headers=[];

  this.loadAllMatches = function(){
   
      $http({
      	
        method: 'GET',
        url: main.baseUrl
      }).then(function successCallback(response) {
        	console.log(response);
        	angular.forEach(response.data, function(matchData) {
	 				main.getMatchDetails.push({
	              		Date: matchData.match_date,
	         			Team1Score: matchData.match_hometeam_score,
				        Team2Score: matchData.match_awayteam_score,
				        Team1Name:matchData.match_hometeam_name,
				        Team2Name:matchData.match_awayteam_name
	       			});
	     	});
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server   returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });

      main.headers = ["Date","Team1Name","Team2Name","Team1Score","Team2Score"];

  }// end load all matches

  this.loadAllMatches();

}]); // end controller


football.controller('SingleMatchController',['$http','$routeParams',function($http,$routeParams) {

    this.DateHeld = $routeParams.date;
    this.Team1_Name =$routeParams.Team1Name;
    this.Team2_Name=$routeParams.Team2Name;
    this.Team1_Score=$routeParams.Team1Score;
    this.Team2_Score=$routeParams.Team2Score;
    if(this.Team1_Score > this.Team2_Score)
    {
    	this.WonBy = $routeParams.Team1Name;
    }
    else if(this.Team1_Score < this.Team2_Score) {
    	this.WonBy = $routeParams.Team2Name;
    } else {
    	this.WonBy = "Match Tied";
    }

}]); // end controller


football.controller('TeamWiseStatisticsController',['$http','$scope',function($http,$scope) {
  	var main=this;
    this.baseUrl = 'https://apiv2.apifootball.com/?action=get_standings&league_id=149&APIkey=2e55d24d899bc14c80acae4162cd1842ad04cf753ce2634d76b9337c07c6db53';

  	$scope.getTeamDetails=[];
  	this.loadLeagueTable = function() {
   
	    $http({
	        method: 'GET',
	        url: main.baseUrl
	    }).then(function successCallback(response) {
	        // this callback will be called asynchronously
	        // when the response is available
	        //console.log(response);
	        angular.forEach(response.data, function(teamData) {
		            //main.getMatchDetails.push(matchData);
		 			$scope.getTeamDetails.push({
		              	Position: teamData.overall_league_position,
	         			TeamName: teamData.team_name,
				        MP: teamData.overall_league_payed,
				        W: teamData.overall_league_W,
				        D: teamData.overall_league_D,
				        L: teamData.overall_league_L,
				        GF: teamData.overall_league_GF,
				        GA: teamData.overall_league_GA,
				        GD: teamData.overall_league_GF - teamData.overall_league_GA,
				        Pts: teamData.overall_league_PTS
		       		});
	     	});

	     	//console.log($scope.getTeamDetails);
	       
	    }, function errorCallback(response) {
	        // called asynchronously if an error occurs
	       	// or server   returns response with an error status.
	        alert("some error occurred. Check the console.");
	        console.log(response);
	    });    	
	}
  	
  	this.loadLeagueTable();

}]); // end controller

        