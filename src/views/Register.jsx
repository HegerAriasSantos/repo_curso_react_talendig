import Nav from "../components/Nav";
import axios from "axios";
import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
// import Countries from "../lib/Countries.json";

function Register(props) {
	const [countries, setCountries] = useState([
		{
			name: "",
			flag: "",
		},
	]);
	const [selectedCountryId, setSelectedCountryId] = useState(0);

	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then(res => {
			let commonNames = res.data.map(c => {
				return {
					name: c.name.common,
					flag: `https://countryflagsapi.com/png/${c.name.common}`,
				};
			});
			setCountries(commonNames);
		});
		console.log("countries", countries);
	}, []);

	return (
		<div>
			<Nav />
			<div className='d-flex flex-row flex-wrap justify-content-center mt-5 w-100'>
				<h3 className='w-100 text-center'>Crear cuenta nueva</h3>
				<form action='' className='card p-3 w-100' style={{ maxWidth: 350 }}>
					<input
						type='email'
						name='email'
						placeholder='Correo electrónico'
						className=''
						required
					/>
					<Select
						onChange={event => setSelectedCountryId(event.target.value)}
						children={countries}
						class='mt-2'
						label='Países'>
						{countries.map((value, index) => (
							<MenuItem key={index} value={index}>
								{value.name}
							</MenuItem>
						))}
					</Select>

					<button type='submit' className='mt-3 text-primary'>
						Crear cuenta
					</button>
				</form>
				<img
					src={selectedCountryId === 0 ? "" : countries[selectedCountryId].flag}
					alt={selectedCountryId === 0 ? "" : countries[selectedCountryId].name}
					// className='w-100'
				/>
			</div>
		</div>
	);
}

export default Register;
