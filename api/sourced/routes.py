from flask import request, jsonify
from sourced import app, db
from sourced.models import Company, Category
from sourced.schemas import CompanySchema, CategorySchema

#Init Schemas
company_schema = CompanySchema()
companies_schema = CompanySchema(many=True)

categories_schema = CategorySchema(many=True)

@app.route('/companies', methods=['GET'])
def get_companies():
	companies = Company.query.all()
	return companies_schema.jsonify(companies)

@app.route('/company/add', methods=['POST'])
def add_company():
	name = request.json.get('name')

	#check if company already exists:
	company_lookup = Company.query.filter_by(name=name).all()
	if company_lookup:
		return company_schema.jsonify(company_lookup)

	desc = request.json.get('desc')
	url = request.json.get('url')
	image_url = request.json.get('image_url')
	upvotes = request.json.get('upvotes')
	color = request.json.get('color')
	stage = request.json.get('stage')

	new_company = Company(name=name, desc=desc, url=url, image_url=image_url, upvotes=upvotes, color=color, stage=stage)

	categories = request.json.get('tags')
	for category in categories:
		category_obj = Category.find_category(category.get('name'), category.get('color'))
		new_company.categories.append(category_obj)

	db.session.add(new_company)
	db.session.commit()

	return company_schema.jsonify(new_company)


@app.route('/company/delete', methods=['POST'])
def remove_company():
	company_id = request.json.get('id')
	company = Company.query.get(company_id)

	try:
		db.session.delete(company)
		db.session.commit()
		return jsonify(success=True)

	except:
		return jsonify(success=False)


@app.route('/upvote', methods=['POST'])
def upvote():
	company_id = request.json.get('id')
	upvoted_company = Company.query.get(company_id)
	try:
		upvoted_company.upvotes += 1
		db.session.commit()
		return jsonify(success=True)

	except:
		return jsonify(success=False)




