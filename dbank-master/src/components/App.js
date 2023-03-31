//import Swal from 'sweetalert2';
import React, { Component } from 'react';
import Polly15 from '../abis/Polly15.json'
import LOP from '../abis/LOP.json'
import Web3 from 'web3';
//import web3 from './web3';
import './App.css';
import Content from './Content';
// import Content2 from './Content2';
import NewP from './newP.js';
import Pcontent from './pcontent.js';
//import Tablex from './Table.js';

class App extends Component {
	
	constructor(props) {
    super(props)
    this.state = {
 //     web3: 'undefined',
      account: '',
      token: null,
      dbank: null,
      balance: 0,
	  proposalSelection: 0,
	  proposalSelectioncontent: '',
	  navigation:'home',
      dBankAddress: null,
	  datax: "",
	  pollyadresi: "0x2e0E3b183A01550947f4C5ceC7B7dCFad241eA89",
	  tokenadresi: "0x1791c97603b4695f53A4f1c02ca0efB74C44b310",
	projectName: "",
	projectNumara: "",
	voteAmount: 1000,
	voteAmountx: 1000,
    ProjectNo:[],
	CommentsNo:[],
	ProjectNo2:[],
    hasVoted: false,
    loading: false,
    }
	
	
	this.updateProjectName = this.updateProjectName.bind(this)
			this.updateVoteAmount = this.updateVoteAmount.bind(this)
			this.updateVoteAmountx = this.updateVoteAmountx.bind(this)
			this.updateprojectNumara = this.updateprojectNumara.bind(this)
			this.selectproposal = this.selectproposal.bind(this)
			this.backtolist = this.backtolist.bind(this)
			
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
			
			const comments_tmp = await this.state.polly15.methods.commentsOf(i).call();
			
            console.log('project_tmp', project_tmp);

            const ProjectNo = [...this.state.ProjectNo];
			const ProjectNo2 = [...this.state.ProjectNo2];
			
			const CommentsNo = [...this.state.CommentsNo];
			
			let startDatex = parseInt(project_tmp.startTime);
			startDatex = startDatex*1000;
			let finishDatey = parseInt(project_tmp.finishTime);
			finishDatey = finishDatey*1000;

			let startDate = new Intl.DateTimeFormat(['ban', 'id'], { year: 'numeric', month: '2-digit', day: '2-digit' }).format(startDatex);
			let finishDate = new Intl.DateTimeFormat(['ban', 'id'], { year: 'numeric', month: '2-digit', day: '2-digit' }).format(finishDatey);


let status = 'Passive';

if ( project_tmp.status === "1" ) {
	status = 'Active';
} else if ( project_tmp.status === "2" ) {
	status = 'Approved';
} else if ( project_tmp.status === "3" ) {
	status = 'Declined';
}



/*
if ( project_tmp.commentNo !== "0" ) {
	
	for(var k=1; k<=project_tmp.commentNo; k++){
	
	
//	const comments_tmp = await this.state.polly15.methods.proposals(i).comments(k).call();
	
	
	const comments = [...this.state.Comments];
	
	comments.push({
                            commentcontent: project_tmp.comments,
            });
	
	
	
	
	}
}
*/
// const comments_tmp = await this.state.polly15.methods.proposals(i).call();



			if(project_tmp.status !== "0") {
				
            ProjectNo.push({
                            id: project_tmp.id,
							title: project_tmp.title,
							start: startDate,
							finish: finishDate,
							upvote: project_tmp.upvote,
							downvote: project_tmp.downvote,
							status: status,
							commentNo: project_tmp.commentNo,
							content: project_tmp.content,
							proposer: project_tmp.proposer,
							prize: project_tmp.prize / 1000000,
            });
			
			
			CommentsNo.push({
                            commentid: comments_tmp[0],
							commenter: comments_tmp[1],
							comment: comments_tmp[2],
            });
			
			
			
			}
			
			
			
			
			

			
			
//			const datax = ProjectNo2.reduce((a,v) =>  a = a + v.burnt , 0 )
//			this.setState({datax:datax})
			


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
			this.setState({CommentsNo:CommentsNo})
			this.setState({ProjectNo2:ProjectNo2})


        }

    }
	
	
	
	
	
	async addProject(){
		
		
		const trnsfrAmnt = this.state.voteAmount * 1000000;
		const projectName = this.state.projectName;
		const hak = await this.state.LOPx.methods.allowance(this.state.account, this.state.pollyadresi).call();
		
		if ( hak === "0" ) {
		
		await this.state.LOPx.methods.approve(this.state.pollyadresi, trnsfrAmnt).send({
		from: this.state.account,
		gasPrice: 101000000000
        })
            this.state.polly15.methods.addProject(projectName, trnsfrAmnt).send({
		from: this.state.account,
		gasPrice: 101000000000
        })

		
		

		
		} else {
		
		await this.state.LOPx.methods.increaseAllowance(this.state.pollyadresi, trnsfrAmnt).send({
		from: this.state.account,
		gasPrice: 101000000000
        })
			this.state.polly15.methods.addProject(projectName, trnsfrAmnt).send({
		from: this.state.account,
		gasPrice: 101000000000
        })
		
		
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
	

	
	selectproposal (veri_id, veri_content, veri_start, veri_finish, veri_upvote, veri_downvote, veri_status, veri_title, veri_commentNo, veri_comments, veri_proposer, veri_prize) {
this.setState({
	proposalSelection:veri_id,
	proposalSelectioncontent:veri_content,
	proposalSelectionstart:veri_start,
	proposalSelectionfinish:veri_finish,
	proposalSelectionupvote:veri_upvote,
	proposalSelectiondownvote:veri_downvote,
	proposalSelectionstatus:veri_status,
	proposalSelectiontitle:veri_title,
	proposalSelectioncommentNo:veri_commentNo,
	proposalSelectioncomments:veri_comments,
	proposalSelectionproposer:veri_proposer,
	proposalSelectionprize:veri_prize,
	navigation:"pcontent"
	
			})
    }
	
	
	backtolist () {
this.setState({
	navigation:"home"
	
			})
    }
	
	
	
	
	
	
	
    updateProjectName (evt) {
        console.log('projectName : ', this.state.projectName);
            this.setState({
              projectName: evt.target.value
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
			  


	
	
	
			  <h3>Kilopi D.A.O Governance</h3>

					<div className='kolon1' >
				
				
				
								{this.state.navigation === "newP" &&


										<NewP backtolist = {this.backtolist}/>
				
								}
								
								{this.state.navigation === "pcontent" &&


										<Pcontent ProposalSelection={this.state.proposalSelection} 
										ProposalSelectioncontent={this.state.proposalSelectioncontent}
										ProposalSelectionstart={this.state.proposalSelectionstart}
										ProposalSelectionfinish={this.state.proposalSelectionfinish}
										ProposalSelectionupvote={this.state.proposalSelectionupvote}
										ProposalSelectiondownvote={this.state.proposalSelectiondownvote}
										ProposalSelectionstatus={this.state.proposalSelectionstatus}
										ProposalSelectiontitle={this.state.proposalSelectiontitle}
										ProposalSelectioncommentNo={this.state.proposalSelectioncommentNo}
										ProposalSelectioncomments={this.state.CommentsNo}
										ProposalSelectionproposer={this.state.proposalSelectionproposer}
										ProposalSelectionprize={this.state.proposalSelectionprize}
										backtolist = {this.backtolist}
										
										
										
										
										
										
										/>
				
								}
								

{this.state.navigation === "home" &&

<div>

						<h3><font className='trx' >Proposal List</font></h3>
                  <br/>
				  
				  <h5> 
                  
				  <button className='btn btn-warning' onClick={(event) => {
                                                                       event.preventDefault()
                                                                       this.setState({navigation:"newP"})
                                                                     }  }>Create a New Proposal
                  </button>
				  </h5>
				  

				  <br/>
				  
				  <h5>
                  { this.state.loading
                    ? <p className='text-center'>Loading...</p>
                    : <Content
                        ProjectNo={this.state.ProjectNo} selectproposal = {this.selectproposal}/>
                  }
				  </h5>
				  
				  
				  
				  </div>
				  
				  }
				  
				  
				  
                </div>




              </div>
			  
			  
			  
    );
  }
}

export default App;
