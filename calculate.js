$(document).ready(function () {

    Parse.initialize('AayrV35S4XR4k67RcSpCLCzMYrcXY8e8VXge1ujc', 'SQTaY67HH1nZNZJQRdhpCCjDlGHNQC7nMo2ZfBR2');
    Parse.serverURL = 'https://parseapi.back4app.com/';

    $('#submit').click(submitForm);

    function submitForm() {




        const urlFirst = 'https://www.zillow.com/homes/for_sale/South-Bend-IN/fsba,fsbo_lt/house,mobile_type/20555_rid/0-';
        const urlSecond = '_price/0-159_mp/41.806893,-86.076508,41.485691,-86.515961_rect/10_zm/0_mmm/';

        const monthlyMaintenance = 83;
        const taxRate = 45;
        const insuranceCost = 50;
        const servicingCost = 25;
        const interestRate = .1;
        const loanPeriods = 120;
        const loanRate = interestRate / 12;
        const amortRate = (loanRate * (1 + loanRate) ** loanPeriods) / ((1 + loanRate) ** loanPeriods - 1);
        const otherCosts = monthlyMaintenance + taxRate + insuranceCost + servicingCost;
        const rentIncrease = 1.026;


        if (typeof ($('#monthlyIncome').val()) !== 'number') {
            var monthlyIncome = parseFloat($('#monthlyIncome').val());
        } else {
            var monthlyIncome = parseFloat($('#monthlyIncome').val());
        }

        if (typeof ($('#rentAmount').val()) !== 'number') {
            var rentAmount = parseFloat($('#rentAmount').val());
        } else {
            var rentAmount = parseFloat($('#rentAmount').val());
        }


        function calcMaxHouse(someIncome) {

            var houseCost = (((someIncome * .3) - otherCosts) / amortRate) / .9;
            if (houseCost > 60000) {
                return 60000;
            } else if (houseCost < 1) {
                return 1;
            } else {
                return houseCost;
            }

        }

        var maxHouseCost = parseInt(calcMaxHouse(monthlyIncome));

        console.log(maxHouseCost);

        var rentTotal = [];

        for (i = 0; i < 10; i++) {
            rentTotal[i] = rentAmount * 12;
            rentAmount = rentAmount * rentIncrease;
        }

        var fullRentCosts = rentTotal.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        });


        var rentSavings = parseInt(fullRentCosts - ((monthlyIncome * .3) * 120));


        console.log($('#emailQuery').val());
        console.log(monthlyIncome);

        if ($('#emailQuery').val() == '') {

            document.getElementById('houseSpace').appendChild(document.createTextNode('Please enter an email address'));
            
        } else if (monthlyIncome !== NaN && rentAmount !== NaN) {

            var btn = document.createElement('BUTTON');
            var t = document.createTextNode('Click Here to See Houses');

            btn.appendChild(t);

            var houseCostMessage = document.createTextNode('You may be able to buy a house worth $' + maxHouseCost + '!');
            var rentSavingsMessage = document.createTextNode('You would save $' + rentSavings + ' by buying and not renting.');

            document.getElementById('answer').appendChild(btn);
            document.getElementById('houseSpace').appendChild(houseCostMessage);
            document.getElementById('rentSpace').appendChild(rentSavingsMessage);


            btn.innerHTML = '<a href = "' + urlFirst + maxHouseCost + urlSecond + '" target="_blank">Click to See Houses</a>';


        } else {
            document.getElementById('houseSpace').appendChild(document.createTextNode('Please enter a value above'));
        }

        



        // var heyNow = document.createElement('a');
        // heyNow.href = 'https://www.zillow.com/homes/for_sale/South-Bend-IN/fsba,fsbo,new_lt/20555_rid/0-' + maxHouseCost + '_price/0-198_mp/41.801006,-86.026726,41.491606,-86.565056_rect/10_zm/0_mmm/'
        // heyNow.innerHTML = 'Look at Houses';
        // heyNow.appendTo($('#answersURL'));

        //document.getElementById('answerURL').innerHTML = moreHouses;
    }



})