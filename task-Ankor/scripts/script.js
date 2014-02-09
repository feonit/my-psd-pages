(function($){

    var customers, customersGroups;

    function getGroupTitle(id){
        if (typeof customersGroups === "undefined") {
            return 0;
        }
        if (typeof getGroupTitle.hash === "undefined"){
            getGroupTitle.hash = {};
            for (var i = 0, len = customersGroups.length; i < len; i +=1){
                getGroupTitle.hash[customersGroups[i].id] = customersGroups[i].title;
            }
        }
        return getGroupTitle.hash[id];
    }

    function myFunc(res1, res2){
        customers = res1[0];
        customersGroups = res2[0];

        for (var i = 0, len = customers.length; i < len; i +=1){
            var tr = $('<tr>'),
                obj = customers[i];

            $("<td><label><input type='checkbox'></label></td>").appendTo(tr);
            tr.append($('<td>').text((obj.firstname ? obj.firstname + ' ': '') + (obj.middlename ? obj.middlename + ' ':'') + (obj.lastname||'')))
                .append($('<td>').text(obj.email ? obj.email.length===17 ? obj.email : obj.email.slice(0, 17)+'...' : ''))
                .append($('<td>').text(obj.phone || ''))
                .append($('<td>').text(obj.groups ? obj.groups.map(function(id){return getGroupTitle(id)}).join(', ') : ''));
            $('tbody').append(tr);
        }
    }

    function myFailure(){
        alert('Bad connection!');
    }

    $.when( $.getJSON( "ajax/customers.json" ), $.getJSON( "ajax/customers-groups.json" ) )
        .then( myFunc, myFailure );

})(jQuery)