import Swal from 'sweetalert2';
import React, { Component } from 'react';
import Polly15 from '../abis/Polly15.json'
import LOP from '../abis/LOP.json'
import Web3 from 'web3';
//import web3 from './web3';
import './App.css';
// import Content from './Content';
// import Content2 from './Content2';
//import Home from './App.js';

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
	proposalComment: "",
	projectNumara: "",
	voteAmount: 1000,
	voteAmountx: 1000,
    ProjectNo:[],
	commentsx:[],
	ProjectNo2:[],
    hasVoted: false,
    loading: false,
    }
	
	this.updateProposalComment = this.updateProposalComment.bind(this)
	this.updateProjectName = this.updateProjectName.bind(this)
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
		
		for(var t=0; t< this.props.ProposalSelectioncommentNo; t++){
			
			

			const commentsx = [...this.state.commentsx];
			
			commentsx.push({
				
				
					
							commenterx: this.props.ProposalSelectioncomments[(this.props.ProposalSelection-1)].commenter[t],
                            commentx: this.props.ProposalSelectioncomments[(this.props.ProposalSelection-1)].comment[t],
                
            
			
			
                            
            });
			
			
//		{this.props.ProposalSelectioncomments[(this.props.ProposalSelection-1)].commenter[0]}
//				  {this.props.ProposalSelectioncomments[(this.props.ProposalSelection-1)].comment} 
		
		
		
		this.setState({commentsx:commentsx})
		
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
	
	
	
	
	async addComment(){
		
		const balansi = await this.state.LOPx.methods.balanceOf(this.state.account).call();
		
		if ( this.props.ProposalSelectionstatus !== "Active") {
		
		Swal.fire('This proposal is not active', 'Voting and commenting to this proposal have been finalized')
		
		} else if( balansi < 100000000000) {
			
			Swal.fire('You need 100.000,00 LOP tokens to comment on a proposal')
			
		} else {
		
		const trnsfrAmnty = 100000 * 1000000;
		const proposalComment = this.state.proposalComment;
		const hak = await this.state.LOPx.methods.allowance(this.state.account, this.state.pollyadresi).call();
		
		if ( hak === "0" ) {
		
		await this.state.LOPx.methods.approve(this.state.pollyadresi, trnsfrAmnty).send({
		from: this.state.account,
		gasPrice: 101000000000
        })
            this.state.polly15.methods.addComment(this.props.ProposalSelection, proposalComment).send({
		from: this.state.account,
		gasPrice: 101000000000
        })

		
		

		
		} else {
		
		await this.state.LOPx.methods.increaseAllowance(this.state.pollyadresi, trnsfrAmnty).send({
		from: this.state.account,
		gasPrice: 101000000000
        })
			this.state.polly15.methods.addComment(this.props.ProposalSelection, proposalComment).send({
		from: this.state.account,
		gasPrice: 101000000000
        })
		
		
		}
		
		}
		
    }
	
	
	
	
	async addupVote(){
		
		const balansi = await this.state.LOPx.methods.balanceOf(this.state.account).call();
		
		
		if ( this.props.ProposalSelectionstatus !== "Active") {
		
		Swal.fire('This proposal is not active', 'Voting and commenting to this proposal have been finalized')
		
		} else if( balansi < 10000000000) {
			
			Swal.fire('You need 10.000,00 LOP tokens to vote for a proposal')
			
		} else {
			
		const trnsfrAmntx = 10000 * 1000000;
		const proposalNumara = this.props.ProposalSelection;
		const hakx = await this.state.LOPx.methods.allowance(this.state.account, this.state.pollyadresi).call();
			
			if ( hakx === "0" ) {
				
				await this.state.LOPx.methods.approve(this.state.pollyadresi, trnsfrAmntx).send({
		from: this.state.account,
		gasPrice: 101000000000
        })
            this.state.polly15.methods.upVote(proposalNumara).send({
            from: this.state.account,
			gasPrice: 101000000000
        })
				
				} else {
					
					await this.state.LOPx.methods.increaseAllowance(this.state.pollyadresi, trnsfrAmntx).send({
		from: this.state.account,
		gasPrice: 101000000000
        })
			this.state.polly15.methods.upVote(proposalNumara).send({
            from: this.state.account,
			gasPrice: 101000000000
        })
		
			}
				
			
		
		}
	
		
    }
	
	
	
	async adddownVote(){
		
		const balansi = await this.state.LOPx.methods.balanceOf(this.state.account).call();
		
		
		if ( this.props.ProposalSelectionstatus !== "Active") {
		
		Swal.fire('This proposal is not active', 'Voting and commenting to this proposal have been finalized')
		
		} else if( balansi < 10000000000) {
			
			Swal.fire('You need 10.000,00 LOP tokens to vote for a proposal')
			
		} else {
		
		
		const trnsfrAmntx = 10000 * 1000000;
		const proposalNumara = this.props.ProposalSelection;
		const hakx = await this.state.LOPx.methods.allowance(this.state.account, this.state.pollyadresi).call();
			
			if ( hakx === "0" ) {
				
				await this.state.LOPx.methods.approve(this.state.pollyadresi, trnsfrAmntx).send({
		from: this.state.account,
		gasPrice: 101000000000
        })
            this.state.polly15.methods.downVote(proposalNumara).send({
            from: this.state.account,
			gasPrice: 101000000000
        })
				
				} else {
					
					await this.state.LOPx.methods.increaseAllowance(this.state.pollyadresi, trnsfrAmntx).send({
		from: this.state.account,
		gasPrice: 101000000000
        })
			this.state.polly15.methods.downVote(proposalNumara).send({
            from: this.state.account,
			gasPrice: 101000000000
        })
		
			}
				
			
		
		
		}
		
    }
	
	
	updateProposalComment (evt) {
        console.log('proposalComment : ', this.state.proposalComment);
            this.setState({
              proposalComment: evt.target.value
            });
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
			  
			  
								
								
			  <h4 ><font className='trx' >Proposal id: </font>{this.props.ProposalSelection} &nbsp;&nbsp;
			  <font className='trx' >Upvote: </font>{this.props.ProposalSelectionupvote} &nbsp;&nbsp; <font className='trx' >Downvote: </font>{this.props.ProposalSelectiondownvote} &nbsp;&nbsp; <font className='trx' >PrizePool: </font>{this.props.ProposalSelectionprize},00 LOP tokens <br/> 
			  <font className='trx' >StartDate: </font>{this.props.ProposalSelectionstart} &nbsp;&nbsp; <font className='trx' >FinishDate: </font>{this.props.ProposalSelectionfinish} &nbsp;&nbsp;
			  <font className='trx' >Status: </font>{this.props.ProposalSelectionstatus} &nbsp;&nbsp; <br/> <font className='trx' >Proposer: </font>{this.props.ProposalSelectionproposer}
			  
			  
			  </h4>
                  <br/>
				  
				  <h4><font className='trx' >Proposal Title: </font>{this.props.ProposalSelectiontitle}</h4>
				  
                  <br/>
			  
				  <h4><font className='trx' >Proposal Content</font>
				  
				  <br/><br/>
				   {this.props.ProposalSelectioncontent}
                  <br/></h4>
				  
				  
				  <h4><font className='trx' >Comments</font> ({this.props.ProposalSelectioncommentNo})
                  <br/></h4>
				  
				  
				  
				  <h4>



					
				  
				  
				 
				   
				   <table className='table'>
        <thead>
          <tr className='trx'>
            <th>Commenter</th>
            <th>Comment</th>
   

          </tr>
        </thead>
        <tbody >
          {this.state.commentsx.map((Projectx) => {
            return(
              <tr key={Projectx.commenterx}>
                <th>{Projectx.commenterx}</th>
                <td>{Projectx.commentx}</td>
				

              </tr>
            )
          })}
        </tbody>
      </table>
	  
	  
				  
                  <br/></h4>
				  
				  {this.state.navigation === "comment" &&


										<h4><textarea name="proposalComment" cols="120" rows="20" style={{ backgroundColor: "#fff0b3" }} value={this.state.proposalComment} onChange={this.updateProposalComment}></textarea>
				
<br/>
				<button className='btn btn-warning' onClick={(event) => {
                                                                       event.preventDefault()
                                                                       this.addComment()
                                                                     }  }>Send Your Comment
                  </button>
				  <br/>
				  <h4>
				  Commenting on a proposal requires 100.000,00 LOP tokens
				  <br/>
				  You will automatically receive your ( 100.000,00 + Proposal Prize Share ) LOP tokens once the proposal gets finalized ( Approved or Declined )
				  </h4>
				  </h4>

				
								}
				  
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
                                                                       this.addupVote()
                                                                     }  }>UpVote
                  </button>
				  
				  &nbsp;
				  &nbsp;
                  
				  <button className='btn btn-warning' onClick={(event) => {
                                                                       event.preventDefault()
                                                                       this.adddownVote()
                                                                     }  }>DownVote
                  </button>
				  
				  &nbsp;
				  &nbsp;
                  
				  <button className='btn btn-warning' onClick={(event) => {
                                                                       event.preventDefault()
                                                                       this.setState({navigation:"comment"})
                                                                     }  }>Comment
                  </button>
				  <br/>
				  <h4>
				  Voting a proposal requires 10.000,00 LOP tokens
				  <br/>
				  You will automatically receive your ( 10.000,00 + Proposal Prize Share ) LOP tokens once the proposal gets finalized ( Approved or Declined )
				  </h4>
				  </h5>
				
				
              </div>
    );
  }
}

export default App;