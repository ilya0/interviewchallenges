var scotchTodo = angular.module('clicktoolbase', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all landers and show them
    $http.get('/api/landers')
        .success(function(data) {
            $scope.landers = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createLander = function() {
        $http.post('/api/landers', $scope.formData)
            .success(function(data) {
                // $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.landers = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a lander after checking it
    $scope.deleteLander = function(id) {
        $http.delete('/api/landers/' + id)
            .success(function(data) {
                $scope.landers = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}