function Calculation(operation) {
    var num1 = parseInt(document.getElementById("num1").value);
    var num2 = parseInt(document.getElementById("num2").value);
    var result = 0;
    
    switch(operation) {
        case 'Add':
            result = num1 + num2;
            break;
        case 'Sub':
            result = num1 - num2;
            break;
        case 'Mul':
            result = num1 * num2;
            break;
        case 'Div':
            if (num2 !== 0) {
                result = num1 / num2;
            } else {
                alert("can't use 0");
            }
            break;
        default:
            break;
    }
    
    document.getElementById("result").value = result;
}