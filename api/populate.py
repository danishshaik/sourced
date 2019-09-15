import requests
import json

with open("companies.json") as companies_json:
	companies = json.load(companies_json)
	for company in companies:
		res = requests.post("http://18.144.66.128:443/company/add", json=company)
		if res.status_code == 200:
			print(company.get('name') + " was successfully added to the rocketship list!")
		else:
			print("Something broke :(, " + company.get('name') + " was not added to the list.")