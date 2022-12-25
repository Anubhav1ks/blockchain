import React, { Component } from 'react';

class Main extends Component {



  render() {

    return (
      <div>
        <div className="container" style={{maxWidth : '100%',height:'40rem'}}>

                <div className="formbg-outer top">
                  <div className="formbg bottom">
                    <div className="formbg-inner padding-horizontal--48 center">
                      <span className="padding-bottom--15" >Add Credentials</span>
                      <form id='stripe-login' onSubmit={(event) => {
                        event.preventDefault()
                        const name = this.productName.value
                        const price = this.productPrice.value
                        const site = this.productSite.value
                        this.props.createProduct(name, price, site)
                      }}>
                        <div className="field padding-bottom--24">
                          <input
                            id="productSite"
                            type="text"
                            ref={(input) => { this.productSite = input }}
                            className="form-control"
                            placeholder="Title/Site"
                            required />
                        </div>
                        <div className="field padding-bottom--24">
                          <div className="">
                            <input
                              id="productName"
                              type="text"
                              ref={(input) => { this.productName = input }}
                              className="form-control"
                              placeholder="Username/ID"
                              required />
                          </div>
                        </div>
                        <div className="field padding-bottom--24">
                          <div className="">
                            <input
                              id="productPrice"
                              type="password"
                              ref={(input) => { this.productPrice = input }}
                              className="form-control"
                              placeholder="Password/Data"
                              required />
                          </div>
                        </div>
                        <div className="field padding-bottom--24">
                          <button type="submit" className="button is-block is-info is-fullwidth"  style={{marginLeft : '5px'}}>Add Credential</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>














        <p>&nbsp;</p>
        <h2 className="h2">Current Credentials</h2>
        {/* <Table data={this.props.products} columns={FeedsColumns}/> */}
        <table className="table">
          <thead>
            <tr id="white">
              <th scope="col">#</th>
              <th scope="col">Title/Site</th>
              <th scope="col">UserName/ID</th>
              <th scope="col">Password/Data</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {
              this.props.products.map((product, key) => {
                return (
                  <tr key={key}>
                    <th scope="row">{key + 1}</th>
                    <td>{product.site.toString()}</td>
                    <td>{product.name.toString()}</td>
                    <td >{product.price.toString()}</td>
                    <td>{product.owner.toString()}</td>
                    <td><button className="Delete" onClick={(event) => { this.props.deleteProduct(product.id) }}>Delete</button></td>
                  </tr>
                )
              })
            }


          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;