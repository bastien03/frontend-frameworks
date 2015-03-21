var BookItem = React.createClass({
  render: function(){
    var createTr = function(item) {
      return  <tr>
                <td>{item.title}</td>
                <td>{item.year}</td>
                <td><a href={item._links.author.href}>{item._links.author.href}</a></td>
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
          books: data._embedded.books
        });
      }
    }.bind(this));
  },

  render: function() {
    return  <section>
              <h1>Books</h1>
              <div>{this.state.books.length} items</div>
              <table>
                <thead>
                  <tr>
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
  <BooksList source="/books" />,
  document.getElementById('app')
);
