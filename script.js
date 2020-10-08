$(document).ready(function () {
  console.log("test");

  // DOM VARIABLES

  // JS VARIABLES
  var searchTerm;
  var numRecords;
  var startYear;
  var endYear;

  var articleTitle;
  var articleAuthor;

  //FUNCTION DEFINITIONS

  function searchAPI() {
    //  put ajax api call here
    // need article name
    //need article author
    searchTerm = $("#searchTerm").val();
    console.log(searchTerm);
    startYear = $("#startYear").val();
    console.log(startYear);
    endYear = $("#endYear").val();
    console.log(endYear);

    numRecords = $("#numRecords").val();
    var beginDate = startYear + "0101";
    var endDate = endYear + "1231";
    //   var articles = "school";
    //   var beginDate = "20120101";
    //   var endDate = "20141231";
    var queryURL =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
      searchTerm +
      "&begin_year=" +
      beginDate +
      "&end_year=" +
      endDate +
      "&docs=" +
      numRecords +
      "&api-key=tl4UUHQQxTBorkvHiGHxaY79It6z4Jqt";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      search(response);
    });
  }

  function search(obj) {
    console.log($("#numRecords").val());

    clearResults();
    for (var i = 1; i < numRecords; i++) {
      articleTitle = obj.docs[i].headline.main;
      console.log(articleTitle, articleAuthor);
      articleAuthor = obj.docs[i].byline.original;
      populateArticles(articleTitle, articleAuthor);
    }
    console.log("Search!");
  }

  function clearResults() {
    $(".articleContainer").empty();
    // $("#searchTerm").empty();
    // $("#numRecords").text() = "";
    // $("#startYear").text() = "";
    // $("#endYear").text() = "";

    console.log("Clear Results!");
  }

  function populateArticles(title, author) {
    var article = $("<li>")
      .attr("class", "list-group-item")
      .html("<h2>" + title + "</h2>");
    var author = $("<p>").text(author);

    article.append(author);
    $(".articleContainer").append(article);
  }

  $("#search").on("click", function (event) {
    event.preventDefault();
    searchAPI();
    //populateArticles();
  });

  $("#clear").on("click", function (event) {
    event.preventDefault();
    $("#searchForm").trigger("reset");
    clearResults();
  });
});
