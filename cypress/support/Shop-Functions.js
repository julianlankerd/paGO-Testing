

/*PagoDash will be used to access the back-end of paGO correctly*/
function pagoDash(){
	joomlalogin()
	cy.visit(backEnd)
	.get('#menu > li:nth-child(5) > a').click() //Drop Components menu
	.get('#menu > li.dropdown.open > ul > li').contains('paGO Commerce').click() // Go to paGO Dashboard
}
/*Check for any error labels left in the aftermath of the Input function, and if there are any error labels it will assign a numeric value*/
function errorScan(){
    var errorFields = Cypress.$('label.label-error');
		for(var j=0;j<errorFields.length;j++){
			errorFields[j].getParent().getElements('input')[0].value=randomString({maxLen:8,minLen:1,charSet:nums, embed:''});
		}
}
/*A very hard-handed way to drop input into all text fields... Need to find a better solution one of these days*/
function Input(tab, charChoice='All'){
	if(charChoice == "All"){
		var inputFields=Cypress.$(tab+' input[type="text"]');
		for(var i=0;i<inputFields.length;i++){
			return inputFields[i].value=randomString({maxLen:30,minLen:1,charSet:centerKybd.splice(ascii.splice(symbols.splice(nums.splice(whiteSpace)))), embed:''});
		}
	} 
	else if(charChoice == 'Number'){
		var inputFields=Cypress.$(tab+' input[type="text"]');
		for(var i=0;i<inputFields.length;i++){
			return inputFields[i].value=randomString({maxLen:10,minLen:1,charSet:nums, embed:''});
		}
	}
}
/*This function will generate a random product*/
function createProduct(){
	cy
	.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop > a').click()//Click on the 'caret' then Drop the shop menu down
	.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop.open > div > ul > li:nth-child(1) > a').click()	
	.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop.open > a').click()//Go to the shop (product view)
	.get('#limit').select('All',{force:true})//Show 'all' items
	.get('#pago_toolbar > button.new.pg-btn-medium.pg-btn-green.pg-btn-dark').click().end()//Make a new item
	cy.then(function($aaa){
		SelectRandom('fieldset', 'input', 'checked');
		SelectRandom('select', 'option');
		Input('#tabs')//This is going to find all text fields and fire garbage into said fields
		cy.get("#pago_toolbar").contains("Save & Close").click(); //This is going to try and save the product (Errors are to be expected)
		cy.then(function($bbb){
			errorScan()//This is going to scan all for all error labels, find the sibling text field associated
			cy.get('[title="Toggle editor"]').click({multiple: true})
			.get("#params\\5b description\\5d").type(randomString({maxLen:100,minLen:90,charSet:centerKybd.splice(temp),embed:""}))
			.get("#params\\5b content\\5d").type(randomString({maxLen:100,minLen:90,charSet:centerKybd.splice(temp),embed:""}))
			.get('[title="Toggle editor"]').click({multiple: true})	
			cy.get('#main-1 > ul').find('input').check({force: true})
			.get('#ui-id-6').click()
			.get('#params\\5b meta\\5d \\5b keywords\\5d').type(randomString({maxLen:100,minLen:90,charSet:centerKybd.splice(whiteSpace),embed:""}))
			.get('#params\\5b meta\\5d \\5b description\\5d').type(randomString({maxLen:100,minLen:90,charSet:centerKybd.splice(whiteSpace),embed:""}))
			cy.get('#pago_toolbar > button.apply.pg-btn-medium.pg-btn-dark.pg-btn-green').click()	//and save it
		}).end()
	}).end()
cy.visit(backEnd)

		
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
function createCategory(){
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
			cy.visit(backEnd)
			/*Get rid of every Category item*/
			//.get('#checkall').check({force:true})			
			//.get('#pago_toolbar > button.delete').click({force:true})
}

/*Create A new Attribute*/
function createAttribute(){
	cy.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop > span').click()//Click on the 'caret' then Drop the shop menu down
	cy.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop.open > div > ul').contains('Attributes').click()
	cy.get('#pago_toolbar').contains("New").click()
	cy.then(function($aaa){		
		Input('#tabs')//This is going to find all text fields and fire garbage into said fields
		SelectRandom('fieldset', 'input', 'checked');
		SelectRandom('select', 'option');
		cy.get("#pago_toolbar").contains("Save & Close").click(); //This is going to try and save the product (Errors are to be expected)
	}).end()
	cy.visit(backEnd)
}

/*Create a new coupon*/
function createCoupon(){
	cy.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop > span').click()//Click on the 'caret' then Drop the shop menu down
	cy.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop.open > div > ul').contains('Coupons').click()
	cy.get('#pago_toolbar').contains("New").click()
	cy.then(function($aaa){		
		Input('#pago > div.pg-main-container.clearfix > div > div > div')//This is going to find all text fields and fire garbage into said fields
		SelectRandom('fieldset', 'input', 'checked');
		SelectRandom('select', 'option');
		Cypress.$('#params_start')[0].value = "2000-01-01";//Set a start
		Cypress.$('#params_end')[0].value = "2099-01-01";//Set an end date
		Cypress.$('#pg-rule-container > div.pg-rule-inputs.pg-row > div:nth-child(2) > input[type="text"]')[0].value = randomString({maxLen:4,minLen:1,charSet:nums}); //Set up an actual discount

		cy.get("#pago_toolbar").contains("Save & Close").click(); //This is going to try and save the product (Errors are to be expected)
	}).end()
	cy.visit(backEnd)
}
/*Create A new Discount*/
function createDiscount(){
	cy.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop > span').click()//Click on the 'caret' then Drop the shop menu down
	cy.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop.open > div > ul').contains('Discounts').click()
	cy.get('#pago_toolbar').contains("New").click()
	cy.then(function($aaa){		
		Input('#pago > div.pg-main-container.clearfix > div > div')//This is going to find all text fields and fire garbage into said fields
		SelectRandom('fieldset', 'input', 'checked');
		SelectRandom('select', 'option');
		Cypress.$('#params_start_date')[0].value = "2000-01-01";//Set a start
		Cypress.$('#params_end_date')[0].value = "2999-01-01";//Set an End
		Cypress.$('#params_discount_amount')[0].value = randomString({maxLen:4,minLen:1,charSet:nums});
		//Input()//This is going to find all text fields and fire garbage into said fields
		cy.get("#pago_toolbar").contains("Save & Close").click(); //This is going to try and save the product (Errors are to be expected)
	}).end()
	cy.visit(backEnd)
}

/*This is going to test SEO wingman*/
function SeoWingman(){
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
	cy.visit(backEnd)
}

