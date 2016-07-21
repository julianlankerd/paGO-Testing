/*PagoDash will be used to access the back-end of paGO correctly*/
function PagoDash(){
	joomlalogin()
	cy.visit(backEnd)
	.get('#menu > li:nth-child(5) > a').click() //Drop Components menu
	.get('#menu > li.dropdown.open > ul > li').contains('paGO Commerce').click() // Drop
}
/*Check for any error labels left in the aftermath of the Input function, and if there are any error labels it will assign a numeric value*/
function errorScan(){
    var errorFields = Cypress.$('label.label-error');
		for(var j=0;j<errorFields.length;j++){
			errorFields[j].getParent().getElements('input')[0].value=randomString({maxLen:8,minLen:2,charSet:nums, embed:''});
		}
}
/*A very hard-handed way to drop input into all text fields... Need to find a better solution one of these days*/
function Input(){
	var inputFields=Cypress.$('[type="text"]')
	for(var i=0;i<inputFields.length;i++){
		inputFields[i].value=randomString({maxLen:5,minLen:1,charSet:nums.splice(centerKybd.splice(centerKybd.splice(centerKybd.splice(centerKybd)))), embed:''});
	}
}


/*This function will generate a random product*/

function CreateProduct(){
	cy

	.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop > a').click()//Click on the 'caret' then Drop the shop menu down
	.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop.open > div > ul > li:nth-child(1) > a').click()	
	.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop.open > a').click()//Go to the shop (product view)
	.get('#limit').select('All',{force:true})//Show 'all' items
	.get('#pago_toolbar > button.new.pg-btn-medium.pg-btn-green.pg-btn-dark').click().end()//Make a new item

	cy.then(function($aaa){
		SelectRandom('fieldset', 'input', 'checked');
		SelectRandom('select', 'option');
		Input()//This is going to find all text fields and fire garbage into said fields
		cy.get("#pago_toolbar > button:nth-child(2)").click(); //This is going to try and save the product (Errors are to be expected)
		cy.then(function($bbb){
			errorScan()//This is going to scan all for all error labels, find the sibling text field associated
			//SelectRandom('fieldset', 'input', 'checked');
			//SelectRandom('select', 'option');
			cy.get('[title="Toggle editor"]').click({multiple: true})
			.get("#params\\5b description\\5d").type(randomString({maxLen:100,minLen:90,charSet:centerKybd.splice(temp),embed:""}))
			.get("#params\\5b content\\5d").type(randomString({maxLen:100,minLen:90,charSet:centerKybd.splice(temp),embed:""}))
			.get('[title="Toggle editor"]').click({multiple: true})	
			cy.get('#main-1 > ul').find('input').check({force: true})
			.get('#ui-id-6').click()
			.get('#params\\5b meta\\5d \\5b keywords\\5d').type(randomString({maxLen:100,minLen:90,charSet:centerKybd.splice(temp),embed:""}))
			.get('#params\\5b meta\\5d \\5b description\\5d').type(randomString({maxLen:100,minLen:90,charSet:centerKybd.splice(temp),embed:""}))
			cy.get('#pago_toolbar > button.apply.pg-btn-medium.pg-btn-dark.pg-btn-green').click()	//and save it
		}).end()
	}).end()


		
	//.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop.open > a').click()//Go to the shop (product view)
	/*Go back to the item*/
	/*cy.then(function($a){	
		return selectFrom($("#pg-items-manager > tbody > tr > td.pg-item-name > div > span > a"),"textContent",itemName)
	}).click({force: true})
	/*Use the other save button and exit*/
	/*cy.get("#pago_toolbar > button:nth-child(1)").click()
	cy.then(function($a){													//Go back again
		return selectFrom($("#pg-items-manager > tbody > tr > td.pg-item-name > div > span > a"),"textContent",itemName);
	}).click({force: true})														
	cy.get("#pago_toolbar > button:nth-child(3)").click()//Save and new
	cy.get("#pago_toolbar > button.cancel.pg-btn-medium.pg-btn-dark").click()//Cancel the new item
	/*Don't forget to check the front-end for the item that was created!*/
	/*This will delete the item(s) generated*/
	/*.get('#checkall').check({force:true})				
	.get('#pago_toolbar > button.delete').click({force:true})	*/
}

/*This will Begin testing the Categories section*/

function CreateCategory(){
	cy
			.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop > span').click()//Click on the 'caret' then Drop the shop menu down
			.get("#pago > div.pg-sidebar > ul > li.pg-menu-shop.open > div > ul > li:nth-child(2) > a").click()//Go to the categories menu
			.get("#pago_toolbar > button.new.pg-btn-medium.pg-btn-green.pg-btn-dark").click()				//Make a new category and save it
			var categoryName=randomString({maxLen:20,minLen:1,charSet:centerKybd});						//
			cy.get("#params_name").type(categoryName)									//
			.get("#params_alias").type(randomString({maxLen:20,minLen:1,charSet:centerKybd}))				//
			.get("#pago_toolbar > button:nth-child(2)").click()								//
			
			.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop.current.open > div > ul > li:nth-child(2) > a').click()//Go to the categories menu
			
			.then(function($a){													//Go back to the category
				return selectFrom($("#pg-categories-manager > tbody > tr > td.pg-category-name > a"),"textContent",categoryName);	//
			}).click()															//
			
			.get("#pago_toolbar > button:nth-child(1)").click()//Use the other save button and exit
			
			.then(function($a){													//Go back again
				return selectFrom($("#pg-categories-manager > tbody > tr > td.pg-category-name > a"),"textContent",categoryName);	//
			}).click()
																		//
			.get("#pago_toolbar > button:nth-child(3)").click()//Save and new
			.get("#pago_toolbar > button:nth-child(4)").click()//Cancel the new category
			
			/*Get rid of every Category item*/
			//.get('#checkall').check({force:true})			
			//.get('#pago_toolbar > button.delete').click({force:true})
}

/*This is going to test SEO wingman*/
/*function SeoWingman(){
	cy.get('#pago > div.pg-sidebar > ul > li.pg-menu-seo.wingman > a').click()
	cy.get('#pricing > div.pg-wingman-plan-wrapper > wingman-plan:nth-child(2) > button').click()
	cy.get('#formly_13_select_country_0').select('United States', {force: true})//Country
	cy.get('##formly_13_select_state_1').select('', {force: true})
	cy.get('#formly_13_select_country_0').select('United States', {force: true})
	cy.get('#formly_13_select_country_0').select('United States', {force: true})
	cy.get('#formly_13_input_name_0').type(randomString({maxLen:8,minLen:1,charSet:ascii.splice(centerKybd)})+' '+randomString({maxLen:8,minLen:1,charSet:ascii.splice(symbols)})) //Type name (Must have spaces)
	cy.get('#formly_13_input_email_0').type('TEST@COREPHP.COM') //Email
	cy.get('#formly_13_input_phone_1').type(randomString({maxLen:8,minLen:1,charSet:nums})) //Phone
	cy.get('#formly_13_input_line1_0').type(randomString({maxLen:8,minLen:1,charSet:ascii.splice(centerKybd)})+' '+randomString({maxLen:8,minLen:1,charSet:ascii.splice(symbols)})) //Address 1
	cy.get('#formly_13_input_city_0').type(randomString({maxLen:8,minLen:1,charSet:ascii.splice(centerKybd)})+' '+randomString({maxLen:8,minLen:1,charSet:ascii.splice(symbols)}))//City
	cy.get('#formly_13_input_postal_code_1').type(randomString({maxLen:5,minLen:5,charSet:nums}))//Zip Code
	cy.get('#formly_13_input_number_0').type('4242424242424242') //Test Card
	cy.get('#formly_13_input_cvc_1').type('4321') //test CVC
	cy.get('#subscribeForm > div > div > ng-form > div:nth-child(7) > div > button').click() //Subscribe
}*/

