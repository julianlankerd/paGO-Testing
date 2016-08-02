//Important variables. These are here so that no one has to keep changing the variables.
var	username="admin",
password="admin",
domain="http://localhost/",
frontEnd=domain+"Mr.Bince-is-my-Hero%3C3/",
backEnd=frontEnd+"administrator/";
var temp=HTMLText.splice(HTMLText);
temp=temp.splice(temp);
/*What we call Input Sanitization Hell.... Malbolge has all the nasty characters sets to test if a standard input field is sanitized correctly*/
//var Malbolge = randomString({maxLen:30,minLen:1,charSet:centerKybd.splice(ascii.splice(symbols.splice(nums.splice(whiteSpace)))), embed:''});
describe('Full paGO Testing',function(){
	
	beforeEach('',function(){
	
	})
	
	afterEach('',function(){
		cy.end()
	})

	context('paGO back-end',function(){
		it('Do everything in the back-end with this \'it\' function since otherwise it won\'t work :(',function(){
			/*Go to the back end of Joomla! and navigate to the paGO dashboard*/
			pagoDash()
			/*This is going to test the Category Section in the back-end of paGO*/
			//createCategory()
			/*This is going to begin testing the Products Section in the back-end of paGO*/
			//createProduct()
			/*This is going to create a new Attribute*/
			//createAttribute()
			
			/*This is going to create Coupons*/
			createCoupon()
			/*This will Work Wingman*/
			//seoWingman()
		})
	})
})

//Selects a random option for each 'select' element that's a child of the region