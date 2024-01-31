import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JobPosting(props) {
	return (
		<div className='jobPosting'>
			<h1> {props.job.company.display_name}</h1>
			<h2>{props.job.title}</h2>
			<p>{props.job.description}</p>
			<p>{props.job.location.display_name}</p>
			<a href={props.job.redirect_url}>View job</a>
		</div>
	)
}

export default function Page(){
	//data you can use for styling the page, so that I don't overcall the api
	let dummyData = [
		{
			"longitude": -111.844935,
			"adref": "eyJhbGciOiJIUzI1NiJ9.eyJzIjoiLUJBaElGX0E3aEdVSG1tYUpfNEhHdyIsImkiOiI0NDkxMjkyNDY3In0.obfmw1GBza-HuzHcJXQN9gmYdFInSxxVi9LVbfqSJH0",
			"title": "Software Developer",
			"latitude": 41.729916,
			"redirect_url": "https://www.adzuna.com/details/4491292467?utm_medium=api&utm_source=893d6c06",
			"salary_max": 80425.83,
			"salary_is_predicted": "1",
			"contract_time": "full_time",
			"id": "4491292467",
			"salary_min": 80425.83,
			"description": "Malouf Companies is seeking a skilled and innovative Software Developer to join our team. As a Software Developer, you will be responsible for designing, developing, and maintaining our web applications. The ideal candidate will have a strong proficiency in Laravel, PHP, MySQL, and Vue.js, along with a passion for delivering high-quality, scalable software solutions. When you join our team, you’ll have the opportunity to work with creative, highly-driven, and supportive developers that balance …",
			"category": {
				"tag": "it-jobs",
				"__CLASS__": "Adzuna::API::Response::Category",
				"label": "IT Jobs"
			},
			"__CLASS__": "Adzuna::API::Response::Job",
			"location": {
				"display_name": "Logan, Cache County",
				"area": [
					"US",
					"Utah",
					"Cache County",
					"Logan"
				],
				"__CLASS__": "Adzuna::API::Response::Location"
			},
			"company": {
				"display_name": "Malouf Companies",
				"__CLASS__": "Adzuna::API::Response::Company"
			},
			"created": "2023-12-21T17:35:40Z"
		},
		{
			"created": "2023-12-23T12:27:18Z",
			"company": {
				"__CLASS__": "Adzuna::API::Response::Company",
				"display_name": "Monnit Corporation"
			},
			"salary_is_predicted": "0",
			"__CLASS__": "Adzuna::API::Response::Job",
			"salary_max": 60000,
			"location": {
				"__CLASS__": "Adzuna::API::Response::Location",
				"area": [
					"US",
					"Utah",
					"Davis County",
					"Kaysville"
				],
				"display_name": "Kaysville, Davis County"
			},
			"category": {
				"__CLASS__": "Adzuna::API::Response::Category",
				"label": "IT Jobs",
				"tag": "it-jobs"
			},
			"latitude": 41.029456,
			"redirect_url": "https://www.adzuna.com/details/4494160990?utm_medium=api&utm_source=893d6c06",
			"description": "Monnit, the global IoT industry leader in remote monitoring solutions, is looking for full-time Software Engineers/Developers with a desire to design and develop Monnit's leading hardware and software solutions. This job is located in our corporate headquarters in South Salt Lake. If you are a dynamic self-starter, motivated, like to win, and you're a team player who works well in a collaborative environment, keep reading ABOUT MONNIT Monnit is the global Internet of Things (IoT) industry leade…",
			"salary_min": 60000,
			"title": "Software Developer",
			"id": "4494160990",
			"longitude": -111.936136,
			"adref": "eyJhbGciOiJIUzI1NiJ9.eyJzIjoiLUJBaElGX0E3aEdVSG1tYUpfNEhHdyIsImkiOiI0NDk0MTYwOTkwIn0.sLOIP2g3_kqVVuJhPAKPjBRf4keVuGq9Xu82JS340JM"
		},
		{
			"salary_min": 38400,
			"title": "Instructor (Software Developer)",
			"id": "4523572877",
			"adref": "eyJhbGciOiJIUzI1NiJ9.eyJpIjoiNDUyMzU3Mjg3NyIsInMiOiItQkFoSUZfQTdoR1VIbW1hSl80SEd3In0.lUSxbGTFR0uMwJskP7EqhCnBRfsK_q4MQ4ksaTXh4h8",
			"longitude": -111.834519,
			"redirect_url": "https://www.adzuna.com/details/4523572877?utm_medium=api&utm_source=893d6c06",
			"latitude": 41.724977,
			"description": "The Web Department is looking for an experienced professional to teach software development. This person will be responsible for planning, developing, and presenting organized curricula; including course outlines, syllabi, and other instructional materials for hands-on, competency-based learning. Responsibilities: We are looking for a team member who has experience and passion for software development and a desire to share that passion with others. Primary responsibilities will include working …",
			"location": {
				"area": [
					"US",
					"Utah",
					"Cache County",
					"Logan"
				],
				"__CLASS__": "Adzuna::API::Response::Location",
				"display_name": "Logan, Cache County"
			},
			"__CLASS__": "Adzuna::API::Response::Job",
			"salary_max": 38400,
			"category": {
				"label": "Teaching Jobs",
				"__CLASS__": "Adzuna::API::Response::Category",
				"tag": "teaching-jobs"
			},
			"created": "2024-01-13T09:06:01Z",
			"salary_is_predicted": "0",
			"company": {
				"display_name": "Bridgerland Technical College",
				"__CLASS__": "Adzuna::API::Response::Company"
			}
		}
	]
	const [data, setData] = useState(dummyData);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [buttonClicked, setButtonClicked] = useState(false);

	const fetchData  = async () => {
		try {
			//can go here to edit search params easily:
			// https://developer.adzuna.com/activedocs#!/adzuna/search

			let adzunaAPI = ''
			const response = await axios.get(adzunaAPI);
			console.log(response.data.results)

			//filter the data
			// List of properties to keep
			const desiredProperties = ["title", "description", "location", "company", "redirect_url", "id"];

			// Function to filter each object in the array
			const filterObject = (inputObject) => {
				return Object.fromEntries(
					Object.entries(inputObject)
						.filter(([key]) => desiredProperties.includes(key))
				);
			};

			// Apply the filtering to each object in the array
			const filteredDataArray = response.data.results.map(filterObject);

			console.log(filteredDataArray);

			setData(filteredDataArray);
			
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	const handleButtonClick = () => {
		if (!buttonClicked) {
			setButtonClicked(true);
			setLoading(true);
			fetchData();
		}
	}
	
	  return (
		<div className='homePage'>
			<h1>Job Hunter</h1>
			<button onClick={handleButtonClick} disabled={buttonClicked}>Hunt</button>
			
			{data && //conditional rendering. check if data has been fetched. 
				data.map((job, index) => (
					<JobPosting key={index} job={job}></JobPosting>
				))
			}
			
		</div>
	  );
}

/*
to do:
- clean up css
*/