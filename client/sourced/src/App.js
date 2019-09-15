import React from 'react';
import logo from './logo.svg';
import './App.css';
import './hamburger.css';
import hamburger from './hamburger.png'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse'
import {Card as BootCard} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';


import FlipMove from 'react-flip-move';
import TextTransition, { presets } from "react-text-transition";

import Card from './Card.js'
// import Mobile from './Mobile.js'
import MobileCard from './MobileCard.js'

class App extends React.Component {
	constructor() {
		super();

		this.handleExpand = this.handleExpand.bind(this);
		this.mobileExpand = this.mobileExpand.bind(this);
		this.shuffleCards = this.shuffleCards.bind(this);
		this.filterByStage = this.filterByStage.bind(this);
		this.upVoteHandler = this.upVoteHandler.bind(this);

		this.state = {
			expanded: false,
			mobileExpand: false
		}
	}

	upVoteHandler(id) {
		let allcompaniesCopy = this.state.allcompanies.slice();
		fetch('http://18.144.66.128:443/upvote', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: id
			})
		})
		.then((res) => res.json())
		.then((response) => {
			if (response.success) {
				allcompaniesCopy.find((e) => {return e.id == id}).upvotes++;
				this.setState({
					allcompanies: allcompaniesCopy
				})
			}
		})
	}

	handleExpand() {
		this.setState({
			expanded: !this.state.expanded
		}, () => {
			if (this.state.expanded) {
				document.getElementById("mySidenav").style.width = "15vw";
 				document.getElementById("main").style.marginLeft = "15vw";
			} else {
				document.getElementById("mySidenav").style.width = "0";
  				document.getElementById("main").style.marginLeft= "0";
			}
		})
	}

	mobileExpand() {
		this.setState({
			mobileExpanded: !this.state.mobileExpanded
		}, () => {
			if (this.state.mobileExpanded) {
				document.getElementById("topNav").style.height = "20vh";
				document.getElementById("main-mobile").classList.add("expanded-main");
			} else {
				document.getElementById("topNav").style.height = "0";
				document.getElementById("main-mobile").classList.remove("expanded-main");
			}
		});
	}

	componentDidMount() {
		fetch('http://18.144.66.128:443/companies')
			.then((res) => res.json())
			.then((result) => {
				result.sort((a, b) => (b.upvotes-a.upvotes))
				this.setState({
					allcompanies: result,
					title: 'rocketships',
					companies: result
				})
			})
	}

	filterByStage(e) {
		let stage = e.target.textContent.toLowerCase();
		if (this.state.companies) {

			// handle the all button 
			if (stage == "all") {
				this.setState({
					companies: this.state.allcompanies,
					title: 'rocketships'
				})
				return;
			}
			
			let companiesCopy = this.state.allcompanies.slice().filter((company) => {
				return company.stage === stage
			});
			let newTitle = stage === 'midstage' ? stage + ' ventures' : stage + ' stage ventures';
			// if (stage === 'midstage') {
			// 	title = stage + ' ventures'
			// } else {
			// 	title = stage + ' stage ventures'
			// }
			this.setState({
				companies: companiesCopy,
				title: newTitle
			});
		}
	}

	shuffleCards() {
		if (this.state.companies) {
			let companiesCopy = this.state.companies.slice();
			var shuffle = function (array) {

				var currentIndex = array.length;
				var temporaryValue, randomIndex;

				while (0 !== currentIndex) {
					randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex -= 1;

					temporaryValue = array[currentIndex];
					array[currentIndex] = array[randomIndex];
					array[randomIndex] = temporaryValue;
				}

				return array;
			};
			this.setState({
				companies: shuffle(companiesCopy)
			});
		}
	}

	renderCompanies() {
		if (this.state.companies) {
			let companiesCopy = this.state.companies.slice();
			let cards = companiesCopy.map((company) => 
				<Card upVoteHandler={this.upVoteHandler} key={company.name} company={company}></Card>
			);
			return cards
		}
	}
// <Col xs={this.state.expanded ? 3 : 1}></Col>
// <Col className="mt-1 mb-1 card-container">
// 	<Button onClick={this.handleExpand}>Expand</Button>
// 	<Row className="header"><Col className="pl-4 pb-3">startups</Col></Row>
// 	{this.renderCompanies()}
// </Col>

	renderMobile() {
		if (this.state.companies) {
			return this.state.companies.map((company) => {
				return <MobileCard upVoteHandler={this.upVoteHandler} key={company.name} company={company}></MobileCard>
			})
		} else {
			return <center><h1></h1></center>
		}
	}

	render() {
		if (window.innerWidth <= 800 || window.innerHeight <= 600) {
			return (
				<div className="mobile-container">
					<div id="topNav">
						<Container style={{width: "90%"}}>
							<Row className="nav-row">
								<Col className="pl-1 pr-1"><div onClick={(e) => {this.mobileExpand(); this.filterByStage(e);}} className="menu-item pink-gradient mobile-item">Early</div></Col>
								<Col className="pl-1 pr-1"><div onClick={(e) => {this.mobileExpand(); this.filterByStage(e);}} className="menu-item blue-gradient mobile-item">Midstage</div></Col>
								<Col className="pl-1 pr-1"><div onClick={(e) => {this.mobileExpand(); this.filterByStage(e);}} className="menu-item purple-gradient mobile-item">Late</div></Col>
								<Col className="pl-1 pr-1"><div onClick={(e) => {this.mobileExpand(); this.filterByStage(e);}} className="menu-item orange-gradient mobile-item">All</div></Col>
							</Row>
						</Container>
					</div>
					<div id="main-mobile" onClick={this.state.mobileExpanded ? this.mobileExpand : () => {}}>
						<Container>
							<Row className="nav">
								<Col xs={1} className="mt-3">
									<div className="hamburger-background"><center><img onClick={this.mobileExpand} className="hamburger-img" src={hamburger}/></center></div>
								</Col>
								<Col xs={10}>
									<center style={{lineHeight: "120%"}} className="header mt-5">
										{this.state.title}
									</center>
								</Col>
							</Row>
							<FlipMove 
									enterAnimation={{from: {transform: 'translate(-10vw)', opacity: 0.1}, to: {transform: '', opacity: 1}}} 
									staggerDurationBy="50"
									duration="450"
								>
								{this.renderMobile()}
							</FlipMove>
						</Container>
					</div>
				</div>
			);
		}
		return (
			<>
			<div id="mySidenav" class="sidenav">
				<Container>
					<Row className="pt-2 pb-2 justify-content-md-center"><Col xs={8}><div onClick={this.filterByStage} class="menu-item pink-gradient">Early</div></Col></Row>
					<Row className="pt-2 pb-2 justify-content-md-center"><Col xs={8}><div onClick={this.filterByStage} class="menu-item blue-gradient">Midstage</div></Col></Row>
					<Row className="pt-2 pb-2 justify-content-md-center"><Col xs={8}><div onClick={this.filterByStage} class="menu-item purple-gradient">Late</div></Col></Row>
					<Row className="pt-2 pb-2 justify-content-md-center"><Col xs={8}><div onClick={this.filterByStage} class="menu-item orange-gradient">All</div></Col></Row>
				</Container>
			</div>
			<div id="main" className={this.state.expanded ? "custom-padding" : " "} onClick={this.state.expanded ? this.handleExpand : () => {}}>
				<Container fluid>
					<Row>
						<Col className={this.state.expanded ? "card-container nine" : "card-container"}>
							<button class={this.state.expanded ? "hamburger hamburger--arrow is-active x" : "hamburger hamburger--arrow"} onClick={this.handleExpand} type="button">
									<span class="hamburger-box">
									<span class="hamburger-inner"></span>
								</span>
							</button>
							<Container>
								<Row className="header"><Col className="pl-4 pb-3"><TextTransition direction="down" text={this.state.title} springConfig={presets.wobbly}/></Col></Row>
								<FlipMove 
									enterAnimation={{from: {transform: 'translate(-10vw)', opacity: 0.1}, to: {transform: '', opacity: 1}}} 
									staggerDurationBy="50"
									duration="450"
								>
								{this.renderCompanies()}
								</FlipMove>
							</Container>
						</Col>
					</Row>
				</Container>
			</div>
			</>
		);
	}
}

export default App;
