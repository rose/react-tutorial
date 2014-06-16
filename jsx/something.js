/** @jsx React.DOM */
  
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

var products = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
React.renderComponent(<ProdTable products={products} />, document.body);

console.log("ran script");
