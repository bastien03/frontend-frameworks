var LikeButton = React.createClass({
  getInitialState: function() {
    return {
        liked: false,
        times: 0
    };
  },
  handleClick: function(event) {
    this.setState({
        liked: !this.state.liked,
        times: this.state.times+1
    });
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
        ({this.state.times} clicks)
      </p>
    );
  }
});

React.render(
  <LikeButton />,
  document.getElementById('button')
);