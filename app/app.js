var app = angular.module("app", []);

app.controller('buttonCtrl', ['$scope', function ($scope) {
    $scope.input = "";
    $scope.x = Math.floor(Math.random() * 10 + 1);
    $scope.y = Math.floor(Math.random() * 10 + 1);
    $scope.operation = "+";
    $scope.isCorrect = false;
    $scope.tryAgain = false;
    $scope.dollars = 0.0;

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

            if ($scope.operation == '+') {
                $scope.dollars += .01;
            } else if ($scope.operation == '-') {
                $scope.dollars += .02;
            } else if ($scope.operation == 'X') {
                $scope.dollars += .03;
            } else {
                $scope.dollars += .04;
            }
            
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
