import Swal from 'sweetalert2';
import React, { Component } from 'react';
import Polly15 from '../abis/Polly15.json'
import LOP from '../abis/LOP.json'
import Web3 from 'web3';
//import web3 from './web3';
import './App.css';
// import Content from './Content';
// import Content2 from './Content2';

class App extends Component {
	
	constructor(props) {
    super(props)
    this.state = {
 //     web3: 'undefined',
      account: '',
      token: null,
      dbank: null,
      balance: 0,
      dBankAddress: null,
	  datax: "",
	  pollyadresi: "0x2e0E3b183A01550947f4C5ceC7B7dCFad241eA89",
	  tokenadresi: "0x1791c97603b4695f53A4f1c02ca0efB74C44b310",
	projectName: "",
	projectNumara: "",
	voteAmount: 1000,
	voteAmountx: 1000,
    ProjectNo:[],
	ProjectNo2:[],
    hasVoted: false,
    loading: false,
    }
	
	
	this.updateProposalTitle = this.updateProposalTitle.bind(this)
	this.updateProposalContent = this.updateProposalContent.bind(this)
			this.updateVoteAmount = this.updateVoteAmount.bind(this)
			this.updateVoteAmountx = this.updateVoteAmountx.bind(this)
			this.updateprojectNumara = this.updateprojectNumara.bind(this)
			
			
  }

  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
	this.fetchData();
//	this.startEventListener();
//	this.startEventListener2();
  }

	
	
	
	
  async loadBlockchainData(dispatch) {
	  
	  
    if(typeof window.ethereum==='undefined'){
		
//      const web3 = new web3(this.state.HMY_TESTNET_RPC_URL)
		
//      const web3 = new Web3(window.ethereum)


 
	  
		window.alert('Please install MetaMask')
      
	  const HMY_RPC_URL = "https://api.harmony.one"
const web3 = new Web3(HMY_RPC_URL)


		const polly15 = new web3.eth.Contract(Polly15.abi, this.state.pollyadresi)
		const LOPx = new web3.eth.Contract(LOP.abi, this.state.tokenadresi)
        this.setState({polly15: polly15})
		this.setState({LOPx: LOPx})
		

    } else  {
	
	
      
    

	const web3 = new Web3(window.ethereum)
	window.ethereum.enable()


	const accounts = await web3.eth.getAccounts()

      //load balance
      if(typeof accounts[0] !=='undefined'){
		  
		  
		  
        const balance = await web3.eth.getBalance(accounts[0])
        this.setState({account: accounts[0], balance: balance, web3: web3})
		

		const polly15 = new web3.eth.Contract(Polly15.abi, this.state.pollyadresi)
		const LOPx = new web3.eth.Contract(LOP.abi, this.state.tokenadresi)
        this.setState({polly15: polly15})
		this.setState({LOPx: LOPx})
     
	 
	  
	  
	  
      } else {
		  
		  
		  
     
	  
	  
        window.alert('Please login with MetaMask')
		
		
		const HMY_RPC_URL = "https://api.harmony.one"
			const web3 = new Web3(HMY_RPC_URL)


		const polly15 = new web3.eth.Contract(Polly15.abi, this.state.pollyadresi)
		const LOPx = new web3.eth.Contract(LOP.abi, this.state.tokenadresi)
        this.setState({polly15: polly15})
		this.setState({LOPx: LOPx})
		
      }

      //load contracts
      
	
	
	
  }
  
  }


/*
startEventListener(){

window.ethereum.on('accountsChanged', () => {
      window.location.reload();
    })
	
		this.state.polly15.events.e_addProject({})
    .on('data', async function(event){
        console.log(event.returnValues);
		
        // Do something here
		window.location.reload();
		
    })
    .on('error', console.error);

    }
	
	
	startEventListener2(){

		this.state.polly15.events.e_addtoProject({})
    .on('data', async function(event){
        console.log(event.returnValues);
		
        // Do something here
		window.location.reload();
		
    })
    .on('error', console.error);

    }
*/

async fetchData(){
        const proposalCount = await this.state.polly15.methods.proposalCount().call();
        console.log('proposalCount', proposalCount);

        for(var i=1; i<=proposalCount; i++){

            const project_tmp = await this.state.polly15.methods.proposals(i).call();
            console.log('project_tmp', project_tmp);

            const ProjectNo = [...this.state.ProjectNo];
			const ProjectNo2 = [...this.state.ProjectNo2];
			
			let startDatex = parseInt(project_tmp.startTime);
			startDatex = startDatex*1000;
			let finishDatey = parseInt(project_tmp.finishTime);
			finishDatey = finishDatey*1000;

			let startDate = new Intl.DateTimeFormat(['ban', 'id'], { year: 'numeric', month: '2-digit', day: '2-digit' }).format(startDatex);
			let finishDate = new Intl.DateTimeFormat(['ban', 'id'], { year: 'numeric', month: '2-digit', day: '2-digit' }).format(finishDatey);

			if(project_tmp.status !== "0") {
				
            ProjectNo.push({
                            id: project_tmp.id,
							title: project_tmp.title,
							start: startDate,
							finish: finishDate,
							upvote: project_tmp.upvote,
							downvote: project_tmp.downvote,
							status: project_tmp.status,
            });
			
			}
			
			
			
			if(project_tmp.published === "1") {
				
				
			ProjectNo2.push({
				
				
					
							id: project_tmp.id,
                            name: project_tmp.name,
							voted: project_tmp.voted/1000000,
							burnt: project_tmp.burnt/1000000,
							link: project_tmp.link,
							published: project_tmp.published,
							linktx: project_tmp.linkyz,
                
            
			
			
                            
            });
			

			}
			

			
			
			const datax = ProjectNo2.reduce((a,v) =>  a = a + v.burnt , 0 )
			this.setState({datax:datax})
			


  ProjectNo.sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    }
    if (a.id > b.id) {
      return -1;
    }
    return 0;
  });


ProjectNo2.sort((a, b) => {
    if (a.burnt < b.burnt) {
      return 1;
    }
    if (a.burnt > b.burnt) {
      return -1;
    }
    return 0;
  });

			
		
			
			
			

            this.setState({ProjectNo:ProjectNo})
			this.setState({ProjectNo2:ProjectNo2})


        }

    }
	
	
	
	
	
	async addProposal(){
		
		const active = await this.state.polly15.methods.active().call();
		const balansi = await this.state.LOPx.methods.balanceOf(this.state.account).call();
		
		if ( active === "1") {
		
		Swal.fire('There is already an active proposal', 'It should be finalized first')
		
		} else if ( balansi < 50000000000000) {
		
		Swal.fire('You need 50.000.000,00 LOP tokens to create a new proposal')
		
		} else {
			
		const trnsfrAmnt = 50000000 * 1000000;
		const proposalTitle = this.state.proposalTitle;
		const proposalContent = this.state.proposalContent;
		const hak = await this.state.LOPx.methods.allowance(this.state.account, this.state.pollyadresi).call();
		
		if ( hak === "0" ) {
		
		await this.state.LOPx.methods.approve(this.state.pollyadresi, trnsfrAmnt).send({
		from: this.state.account,
		gasPrice: 101000000000
        })
            this.state.polly15.methods.addProposal(proposalTitle, proposalContent).send({
		from: this.state.account,
		gasPrice: 101000000000
        })

		
		

		
		} else {
		
		await this.state.LOPx.methods.increaseAllowance(this.state.pollyadresi, trnsfrAmnt).send({
		from: this.state.account,
		gasPrice: 101000000000
        })
			this.state.polly15.methods.addProposal(proposalTitle, proposalContent).send({
		from: this.state.account,
		gasPrice: 101000000000
        })
		
		
		}
		
	}
		
    }
	
	async addtoProject(){
		
		
		const trnsfrAmntx = this.state.voteAmountx * 1000000;
		const projectNumara = this.state.projectNumara;
		const hakx = await this.state.LOPx.methods.allowance(this.state.account, this.state.pollyadresi).call();
			
			if ( hakx === "0" ) {
				
				await this.state.LOPx.methods.approve(this.state.pollyadresi, trnsfrAmntx).send({
		from: this.state.account,
		gasPrice: 101000000000
        })
            this.state.polly15.methods.addtoProject(projectNumara, trnsfrAmntx).send({
            from: this.state.account,
			gasPrice: 101000000000
        })
				
				} else {
					
					await this.state.LOPx.methods.increaseAllowance(this.state.pollyadresi, trnsfrAmntx).send({
		from: this.state.account,
		gasPrice: 101000000000
        })
			this.state.polly15.methods.addtoProject(projectNumara, trnsfrAmntx).send({
            from: this.state.account,
			gasPrice: 101000000000
        })
		
			}
				
			
		
		
	
		
    }
	
	
    updateProposalTitle (evt) {
        console.log('proposalTitle : ', this.state.proposalTitle);
            this.setState({
              proposalTitle: evt.target.value
            });
    }
	
	
	updateProposalContent (evt) {
        console.log('proposalContent : ', this.state.proposalContent);
            this.setState({
              proposalContent: evt.target.value
            });
    }
	
	
	updateprojectNumara (evt) {
        console.log('projectNumara : ', this.state.projectNumara);
            this.setState({
              projectNumara: evt.target.value
            });
    }
	
	updateVoteAmount (evt) {
        console.log('voteAmount : ', this.state.voteAmount);
            this.setState({
              voteAmount: evt.target.value
            });
    }
	
	updateVoteAmountx (evt) {
        console.log('voteAmountx : ', this.state.voteAmountx);
            this.setState({
              voteAmountx: evt.target.value
            });
    }

  

  render() {
    return (
	
	
	
      <div className='text-center'>
			  
			  <h4><font className='trx' >Create a New Proposal</font></h4>
                  <br/>
				  
				  <h4><font className='trx' >Proposal Title: </font><input style={{ width:"900px", backgroundColor: "#fff0b3" }} defaultValue={"Please delete this line and try to insert a title regarding your proposal content"} value={this.state.proposalTitle} onChange={this.updateProposalTitle}/></h4>
                  <br/>
			  
				  <h4><font className='trx' >Content</font>
				  <br/><br/>
				  <textarea name="proposalContent" cols="120" rows="20" style={{ backgroundColor: "#fff0b3" }} value={this.state.proposalContent} onChange={this.updateProposalContent}>Please delete this line and try to insert your proposal explanation in detail, as clear as you can</textarea> 
                  <br/></h4>
				  <h5> 
                  
				  
				  <button className='btn btn-warning' onClick={(event) => {
                                                                       event.preventDefault()
                                                                       this.props.backtolist()
                                                                     }  }>Back to List
                  </button>
				  
				  &nbsp;
				  &nbsp;
				  
				  <button className='btn btn-warning' onClick={(event) => {
                                                                       event.preventDefault()
                                                                       this.addProposal()
                                                                     }  }>Create The New Proposal
                  </button> 
				  <br/>
				  <h4>
				  Creating a new proposal requires 50.000.000,00 LOP tokens
				  <br/>
				  You will automatically receive your ( 50.000.000,00 + Proposal Prize Share ) LOP tokens once the proposal gets finalized ( Approved or Declined )
				  </h4>
				  </h5>
				
				
              </div>
    );
  }
}

export default App;
