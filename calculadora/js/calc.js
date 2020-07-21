class Calculator{
	constructor(idResultDisplay, idOperationDisplay, idErrorDisplay){
		this.errorDisplay = idErrorDisplay;
		this.operationDisplay = idOperationDisplay;
		this.resultDisplay = idResultDisplay;
		this.operationList = Array();
		this.partialResult = 0;
		this.displayList = Array();
	}

	showInput(){
		//Show the input values on display;
		document.getElementById(this.resultDisplay).value = this.displayList.join('');
	}

	showPartialResult(){
		//Prepares the partial result to be shown on result display;
		if (!(Number.isInteger(this.partialResult))){
			this.partialResult = parseFloat(this.fixedFloat());
		}
		document.getElementById(this.resultDisplay).value = this.partialResult;
		this.isValidNumber(this.partialResult);
	}

	isValidNumber(partialResult){
		//Checks if the partialResult parameter is compatible with the result display. Otherwise, error message will be shown;
		if ((Number.isNaN(partialResult)) || (partialResult >= 99999999)){
			this.clearEverything();
			document.getElementById(this.errorDisplay).value = 'E';
		}
	}

	clearErrorDisplay(){
		//Clear the error message from result(error) display;
		document.getElementById('error').value = null;
	}

	clearDisplayList(){
		//Clear the list that represents the displayed number;
		this.displayList = Array();
		this.showInput;
	}

	clearOperationList(){
		//Clear the list that represents the realized operations;
		this.operationList = Array();
		this.showInput;
	}

	clearEverything(){
		//Clear both displays and its respective lists;
		this.clearDisplayList();
		this.clearOperationList();
		document.getElementById('operation').value = null;
		document.getElementById('result').value = null;
	}

	fixedFloat(){
		//Slice the float to fit on result display, repair that isn't a round operantion; 
		var slicedFloat = this.partialResult.toString();
		if (slicedFloat.length >= 10){
			return slicedFloat.slice(0, 9);
		}
	}

	calculatePartial(){
		//Calculate expressions, that is, when the final input is not "equal" symbol;
		var operator = this.operationList.slice(-1)[0];
		if (this.isOperator(operator)){
			switch(this.operationList[1]){
				case('+'):
				this.partialResult = parseFloat(this.operationList[0]) + parseFloat(this.operationList[3]);
				break;

				case('-'):
				this.partialResult = parseFloat(this.operationList[0]) - parseFloat(this.operationList[3]);
				break;

				case('*'):
				this.partialResult = parseFloat(this.operationList[0]) * parseFloat(this.operationList[3]);
				break;

				case('/'):
				this.partialResult = parseFloat(this.operationList[0]) / parseFloat(this.operationList[3]);
				break;
			}
			this.clearOperationList();
			this.clearDisplayList();
			
			this.operationList.push(this.partialResult.toString(), operator);
			this.showPartialResult();
		}
	}

	calculateFinal(){
		//Calculate operations when the final input is the "equal" symbol;
		var operator = this.operationList.slice(1)[0];
		if (this.isOperator(operator)){
			this.operationList.push(document.getElementById(this.resultDisplay).value);
			switch(this.operationList[1]){
				case('+'):
				this.partialResult = parseFloat(this.operationList[0]) + parseFloat(this.operationList[3]);
				break;

				case('-'):
				this.partialResult = parseFloat(this.operationList[0]) - parseFloat(this.operationList[3]);
				break;

				case('*'):
				this.partialResult = parseFloat(this.operationList[0]) * parseFloat(this.operationList[3]);
				break;

				case('/'):
				this.partialResult = parseFloat(this.operationList[0]) / parseFloat(this.operationList[3]);
				break;
			}

		}
		this.clearOperationList();
		this.clearDisplayList();
		this.showPartialResult();
	}

	filterInput(input){
		//Filter inputs allowing only the basic calculator syntax on result display.
		this.clearErrorDisplay();
		if(this.isOperator(this.operationList.slice(-1)[0])){
			this.operationList.push(' ');
			this.clearDisplayList();
		}
		if (this.displayList.length != 1){
			if ((input != '.')) {
				if (this.displayList.includes('.') && (this.displayList.length < 9)){
					this.displayList.push(input);
					this.showInput();
				}else if (this.displayList.length < 8){
					this.displayList.push(input);
					this.showInput();
				}	
			} else {
				if ( !(this.displayList.includes('.')) ){

					if (this.displayList.length == 0){
						this.displayList.push('0.');
						this.showInput();
					}else{
						this.displayList.push('.');
						this.showInput();
					}				
				}
			}
		}
		else{
			if ((this.displayList[0] != '0') && !(input == '.')){
				this.displayList.push(input);
				this.showInput();

			}else if ((this.displayList[0] == '0') && (input == '0')){
				this.showInput();
			}else{
				this.displayList.push('.');
				this.showInput();
			}
		}

	};

	addOperator(inputOperator){
		//Add the operator on operationList and filter if they were correctly inputed;
		var currentNumber = document.getElementById(this.resultDisplay).value;
		if (currentNumber.length == 0){
			currentNumber = '0';
			document.getElementById(this.resultDisplay).value = '0';
			this.showInput;
		}

		if(inputOperator == '='){
			this.calculateFinal();
		}else{
			switch(inputOperator) {
				case('+'):
				if(this.isOperator(this.operationList.slice(-1)[0])){
					this.operationList.pop();
					this.operationList.pop();
				}
				this.operationList.push(currentNumber, '+');
				break;

				case('−'):
				if(this.isOperator(this.operationList.slice(-1)[0])){
					this.operationList.pop();
					this.operationList.pop();
				}
				this.operationList.push(currentNumber, '-');
				break;

				case('÷'):
				if(this.isOperator(this.operationList.slice(-1)[0])){
					this.operationList.pop();
					this.operationList.pop();
				}
				this.operationList.push(currentNumber, '/');
				break;

				case('×'):
				if(this.isOperator(this.operationList.slice(-1)[0])){
					this.operationList.pop();
					this.operationList.pop();
				}
				this.operationList.push(currentNumber, '*');
				break;
			}
			
			if ((this.operationList.length == 5)){
				this.calculatePartial();
			}
		}
		document.getElementById(this.operationDisplay).value = inputOperator;
	}

	popLastOnDisplay(){
		//Works like a "backspace" button, cleaning the last inserted number;
		if ((this.displayList).length > 0){
			this.displayList.pop();
			this.showInput();
		}
	}

	isOperator(input){
		//Returns true if the input is an operator;
		return ('+-/*').includes(input);
	}

};

var calc = new Calculator('result', 'operation', 'error');