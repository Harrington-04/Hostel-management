var app = angular.module('studentApp', []);

app.controller('studentCtrl', function($scope, $http) {
  $scope.student = {}; // Initialize student data
  $scope.students = []; // Initialize array to hold students
  $scope.message = '';

  // Function to send the student data to the backend
  $scope.addStudent = function() {
    // Validate input
    if (!$scope.student.name || !$scope.student.age || !$scope.student.course) {
      $scope.message = 'All fields are required!';
      return;
    }

    $http.post('http://localhost:3000/add-student', $scope.student)
      .then(function(response) {
        $scope.message = response.data.message;
        $scope.student = {}; // Clear form after successful submission
      })
      .catch(function(error) {
        $scope.message = 'Error adding student!';
      });
  };

  // Function to fetch all students
  $scope.getStudents = function() {
    $http.get('http://localhost:3000/students')
      .then(function(response) {
        $scope.students = response.data; // Assign data to $scope.students
      })
      .catch(function(error) {
        console.error('Error fetching students:', error);
      });
  };

  // Function to delete a student
  $scope.deleteStudent = function(name) {
    $http.delete(`http://localhost:3000/delete-student/${name}`)
      .then(function(response) {
        $scope.message = response.data.message;
        $scope.getStudents(); // Refresh the list
      })
      .catch(function(error) {
        $scope.message = 'Error deleting student!';
      });
  };
});
