from sourced import ma

class CategorySchema(ma.Schema):
	class Meta:
		fields = ('id', 'name', 'color')

class CompanySchema(ma.Schema):
	class Meta:
		fields = ('id', 'name', 'desc', 'url', 'size', 'headcount_growth', 'upvotes', 'image_url', 'color', 'categories', 'stage')
	categories = ma.Nested(CategorySchema, many=True)