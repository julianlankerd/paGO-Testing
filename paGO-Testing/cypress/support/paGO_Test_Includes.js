//paGO Front-End Test Include File

var	username="admin",
	password="admin",
	//email="stephen.f@corephp.com",
	domain="http://localhost/",
	frontEnd=domain+"Mr.Bince-is-my-Hero%3C3/",
	backEnd=frontEnd+"administrator/";
	//origDomain = "http://localhost/Joomla_3.5.1-Stable-Full_Package/"

var	_=Cypress._,
	$=Cypress.$;

function charSet(type){
	var newObj={starts:[],ends:[]};
	newObj.splice=(function(obj={}){//Appends the 'starts' and 'ends' arrays of one object to another
		var result=new charSet("empty");
		var inc=this.getSize();
		for(var i=0;i<inc;i++){
			result.starts[i]=this.starts[i];
			result.ends[i]=this.ends[i];
		}
		for(var i=0;i<obj.getSize();i++){
			result.starts[i+inc]=obj.starts[i];
			result.ends[i+inc]=obj.ends[i];
		}
		return result;
	})
	newObj.set=(function(obj=this){//Overwrites this object with a new one
		var inc=this.getSize();
		for(var i=0;i<obj.getSize();i++){
			this.starts[inc+i]=obj.starts[i];
			this.ends[inc+i]=obj.ends[i];
		}
		if(inc>obj.getSize()){
			for(var i=obj.getSize;i<this.getSize;i++){
				this.starts[i]=this.ends[i]=undefined;
			}
		}
		return true;
	})
	newObj.getSize=(function(){
		return this.starts.length>this.ends.length?this.starts.length:this.ends.length;
	})
	switch(type){
		case "empty":
			break;
		case "whiteSpace":
			var spaces="\f\n\r\t\v ";
			for(var i=0;i<spaces.length;i++){
				newObj.starts[i]=spaces[i];
				newObj.ends[i]='';
			}
			break;
		case "ascii":
			for(var i=0;i<256;i++){
				newObj.starts[i]=String.fromCharCode(i);
				newObj.ends[i]='';
			}
			break;
		case "symbols":	
			var symbols='`!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?';
			for(var i=0;i<symbols.length;i++){
				newObj.starts[i]=symbols[i];
				newObj.ends[i]='';
			}
			break;
		case "nums":
			for(var i=0;i<10;i++){
				newObj.starts[i]=i.toString();
				newObj.ends[i]='';
			}
			break;
		case "lower":
			var letter="a".charCodeAt(0);
			for(var i=0;i<26;i++){
				newObj.starts[i]=String.fromCharCode(i+letter);
				newObj.ends[i]='';
			}
			break;
		case "upper":
			var letter="A".charCodeAt(0);
			for(var i=0;i<26;i++){
				newObj.starts[i]=String.fromCharCode(i+letter);
				newObj.ends[i]='';
			}
			break;
		case "qwerty":
			newObj.set((new charSet("lower")).splice(new charSet("upper")));
			break;
		case "centerKybd":
			newObj.set((new charSet("nums")).splice(new charSet("qwerty")));
			newObj.starts[newObj.starts.length]=' ';
			newObj.ends[newObj.ends.length]='';
			break;
		case "noSpace":
			newObj.set((new charSet("symbols")).splice(new charSet("nums")).splice(new charSet("qwerty")));
			break;
		case "kybdChars":
			newObj.set(new charSet("noSpace"));
			newObj.starts[newObj.starts.length]=' ';
			newObj.ends[newObj.ends.length]='';
			break;
		case "HTMLText"://HTML tags for changing the appearance of text.  
			newObj.starts=[
			"<em>",
			"<i>",
			"<u>",
			"<s>",
			"<br>"
			];
			newObj.ends=[
			"</em>",
			"</i>",
			"</u>",
			"</s>",
			"</br>"
			];
			break;
		default://Go on and add your own character set!
			break;
	}
	for(var i=0;i<newObj.starts.length;i++){//This part is just for Cypress
		if(newObj.starts[i]=="{"){	//
			newObj.starts[i]="{{}";	//
		}				//
	}					//
	for(var i=0;i<newObj.ends.length;i++){	//
		if(newObj.ends[i]=="{"){	//
			newObj.ends[i]="{{}";	//
		}				//
	}					//
	return newObj;
}

var empty=charSet("empty");
var whiteSpace=charSet("whiteSpace");
var ascii=charSet("ascii");
var symbols=charSet("symbols");
var nums=charSet("nums");
var lower=charSet("lower");
var upper=charSet("upper");
var qwerty=charSet("qwerty");
var centerKybd=charSet("centerKybd");
var noSpace=charSet("noSpace");
var kybdChars=charSet("kybdChars");
var HTMLText=charSet("HTMLText");

//Used for debugging purposes
/*function checkSets($a){
	eval("var "+$a+"=new charSet('"+$a+"');console.log("+$a+");console.log("+$a+".starts);console.log("+$a+".ends);");
}
checkSets("empty");
checkSets("whiteSpace");
checkSets("ascii");
checkSets("symbols");
checkSets("nums");
checkSets("lower");
checkSets("upper");
checkSets("qwerty");
checkSets("centerKybd");
checkSets("noSpace");
checkSets("kybdChars");
checkSets("HTMLText");*/

//TEST THIS!
function randomString($argsObj={maxLen:1,minLen:1,charSet:ascii,embed:""}){//Generates a random string; geared to work with HTML tags and text
	var callNum=0;
	var len=Math.floor(Math.random()*($argsObj.maxLen+1-$argsObj.minLen)+$argsObj.minLen);//Determines the length of the resultant string
	var callEmbed=Math.floor(Math.random()*len);//The instance that the embedded string should be embedded in
	var posEmbed=Math.floor(Math.random()*3);//The position in which the string should be embedded within its instance
	var starts=$argsObj.charSet.starts,	//Make some variables easier to access
	ends=$argsObj.charSet.ends,		//
	embed=$argsObj.embed;			//
	var generator=function(iterations=0){//This is easier to make recursive if it's named
		var strArr=["","","","","","",""];//The resultant string will be built with this
		if(iterations>0){//Die if we're done
			if(callNum==callEmbed){			//If we're in the right position then add in the embedded string
				switch(posEmbed){		//
					case 0:			//
						strArr[0]=embed;//
						break;		//
					case 1:			//
						strArr[2]=embed;//
						break;		//
					case 2:			//
						strArr[5]=embed;//
						break;		//
					default:		//
						break;		//
				}				//
			}					//
			callNum++;
			var index=Math.floor(Math.random()*starts.length);	//Adds in the random characters
			strArr[1]=starts[index];				//
			strArr[4]=ends[index];					//
			var lenSub=Math.floor(Math.random()*iterations);//The maximum possible value of lenSub is iterations-1, and the minimum possible value is 0
			var lenSide=iterations-1-lenSub;		//lenSub+lenSide==iterations-1
			strArr[3]=generator(lenSub);
			strArr[6]=generator(lenSide);
		}
		if((callNum==callEmbed)&&(Math.floor(Math.random()*2))){	//Scramble the embedded string and the random string that it's adjacent to around
			var temp=strArr[2];				//
			strArr[2]=strArr[3];				//
			strArr[3]=temp;					//
			temp=strArr[5];					//
			strArr[5]=strArr[6];				//
			strArr[6]=temp;					//
		}							//
		var result="";				//Build the return and result it
		for(var i=0;i<strArr.length;i++){	//Yes, I did just say that.  
			result+=strArr[i];		//
		}					//
		return result;				//
	}
	return generator(len);//GO!
}

function checkExists($a){//Needs work
	if($a==undefined||$a==null){
		return false;
	}
	return true;
}

//Check this again
function traverse($func,$args,$context,$selector="a"){
	cy.get($selector).then(function($a){//Get all of the hyperlinked elements
		var hrefs=$a.map(function(i, el){//Make a list of hyperlinks
			return $(el).attr("href");
		});
		_.each(hrefs,function(href){
			cy.visit(domain+href);//Go to a hyperlink
			if(checkExists($func)){//Make sure function exists
				$func.apply($context,$args);//Do something here
			}
		});
	});
}

function contentShouldExclude($strings=["not found","can't be found",".php","error"]){//Defaults to checking for 404's
	cy.get("*:visible:not(:empty):not(:has(*))").then(function($b){//Tries to select text-only elements; needs to be improved
		_.each($b,function(i){
			_.each($strings,function(j){
				expect(i.textContent).to.not.contain([j])//Compares the text of an element to an error message
			});
		});
	});
}

function selectFrom($elements,$property,$value){
	var result=undefined;
	var keyIns=Object.keys($elements);
	for(var i=0;i<keyIns.length;i++){
		if($elements[keyIns[i]][$property]===$value){
			result=$elements[i];
		}
	}
	return result;
}

//Used to automatically login to Joomla!	
function joomlalogin(){
	cy.pause();
	var loginWindow=window.open(backEnd+"index.php?option=com_pago");
	setTimeout(function(){
		loginWindow.close();
	},3000);
	setTimeout(function(){
		cy.resume();
		//cy.visit(backEnd + "index.php?option=com_pago");
		cy.end();
	},4000);
}

//Selects a random option for each 'select' element that's a child of the region
function withinSelectRandom($region,$selector='select',$attribute='selected'){
   var x=Cypress.$($region).find($selector);
   for(var i=0;i<x.length;i++){
       for(var j=0;j<x[i].length;j++){
           x[i].children[j].removeAttribute($attribute);
       }
   }
   for(var i=0;i<x.length;i++){
       var findOptions=x[i].children;
       var TheOne=Math.floor(Math.random()*findOptions.length);
       findOptions[TheOne].setAttribute($attribute,$attribute);
   }
}