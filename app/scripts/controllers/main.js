'use strict';

/**
 * @ngdoc function
 * @name squirrelnewsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the squirrelnewsApp
 */
angular.module('squirrelnewsApp')
    .controller('MainCtrl', function($scope, $http) {
        $scope.sources = [];
        $scope.source = [];
        $scope.news = [];
        var subscriptions = localStorage.getItem('subscriptions');

        $scope.newsSourceConfig = {
            create: false,
            valueField: 'id',
            labelField: 'name',
            searchField:'name',
            placeholder: 'Add news sources',
            onChange: function(value) {
                // receives the selectize object as an argument
                // console.log(value)
                localStorage.setItem('subscriptions',JSON.stringify(value));
                value.forEach(function(newsid){
                    $scope.fetchNews(newsid,true);
                });
            }
        }

        $http.get('https://newsapi.org/v1/sources?language=en').then(function(response) {
            console.log(response);
            if (response.data.status == 'ok') {
                $scope.sources = response.data.sources;
                $scope.renderSource = true;
            }
        })

        $scope.fetchNews = function(id, append) {
            $http.get('https://newsapi.org/v1/articles?source=' + id + '&apiKey=c6aa25fe1c4040cf831b77026fd099f6').then(function(response) {
                // console.log(response);
                if(append) {
                    $scope.news.push.apply($scope.news, response.data.articles);
                }else{
                    $scope.news = response.data.articles;    
                }
            });
        }

        if(subscriptions) {
            $scope.source = JSON.parse(subscriptions);
            $scope.source.forEach(function(newsid){
                $scope.fetchNews(newsid,true);
            });
        }


        $(document).ready(function() {
            $('.fixedheight').height((window.innerHeight-150) + 'px')
            //$('.news-container').height((window.innerHeight-150) + 'px')
        })
    });
