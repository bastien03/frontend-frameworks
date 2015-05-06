function getURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}


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
          books: data._embedded.books
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

var Author = React.createClass({

  getInitialState: function() {
    return {
      author: {}
    }
  },

  componentDidMount: function() {
    $.get('/api/authors/' + this.props.id, function(data){
      if (this.isMounted()) {
        this.setState({
          author: data
        });
      }
    }.bind(this));
  },


  render: function() {
    return <section>
      <h1>{this.state.author.name}</h1>
      <BooksList source={"/api/books/search/findByAuthorId?authorId="+this.props.id} />
    </section>
  }
});

React.render(
  <div>
    <a href="index.html">&#8592;</a> start
    <Author id={getURLParameter('id')} />
  </div>,
  document.getElementById('authorContainer')
);
