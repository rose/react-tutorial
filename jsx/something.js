/** @jsx React.DOM */
/* from Thinking in React (http://facebook.github.io/react/blog/2013/11/05/thinking-in-react.html) */
  
var CatRow = React.createClass({
  render: function() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>);
  }
});

var ProdRow = React.createClass ({
  render: function() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (<tr>
            <td>{name}</td>
            <td>{this.props.product.price}</td>
            </tr>
    );
  }
});

var ProdTable = React.createClass ({
  render: function() {
    var rows = [];
    var lastCategory = null;
    var that = this;
    this.props.products.forEach(function(product) {
      if (product.name.indexOf(that.props.filterText) === -1 
          || (!product.stocked && that.props.inStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<CatRow category={product.category} key={product.category} />);
      }
      rows.push(<ProdRow product={product} key={product.name} />);
      lastCategory = product.category;
    });
    return (<table><thead><tr><th>Name</th><th>Price</th></tr></thead>
            <tbody>{rows}</tbody></table>
    );
  }
});

var SearchBar = React.createClass({
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Search" value={this.props.filterText} />
        <p>
          <input type="checkbox" value={this.props.inStockOnly} />
          Only show products in stock
        </p>
      </form>
    );
  }
});
 
var FilterTable = React.createClass({
  render: function() {
    return (
      <div>
        <SearchBar 
          inStockOnly={this.state.inStockOnly}
          filterText={this.state.filterText}
        />
        <ProdTable 
          inStockOnly={this.state.inStockOnly}
          filterText={this.state.filterText}
          products={this.props.products} 
        />
      </div>
    );
  },
  getInitialState: function() {
    return {filterText: 'ball', inStockOnly: true};
  }
});


var products = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
React.renderComponent(<FilterTable products={products} />, document.body);
