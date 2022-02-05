import { useState } from 'react';

import { v4 as uuid } from 'uuid';

import './App.css';

const Button = props => {
	return (
		<button {...props} className={`button ${props.className || ''}`}></button>
	)
}

const NewUserSection = props => {
	return (
		<section id="new-user">
			<div className="container">
				<Card>
					<NewUser onUserCreation={props.onUserCreation}/>
				</Card>
			</div>
		</section>
	)
}

const NewUser = props => {
	const [fullName, setFullName] = useState('');
	const [details, setDetails] = useState('');

	const onFullNameChange = event => {
		setFullName(event.target.value);
	}

	const onDetailsChange = event => {
		setDetails(event.target.value);
	}

	const userCreationHandler = event => {
		event.preventDefault();
		props.onUserCreation({
			fullName: fullName,
			details: details,
			id: uuid(),
		});
		setFullName('');
		setDetails('');
	}

	return (
		<div className="new-user">
			<form action="" onSubmit={userCreationHandler}>
				<div className="fields">
					<div className="field">
						<label>Full Name
							<input onChange={onFullNameChange} value={fullName} type="text" name="full-name" />
						</label>
					</div>
					<div className="field">
						<label>Details
							<input onChange={onDetailsChange} value={details} type="text" name="details" />
						</label>
					</div>
				</div>
				<div className="controls">
					<Button type="submit">Create</Button>
				</div>
			</form>
		</div>
	)
}

const Card = props => {
	return (
		<div className="card">
			{props.children}
		</div>
	)
}

const UserDetails = props => {
	return (
		<div className="user-details">
			<h2>{props.fullName}</h2>
			<p>{props.details}</p>
		</div>
	)
}

const UserControls = props => {
	return (
		<div className="user-controls">
			<Button onClick={() => props.onDelete()} className="cancel"><i className="fas fa-trash-alt"></i></Button>
		</div>
	)
}

const User = props => {
	const deleteHandler = () => {
		props.onDelete(props.id)
	}

	return (
		<div className="user">
			<UserDetails fullName={props.fullName} details={props.details} />
			<UserControls onDelete={deleteHandler} />
		</div>
	)
}

const Users = props => {
	return (
		<div className="users">
			{props.users.length ? (
				props.users.map(item => <User onDelete={props.onDelete} key={item.id} id={item.id} fullName={item.fullName} details={item.details} />)
			): (
				<p>Nothing to see here. Feel free to add new users</p>
			)}
		</div>
	)
}

const UsersSection = props => {
	return (
		<section id="users">
			<div className="container">
				<Card>
					<Users onDelete={props.onDelete} users={props.users}/>
				</Card>
			</div>
		</section>
	)
}

function App() {
	const [users, setUsers] = useState([
		{
			id: '1',
			fullName: 'A',
			details: 'B',
		},
		{
			id: '2',
			fullName: 'A',
			details: 'B',
		},
	]);

	const userCreationHandler = user => {
		setUsers(prevState => [...prevState, user])
	}

	const deleteHandler = id => {
		setUsers(prevState => prevState.filter(item => item.id !== id))
	}

	return (
		<>
			<NewUserSection onUserCreation={userCreationHandler} />
			<UsersSection onDelete={deleteHandler} users={users}/>
		</>
	);
}

export default App;
