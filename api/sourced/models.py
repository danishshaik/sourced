from sourced import db

tags = db.Table('tags',
		db.Column('company_id', db.Integer, db.ForeignKey('company.id')),
		db.Column('category_id', db.Integer, db.ForeignKey('category.id'))
)

class Company(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String)
	desc = db.Column(db.String)
	url = db.Column(db.String)
	size = db.Column(db.String)
	headcount_growth = db.Column(db.Integer)
	upvotes = db.Column(db.Integer)
	categories = db.relationship('Category', secondary=tags, backref=db.backref('companies'))

	#Aesthetics
	image_url = db.Column(db.String)
	color = db.Column(db.String)
	stage = db.Column(db.String)

class Category(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String)
	color = db.Column(db.String)

	def find_category(name, color):
		category_result = Category.query.filter_by(name=name).first()
		if not category_result:
			category_result = Category(name=name, color=color)
			db.session.add(category_result)
			db.session.commit()

		return category_result
