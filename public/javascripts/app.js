var app = angular.module("app", []);

app.controller('buttonCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.input = "";
    $scope.x = Math.floor(Math.random() * 10 + 1);
    $scope.y = Math.floor(Math.random() * 10 + 1);
    $scope.operation = "+";
    $scope.isCorrect = false;
    $scope.tryAgain = false;
    $scope.dollars = 0.0;
    $scope.score_id = 0;

    // let's get the total score from the database
    $http.get('api/v1/scores')
      .success(function(data){
        for(var e in data){
          $scope.dollars += data[e].total;
        }
      })
      .error(function(error){
        console.log('Error: ' + error);
      })

    $scope.submitAnswer = function enter() {

        if ($scope.operation == '+') {
            $scope.isCorrect = $scope.input == $scope.x + $scope.y
        } else if ($scope.operation == '-') {
            $scope.isCorrect = $scope.input == $scope.x - $scope.y
        } else if ($scope.operation == 'X') {
            $scope.isCorrect = $scope.input == $scope.x * $scope.y
        } else {
            $scope.isCorrect = $scope.input == $scope.x / $scope.y
        }

        if ($scope.isCorrect) {
            $scope.isCorrect = true;
            $scope.tryAgain = false;

            var amt = 0.0;
            if ($scope.operation == '+') {
              amt = .01;
            } else if ($scope.operation == '-') {
              amt = .02;
            } else if ($scope.operation == 'X') {
              amt = .03;
            } else {
              atm = .04;
            }

            $scope.dollars += amt;

            // let's update the score in the database

            var score = {
              name: 'Bret',
              date: new Date(),
              total: amt,
              paid: false
            };
            $http.post('/api/v1/score', score)
              .success(function(data){
                console.log(data);
              })
              .error(function(err){
                console.log(err);
              });

            buildProblem();
        }
        else {
            $scope.isCorrect = false;
            $scope.tryAgain = true;
        }
        $scope.input = "";
    }


    $scope.changeOperation = function (operation) {
        $scope.operation = operation;
        buildProblem();
    }

    function buildProblem() {
        if ($scope.operation == '+') {
            $scope.x = Math.floor(Math.random() * 10 + 1);
            $scope.y = Math.floor(Math.random() * 10 + 1);
        } else if ($scope.operation == '-') {

            do {
                $scope.x = Math.floor(Math.random() * 10 + 1);
                $scope.y = Math.floor(Math.random() * 10 + 1);
            } while ($scope.x < $scope.y)

        } else if ($scope.operation == 'X') {
            $scope.x = Math.floor(Math.random() * 10 + 1);
            $scope.y = Math.floor(Math.random() * 10 + 1);
        } else {
            $scope.x = Math.floor(Math.random() * 100 + 1);
            $scope.y = Math.floor(Math.random() * 10 + 1);

            if ($scope.y == 0) {
                $scope.y = 1;
            }

            if ($scope.x % $scope.y != 0 || $scope.x / $scope.y > 10) {
                buildProblem();
            }
        }
    }

}]);
