// $Id: $
function zf_ValidateAndSubmit(){
		if(zf_CheckMandatory()){
			if(zf_ValidCheck()){
				if(isSalesIQIntegrationEnabled){
					zf_addDataToSalesIQ();
				}
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}
		function zf_CheckMandatory(){
		for(i = 0 ; i < zf_MandArray.length ; i ++) {
		  	var fieldObj=document.forms.form[zf_MandArray[i]];
		  	if(fieldObj) {
				  	if(fieldObj.nodeName != null ){
				  		if ( fieldObj.nodeName=='OBJECT' ) {
								if(!zf_MandatoryCheckSignature(fieldObj)){
									zf_ShowErrorMsg(zf_MandArray[i]);
								 	return false;
								}
							}else if (((fieldObj.value).replace(/^\s+|\s+$/g, '')).length==0) {
							 if(fieldObj.type =='file')
								{
								 fieldObj.focus();
								 zf_ShowErrorMsg(zf_MandArray[i]);
								 return false;
								}
				   	   	  	  fieldObj.focus();
				   	   	  	  zf_ShowErrorMsg(zf_MandArray[i]);
				   	   	  	  return false;
							}  else if( fieldObj.nodeName=='SELECT' ) {// No I18N
				  	   	   	 if(fieldObj.options[fieldObj.selectedIndex].value=='-Select-') {
								fieldObj.focus();
								zf_ShowErrorMsg(zf_MandArray[i]);
								return false;
							   }
							} else if( fieldObj.type =='checkbox' || fieldObj.type =='radio' ){
								if(fieldObj.checked == false){
									fieldObj.focus();
									zf_ShowErrorMsg(zf_MandArray[i]);
									return false;
			   					}
							}
				  	}else{
				  		var checkedValsCount = 0;
						var inpChoiceElems = fieldObj;
							for(var ii = 0; ii < inpChoiceElems.length ; ii ++ ){
						      	if(inpChoiceElems[ii].checked === true ){
						      		checkedValsCount ++;
						      	}
							}
							if ( checkedValsCount == 0) {
									inpChoiceElems[0].focus();
									zf_ShowErrorMsg(zf_MandArray[i]);
									return false;
							 	}
					}
			}
		}
		return true;
	}
	function zf_ValidCheck(){
		var isValid = true;
		for(ind = 0 ; ind < zf_FieldArray.length ; ind++ ) {
			var fieldObj=document.forms.form[zf_FieldArray[ind]];
		  	if(fieldObj) {
		  		if(fieldObj.nodeName != null ){
			  		var checkType = fieldObj.getAttribute("checktype");
			  		if( checkType == "c2" ){// No I18N
			  			if( !zf_ValidateNumber(fieldObj)){
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
						}
			  		}else if( checkType == "c3" ){// No I18N
			  			if (!zf_ValidateCurrency(fieldObj) || !zf_ValidateDecimalLength(fieldObj,10) ) {
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
						}
			  		}else if( checkType == "c4" ){// No I18N
			  			if( !zf_ValidateDateFormat(fieldObj)){
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
						}
			  		}else if( checkType == "c5" ){// No I18N
			  			if (!zf_ValidateEmailID(fieldObj)) {
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
						}
			  		}else if( checkType == "c6" ){// No I18N
			  			if (!zf_ValidateLiveUrl(fieldObj)) {
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
							}
			  		}else if( checkType == "c7" ){// No I18N
			  			if (!zf_ValidatePhone(fieldObj)) {
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
							}
			  		}else if( checkType == "c8" ){// No I18N
			  			zf_ValidateSignature(fieldObj);
			  		}else if( checkType == "c9" ){// No I18N
						if( !zf_ValidateMonthYearFormat(fieldObj)){
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
						}
			  		}
			  	}
		  	}
		}
         	return isValid;
	}
	function zf_ShowErrorMsg(uniqName){
		var fldLinkName;
		for( errInd = 0 ; errInd < zf_FieldArray.length ; errInd ++ ) {
			fldLinkName = zf_FieldArray[errInd].split('_')[0];
			document.getElementById(fldLinkName+"_error").style.display = 'none';
		}
		var linkName = uniqName.split('_')[0];
		document.getElementById(linkName+"_error").style.display = 'block';
	}
	function zf_ValidateNumber(elem) {
	 	var validChars = "-0123456789";
	 	var numValue = elem.value.replace(/^\s+|\s+$/g, '');
	 	if (numValue != null && !numValue == "") {
	 		var strChar;
	 		var result = true;
	 		if (numValue.charAt(0) == "-" && numValue.length == 1) {
	 			return false;
	 		}
	 		for (i = 0; i < numValue.length && result == true; i++) {
	 			strChar = numValue.charAt(i);
	 			if ((strChar == "-") && (i != 0)) {
	 				return false;
	 			}
	 			if (validChars.indexOf(strChar) == -1) {
	 				result = false;
	 			}
	 		}
	 		return result;
	 	} else {
	 		return true;
	 	}
	 }
	 function zf_ValidateDateFormat(inpElem){
	 	var dateValue = inpElem.value.replace(/^\s+|\s+$/g, '');
	 	if( dateValue == "" ){
	 		return true;
	 	}else{
			return( zf_DateRegex.test(dateValue) );
		}
	 }
	 function zf_ValidateCurrency(elem) {
	 	var validChars = "0123456789.";
	 	var numValue = elem.value.replace(/^\s+|\s+$/g, '');
	 	if(numValue.charAt(0) == '-'){
	 		numValue = numValue.substring(1,numValue.length);
	 	}
	 	if (numValue != null && !numValue == "") {
	 		var strChar;
	 		var result = true;
	 		for (i = 0; i < numValue.length && result == true; i++) {
	 			strChar = numValue.charAt(i);
	 			if (validChars.indexOf(strChar) == -1) {
	 				result = false;
	 			}
	 		}
	 		return result;
	 	} else {
	 		return true;
	 	}
	 }
	 function zf_ValidateDecimalLength(elem,decimalLen) {
	 	var numValue = elem.value;
	 	if (numValue.indexOf('.') >= 0) {
	 		var decimalLength = numValue.substring(numValue.indexOf('.') + 1).length;
	 		if (decimalLength > decimalLen) {
	 			return false;
	 		} else {
	 			return true;
	 		}
	 	}
	 	return true;
	 }
	 function zf_ValidateEmailID(elem) {
        var check = 0;
        var emailValue = elem.value;
        if (emailValue != null && !emailValue == "") {
            var emailArray = emailValue.split(",");
            for (i = 0; i < emailArray.length; i++) {
                var emailExp = /^[\w]([\w\-.+&'/]*)@([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,22}$/;
                if (!emailExp.test(emailArray[i].replace(/^\s+|\s+$/g, ''))) {
                    check = 1;
                }
            }
            if (check == 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
    function zf_ValidateLiveUrl(elem) {
    	var urlValue = elem.value;
		if(urlValue !== null && typeof(urlValue) !== "undefined") {
			urlValue = urlValue.replace(/^\s+|\s+$/g, '');
			if(urlValue !== "") {
      			var urlregex = new RegExp("^(((https|http|ftps|ftp)://[a-zA-Z\\d]+((_|-|@)[a-zA-Z\\d]+)*(\\.[a-zA-Z\\d]+((_|-|@)[a-zA-Z\\d]+)*)+(:\\d{1,5})?)|((w|W){3}(\\.[a-zA-Z\\d]+((_|-|@)[a-zA-Z\\d]+)*){2,}(:\\d{1,5})?)|([a-zA-Z\\d]+((_|-)[a-zA-Z\\d]+)*(\\.[a-zA-Z\\d]+((_|-)[a-zA-Z\\d]+)*)+(:\\d{1,5})?))(/[-\\w.?,:'/\\\\+=&;%$#@()!~]*)?$", "i"); // This regex is taken from LiveFieldsUtil.isValidWebSiteFieldURL() method. Changes: i) Add ^ at the beginning and $ at the end. ii) Remove ?i before https and adjust () around https. iii) Add "i" in the RegExp constructor. // No I18N
				return(urlregex.test(urlValue));
			}
        }
        return true;
    }
    function zf_ValidatePhone(inpElem){

        var ZFPhoneRegex = {
            PHONE_INTE_ALL_REG: /^[+]{0,1}[()0-9-. ]+$/,
            PHONE_INTE_NUMERIC_REG: /^[0-9]+$/,
            PHONE_INTE_CONT_CODE_ENABLED_REG: /^[(0-9-.][()0-9-. ]*$/,
            PHONE_USA_REG: /^[0-9]+$/,
            PHONE_CONT_CODE_REG: /^[+][0-9]{1,4}$/
        }
    	var phoneFormat = parseInt(inpElem.getAttribute("phoneFormat"));
    	var fieldInpVal = inpElem.value.replace(/^\s+|\s+$/g, '');
    	var toReturn = true ;
    	if( phoneFormat === 1 ){
    		if(inpElem.getAttribute("valType") == 'code'){
                var codeRexp = ZFPhoneRegex.PHONE_CONT_CODE_REG;
                if(fieldInpVal != "" && !codeRexp.test(fieldInpVal)){
		           return false;
				}
    		}else{
				var IRexp = ZFPhoneRegex.PHONE_INTE_ALL_REG;
				if(inpElem.getAttribute("phoneFormatType") == '2'){
					IRexp = ZFPhoneRegex.PHONE_INTE_NUMERIC_REG;
				}
	 			if (fieldInpVal != "" && !IRexp.test(fieldInpVal)) {
	 				toReturn = false;
	 				return toReturn;
	 			}
 		    }
 			return toReturn;
    	}else if( phoneFormat === 2 ){
    		var InpMaxlength = inpElem.getAttribute("maxlength");
    		var USARexp = ZFPhoneRegex.PHONE_USA_REG;
    		if  ( fieldInpVal != "" && USARexp.test(fieldInpVal) &&  fieldInpVal.length == InpMaxlength ) {
				toReturn = true;
			}else if( fieldInpVal == "" ){
				toReturn = true;
			}else{
				toReturn = false;
			}
			return toReturn;
    	}
    }

  function zf_ValidateSignature(objElem) {
  		var linkName = objElem.getAttribute("compname");
  		var canvasElem = document.getElementById("drawingCanvas-"+linkName);
  		var isValidSign = zf_IsSignaturePresent(objElem,linkName,canvasElem);
   		var hiddenSignInputElem = document.getElementById("hiddenSignInput-"+linkName);
		if(isValidSign){
			hiddenSignInputElem.value = canvasElem.toDataURL();
		}else{
			hiddenSignInputElem.value = "";// No I18N
		}
		return isValidSign;
  	}

  	function zf_MandatoryCheckSignature(objElem){
  		var linkName = objElem.getAttribute("compname");
  		var canvasElem = document.getElementById("drawingCanvas-"+linkName);
  		var isValid = zf_IsSignaturePresent(objElem,linkName,canvasElem);
		return isValid;
  	}

  	function zf_IsSignaturePresent(objElem,linkName,canvasElem){
   		var context = canvasElem.getContext('2d'); // No I18N
   		var canvasWidth = canvasElem.width;
   		var canvasHeight = canvasElem.height;
   		var canvasData = context.getImageData(0, 0, canvasWidth, canvasHeight);
   		var signLen = canvasData.data.length;
   		var flag = false;
   		for(var index =0; index< signLen; index++) {
   	     	if(!canvasData.data[index]) {
   	       		flag =  false;
   	     	}else if(canvasData.data[index]) {
   		   		flag = true;
   		   		break;
   	     	}
   		}
		return flag;
  	}

	function zf_FocusNext(elem,event) {
	 	if(event.keyCode == 9 || event.keyCode == 16){
	      return;
	    }
	    if(event.keyCode >=37 && event.keyCode <=40){
	       return;
	    }
	    var compname = elem.getAttribute("compname");
	    var inpElemName = elem.getAttribute("name");
	 	if (inpElemName == compname+"_countrycode") {
	 		if (elem.value.length == 3) {
	 			document.getElementsByName(compname+"_first")[0].focus();
	 		}
	 	} else if (inpElemName == compname+"_first" ) {
	 		if (elem.value.length == 3) {
	 			document.getElementsByName(compname+"_second")[0].focus();
	 		}
	 	}
	}
	function zf_ValidateMonthYearFormat(inpElem){
		var monthYearValue = inpElem.value.replace(/^\s+|\s+$/g, '');
		if( monthYearValue == "" ){
			return true;
		}else{
		   return (zf_MonthYearRegex.test(monthYearValue));
	   }
	}
	
	function zf_SetDateAndMonthRegexBasedOnDateFormate(dateFormat){
		
		var dateAndMonthRegexFormateArray = new Array();
		var dateFormatRegExp;
        var monthYearFormatRegExp;
		if(dateFormat === "dd-MMM-yyyy"){
			
    	     dateFormatRegExp = "^(([0][1-9])|([1-2][0-9])|([3][0-1]))[-](Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[-](?:(?:19|20)[0-9]{2})$";
    	     monthYearFormatRegExp = "^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[-](?:(?:19|20)[0-9]{2})$";// No I18N
    	  
    	  }else if(dateFormat === "dd-MMMM-yyyy"){// No I18N
    	     dateFormatRegExp = "^(([0][1-9])|([1-2][0-9])|([3][0-1]))[-](January|February|March|April|May|June|July|August|September|October|November|December|JANUARY|FEBRUARY|MARCH|APRIL|MAY|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER)[-](?:(?:19|20)[0-9]{2})$";
    	     monthYearFormatRegExp = "^(January|February|March|April|May|June|July|August|September|October|November|December|JANUARY|FEBRUARY|MARCH|APRIL|MAY|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER)[-](?:(?:19|20)[0-9]{2})$";// No I18N
    	  
    	  }else if(dateFormat === "MMMM-dd-yyyy"){// No I18N
    	  	dateFormatRegExp = "^(January|February|March|April|May|June|July|August|September|October|November|December|JANUARY|FEBRUARY|MARCH|APRIL|MAY|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER)[-](([0][1-9])|([1-2][0-9])|([3][0-1]))[-](?:(?:19|20)[0-9]{2})$";
    	    monthYearFormatRegExp ="^(January|February|March|April|May|June|July|August|September|October|November|December|JANUARY|FEBRUARY|MARCH|APRIL|MAY|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER)[-](?:(?:19|20)[0-9]{2})$";// No I18N
    	  
    	  }else if(dateFormat === "dd/MM/yyyy"){// No I18N
    	  	dateFormatRegExp ="^(([0][1-9])|([1-2][0-9])|([3][0-1]))[\/]([0][1-9]|1[012])[\/](?:(?:19|20)[0-9]{2})$";
    	    monthYearFormatRegExp ="^([0][1-9]|1[012])[\/](?:(?:19|20)[0-9]{2})$";
    	  
    	  }else if(dateFormat === "dd-MM-yyyy"){// No I18N
    	  	dateFormatRegExp = "^(([0][1-9])|([1-2][0-9])|([3][0-1]))[-]([0][1-9]|1[012])[-](?:(?:19|20)[0-9]{2})$";
    	    monthYearFormatRegExp = "^([0][1-9]|1[012])[-](?:(?:19|20)[0-9]{2})$";
    	  
    	  }else if(dateFormat === "MM/dd/yyyy"){// No I18N
    	  	dateFormatRegExp = "^([0][1-9]|1[012])[\/](([0][1-9])|([1-2][0-9])|([3][0-1]))[\/](?:(?:19|20)[0-9]{2})$";
    	    monthYearFormatRegExp = "^([0][1-9]|1[012])[\/](?:(?:19|20)[0-9]{2})$";
    	  
    	  }else if(dateFormat === "yyyy-MM-dd"){// No I18N
    	  	dateFormatRegExp = "^(?:(?:19|20)[0-9]{2})[-]([0][1-9]|1[012])[-](([0][1-9])|([1-2][0-9])|([3][0-1]))$";
    	    monthYearFormatRegExp = "^(?:(?:19|20)[0-9]{2})[-]([0][1-9]|1[012])$";
    	  
    	  }else if(dateFormat === "yyyy/MM/dd"){// No I18N
    	  	dateFormatRegExp = "^(?:(?:19|20)[0-9]{2})[\/]([0][1-9]|1[012])[\/](([0][1-9])|([1-2][0-9])|([3][0-1]))$";
    	    monthYearFormatRegExp = "^(?:(?:19|20)[0-9]{2})[\/]([0][1-9]|1[012])$";
    	  
    	  }else if(dateFormat === "dd.MM.yyyy"){// No I18N
    	  	dateFormatRegExp = "^(([0][1-9])|([1-2][0-9])|([3][0-1]))[.]([0][1-9]|1[012])[.](?:(?:19|20)[0-9]{2})$";
    	    monthYearFormatRegExp = "^([0][1-9]|1[012])[.](?:(?:19|20)[0-9]{2})$";
    	  
    	  }else if(dateFormat === "MM-dd-yyyy"){// No I18N
    	  	dateFormatRegExp = "^([0][1-9]|1[012])[-](([0][1-9])|([1-2][0-9])|([3][0-1]))[-](?:(?:19|20)[0-9]{2})$";
    	    monthYearFormatRegExp = "^([0][1-9]|1[012])[-](?:(?:19|20)[0-9]{2})$";
    	  }
    	  dateAndMonthRegexFormateArray.push(dateFormatRegExp);
    	  dateAndMonthRegexFormateArray.push(monthYearFormatRegExp);
    	  
    	  return dateAndMonthRegexFormateArray;
    	  
    	
    }
// Initialize flavor info icon interactions
document.addEventListener('DOMContentLoaded', function() {
    const flavorIcons = document.querySelectorAll('.flavor-info-icon');
    
    flavorIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            const flavorName = this.title.replace(' flavor info', '');
            alert('Flavor: ' + flavorName);
        });
    });

	// Enforce numeric-only input for fields with checktype="c2"
	const numericInputs = document.querySelectorAll('input[checktype="c2"]');
	numericInputs.forEach(input => {
		// ensure mobile numeric keyboard
		input.setAttribute('inputmode', 'numeric');
		input.setAttribute('pattern', '[0-9]*');

		// sanitize any non-digit characters on input
		const sanitize = () => { input.value = (input.value || '').replace(/\D+/g, ''); };
		input.addEventListener('input', sanitize);

		// handle paste: allow only digits
		input.addEventListener('paste', function(e) {
			e.preventDefault();
			const paste = (e.clipboardData || window.clipboardData).getData('text') || '';
			const digits = paste.replace(/\D+/g, '');
			if (typeof document.execCommand === 'function') {
				document.execCommand('insertText', false, digits);
			} else {
				// fallback
				const start = input.selectionStart || 0;
				const end = input.selectionEnd || 0;
				input.value = input.value.slice(0, start) + digits + input.value.slice(end);
				input.setSelectionRange(start + digits.length, start + digits.length);
			}
		});

		// Enforce decimal (numeric + dot) input for fields with checktype="c3"
		const decimalInputs = document.querySelectorAll('input[checktype="c3"]');
		decimalInputs.forEach(input => {
			input.setAttribute('inputmode', 'decimal');
			input.setAttribute('pattern', '[0-9]*\.?[0-9]*');

			const sanitizeDecimal = () => {
				let v = input.value || '';
				// remove invalid chars, keep digits and dots
				v = v.replace(/[^0-9.]/g, '');
				// allow only one dot
				const parts = v.split('.');
				if (parts.length > 2) {
					v = parts.shift() + '.' + parts.join('');
				}
				input.value = v;
			};

			input.addEventListener('input', sanitizeDecimal);

			input.addEventListener('paste', function(e) {
				e.preventDefault();
				const paste = (e.clipboardData || window.clipboardData).getData('text') || '';
				let digits = paste.replace(/[^0-9.]/g, '');
				const parts = digits.split('.');
				if (parts.length > 2) {
					digits = parts.shift() + '.' + parts.join('');
				}
				if (typeof document.execCommand === 'function') {
					document.execCommand('insertText', false, digits);
				} else {
					const start = input.selectionStart || 0;
					const end = input.selectionEnd || 0;
					input.value = input.value.slice(0, start) + digits + input.value.slice(end);
					input.setSelectionRange(start + digits.length, start + digits.length);
				}
			});

			input.addEventListener('keydown', function(e) {
				const allowed = ['Backspace','Tab','ArrowLeft','ArrowRight','Delete','Home','End'];
				if (allowed.indexOf(e.key) !== -1) return;
				if (/^[0-9]$/.test(e.key)) return;
				if (e.key === '.') {
					// allow dot only if not already present
					if (input.value.indexOf('.') === -1) return;
				}
				e.preventDefault();
			});

			input.addEventListener('blur', function() {
				if (input.value && !/^\d+(\.\d+)?$/.test(input.value)) {
					input.value = '';
				}
			});
		});

		// block non-numeric key presses (allow navigation and editing keys)
		input.addEventListener('keydown', function(e) {
			const allowed = ['Backspace','Tab','ArrowLeft','ArrowRight','Delete','Home','End'];
			if (allowed.indexOf(e.key) !== -1) return;
			if (/^[0-9]$/.test(e.key)) return;
			e.preventDefault();
		});

		// on blur, clear value if it contains anything other than digits
		input.addEventListener('blur', function() {
			if (input.value && !/^\d+$/.test(input.value)) {
				input.value = '';
			}
		});

		// mark as enforced so we don't re-bind handlers
		input.dataset.enforced = 'true';
	});

	// Ensure all inputs inside table columns behave the same (some use different checktype)
	const gridInputs = document.querySelectorAll('.zfgrid_Wrapper .zfCol input[type="text"]');
	gridInputs.forEach(input => {
		if (input.dataset.enforced === 'true') return;
		const ct = input.getAttribute('checktype');
		if (ct === 'c3') {
			// decimal enforcement
			input.setAttribute('inputmode', 'decimal');
			input.setAttribute('pattern', '[0-9]*\\.?[0-9]*');
			const sanitizeDecimal = () => {
				let v = input.value || '';
				v = v.replace(/[^0-9.]/g, '');
				const parts = v.split('.');
				if (parts.length > 2) { v = parts.shift() + '.' + parts.join(''); }
				input.value = v;
			};
			input.addEventListener('input', sanitizeDecimal);
			input.addEventListener('paste', function(e){
				e.preventDefault();
				const paste = (e.clipboardData || window.clipboardData).getData('text') || '';
				let digits = paste.replace(/[^0-9.]/g, '');
				const parts = digits.split('.');
				if (parts.length > 2) { digits = parts.shift() + '.' + parts.join(''); }
				if (typeof document.execCommand === 'function') {
					document.execCommand('insertText', false, digits);
				} else {
					const start = input.selectionStart || 0; const end = input.selectionEnd || 0;
					input.value = input.value.slice(0,start) + digits + input.value.slice(end);
					input.setSelectionRange(start + digits.length, start + digits.length);
				}
			});
			input.addEventListener('keydown', function(e){
				const allowed = ['Backspace','Tab','ArrowLeft','ArrowRight','Delete','Home','End'];
				if (allowed.indexOf(e.key) !== -1) return;
				if (/^[0-9]$/.test(e.key)) return;
				if (e.key === '.') { if (input.value.indexOf('.') === -1) return; }
				e.preventDefault();
			});
			input.addEventListener('blur', function(){ if (input.value && !/^\d+(\.\d+)?$/.test(input.value)) { input.value = ''; } });
		} else {
			// integer enforcement
			input.setAttribute('inputmode', 'numeric');
			input.setAttribute('pattern', '[0-9]*');
			const sanitize = () => { input.value = (input.value || '').replace(/\D+/g, ''); };
			input.addEventListener('input', sanitize);
			input.addEventListener('paste', function(e){
				e.preventDefault();
				const paste = (e.clipboardData || window.clipboardData).getData('text') || '';
				const digits = paste.replace(/\D+/g, '');
				if (typeof document.execCommand === 'function') {
					document.execCommand('insertText', false, digits);
				} else {
					const start = input.selectionStart || 0; const end = input.selectionEnd || 0;
					input.value = input.value.slice(0,start) + digits + input.value.slice(end);
					input.setSelectionRange(start + digits.length, start + digits.length);
				}
			});
			input.addEventListener('keydown', function(e){
				const allowed = ['Backspace','Tab','ArrowLeft','ArrowRight','Delete','Home','End'];
				if (allowed.indexOf(e.key) !== -1) return;
				if (/^[0-9]$/.test(e.key)) return;
				e.preventDefault();
			});
			input.addEventListener('blur', function(){ if (input.value && !/^\d+$/.test(input.value)) { input.value = ''; } });
		}
		input.dataset.enforced = 'true';
	});
});