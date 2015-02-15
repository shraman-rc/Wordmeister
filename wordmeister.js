/** @jsx React.DOM */

// Auxiliary spell checking library -- BJSpell (a Google Code project):
//  To see project details, go to: https://code.google.com/p/bjspell/ [NOT MY OWN WORK]
var spellChecker = new BJSpell("en_US");

// Parse and spell-check the text, return integer grade
var grader = function(text) {
  // Return -1 if no words typed
  if(text == ""){
    return -1;
  }
  wordList = text.split(" ");
  incorrectWords = 0;
  // Iterate through words, increment for every misspelled word
  for(i = 0; word = wordList[i]; i++){
    if(!spellChecker.check(word)){
      incorrectWords++;
    }
  }
  // Grade = (1 - (fraction of misspelled words)) * 100
  return parseInt((1.0-parseFloat(incorrectWords/wordList.length))*100)
};

// Give feedback based on student's current performance
var commenter = function(grade) {
  // Empty paragraph gets special comment
  if (grade === -1){
    return "Don't be shy, type away!"
  } else if (grade <= 60) {
    return "Needs much more work";
  } else if (grade <= 70) {
    return "Still needs work";
  } else if (grade <= 80) {
    return "You're getting there";
  } else if (grade <= 90) {
    return "Looking good";
  } else if (grade < 100) {
    return "Awesome job";
  } else if (grade === 100) {
    return "Perfect!";
  }
};

// Change text color based on student's current performance
var colorCode = function(grade) {
  var gradeBox = document.getElementsByClassName("gradebox")[0];
  // Keep it white for an empty paragraph
  if (grade === -1){
    gradeBox.style.color = '#ffffff';
  } else if (grade <= 60) {
    // Dark red
    gradeBox.style.color = '#ff3333';
  } else if (grade <= 70) {
    // Light red
    gradeBox.style.color = '#ff8533';
  } else if (grade <= 80) {
    //Yellow
    gradeBox.style.color = '#ffdb4d';
  } else if (grade <= 90) {
    // Light Green
    gradeBox.style.color = '#85e085';
  } else if (grade <= 100) {
    // Green
    gradeBox.style.color = '#33cc33';
  }
};

// React.js class for main content of the page
var Autochecker = React.createClass({
  getInitialState: function() {
    return {grade: "", comment: "< Start typing in the textbox"};
  },
  handleTyping: function(text) {
    // Live-update the autograder state for every keystroke
    var percentile = grader(text);
    var gradeString = (percentile == -1 ? "" : percentile.toString() + "%");
    this.setState({grade: gradeString,
                   comment: commenter(percentile)});
    colorCode(percentile);
  },
  render: function() {
    // Render individual React.js nodes with passed down values
    return (
      <div className="autochecker">
        <TextInput keyUpHandler={this.handleTyping}/>
        <GradeBox numStr={this.state.grade} comment={this.state.comment} />
      </div>
    );
  }
});

// React.js class for the gradebox div (shows percent grade)
var GradeBox = React.createClass({
  render: function() {
    return (
      <div className="gradebox">
        <h1>{this.props.numStr}</h1>
        {this.props.comment}
      </div>
    );
  }
});

// React.js class for the paragraph drafting textbox
var TextInput = React.createClass({
  handleTyping: function(e) {
    // Retrieve text from DOM node as typed
    var text = this.refs.text.getDOMNode().value.trim();
    // Immediately call parent's callback function to auto-refresh grade
    this.props.keyUpHandler(text);
    return;
  },
  render: function() {
    return (
      <div className="textinput">
      <textarea rows="22" cols="74" ref="text" placeholder="Type your paragraph here!" onKeyUp={this.handleTyping}></textarea>
      </div>
    );
  }
});

// Populate the "content" div with our final product
React.renderComponent(
  <Autochecker />,
  document.getElementById('content')
);

// Title heading blinking effect
var toggleHeading = function(){
  var heading = document.getElementById("heading");
  if(heading.innerHTML == "Wordmeister|"){
    heading.innerHTML = "Wordmeister&nbsp;";
  } else {
     heading.innerHTML = "Wordmeister|";
  }
}
setInterval(function() {
  toggleHeading();
}, 800)