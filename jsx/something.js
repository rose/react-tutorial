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
    this.props.products.forEach(function(product) {
      if (product.name.indexOf(this.props.filterText) === -1 
          || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<CatRow category={product.category} key={product.category} />);
      }
      rows.push(<ProdRow product={product} key={product.name} />);
      lastCategory = product.category;
    }.bind(this));
    return (<table><thead><tr><th>Name</th><th>Price</th></tr></thead>
            <tbody>{rows}</tbody></table>
    );
  }
});

var SearchBar = React.createClass({
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          placeholder="Search" 
          value={this.props.filterText} 
          ref="filterTextInput"
          onChange={this.handleChange}
        />
        <p>
          <input 
            type="checkbox" 
            value={this.props.inStockOnly} 
            ref="inStockOnlyInput"
            onChange={this.handleChange}
          />
          Only show products in stock
        </p>
      </form>
    );
  },
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.getDOMNode().value,
      this.refs.inStockOnlyInput.getDOMNode().checked
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
          onUserInput={this.handleUserInput}
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
  },
  handleUserInput: function(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
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
