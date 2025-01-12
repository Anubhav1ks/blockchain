import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import Marketplace from '../abis/Marketplace.json'
import Navbar from './Navbar'
import Main from './Main'
import HashLoader from "react-spinners/HashLoader";
//comment

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    if(networkData) {
      const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace })
      console.log(marketplace)
      const productCount = await marketplace.methods.productCount().call()
      console.log(productCount.toString())
      this.setState({productCount});

      //Load products
      for(var i=1;i<=productCount;i++)
      {
        const product=await marketplace.methods.products(i).call();
        // console.log(product);
        if(product.deleted==false&&product.owner==this.state.account)
        this.setState({ products:[...this.state.products,product]})
      }
      console.log(this.state.products)
      this.setState({ loading: false})
    } 
    else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }
    this.createProduct = this.createProduct.bind(this)
    this.deleteProduct=this.deleteProduct.bind(this)
  }

  createProduct(name, price,site) {
    this.setState({ loading: true })
    console.log(name,price,site)
    this.state.marketplace.methods.createProduct(name, price,site).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
     
    })
  }
  deleteProduct(id) {
    this.setState({ loading: true })
    this.state.marketplace.methods.deleteProduct(id).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
     
    })
  }

  render() {
    return (
      <div>
        

        
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-0.5">
          <div className="row">
            <main role="main" className="col-lg-25 ">
              { this.state.loading?
              <div id="loader" className="text-center"><p className="text-center">

                <HashLoader color="#485fc7" />

                </p></div>
                :
                <Main 
                products={this.state.products}
                createProduct={this.createProduct} 
                deleteProduct={this.deleteProduct} 
                />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
