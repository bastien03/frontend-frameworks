var BookItem = React.createClass({
  render: function(){
    var createTr = function(item) {
      return  <tr>
                <td><img src={item.imageUrl} className="book_cover_small"/></td>
                <td>{item.title}</td>
                <td>{item.year}</td>
                <td><a href={"authors.html?id="+item.authorId}>{item.authorName}</a></td>
              </tr>
    };

    return  <tbody>
              {this.props.items.map(createTr)}
            </tbody>
  }
});

var BooksList = React.createClass({

  getInitialState: function() {
    return {
      books: []
    }
  },

  componentDidMount: function() {
    $.get(this.props.source, function(data){
      if (this.isMounted()) {
        this.setState({
          books: data
        });
      }
    }.bind(this));
  },

  render: function() {
    return  <section>
              <h1>Books</h1>
              <div>{this.state.books.length} items</div>
              <table className="table table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Author</th>
                  </tr>
                </thead>
                <BookItem items={this.state.books}/>
              </table>
            </section>
  },
});

React.render(
  <BooksList source="/xxx" />,
  document.getElementById('app')
);
