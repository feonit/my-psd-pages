(function($){
/*    var customers = [
        {
            "id": "001",
            "firstname": "Татьяна",
            "middlename": "Владимировна",
            "lastname": "Бамович",
            "phone": "+79106961476",
            "email": "bamovich2013@gmail.com",
            "address": "115175, Россия, Москва, Котельническая набережная, 33к1, кв. 150",
            "tin": "123456789012",
            "groups": ["1"]
        },
        {
            "id": "002",
            "firstname": "Иван",
            "middlename": "Иванович",
            "lastname": "Иванов",
            "phone": "+79261234567",
            "email": "ivanoff@gmail.com",
            "address": "111333, Россия, Москва, Тверская, 12, кв. 100",
            "tin": "674530098745",
            "groups": ["1", "3"]
        },
        {
            "id": "003",
            "firstname": "Петр",
            "middlename": null,
            "lastname": "Петров",
            "phone": null,
            "email": null,
            "address": null,
            "tin": null,
            "groups": null
        },
        {
            "id": "004",
            "firstname": "Константин",
            "middlename": "Константинович",
            "lastname": "Константинопольский",
            "phone": "8(495)2345676",
            "email": null,
            "address": null,
            "tin": null,
            "groups": null
        }
    ];

    var customersGroups = [
        {
            "id": "1",
            "title": "Друзья"
        },
        {
            "id": "2",
            "title": "Родственники"
        },
        {
            "id": "3",
            "title": "Actis Wunderman Actis Wundermant"
        },
        {
            "id": "4",
            "title": "Желтушенчики"
        }
    ]*/

    var customers, customersGroups;

    function getGroupTitle(id){
        if (customersGroups === "undefined") {
            return 0;
        }
        if (getGroupTitle.hash === "undefined"){
            getGroupTitle.hash = {};
            for (var i = 0, len = customersGroups.length; i < len; i +=1){
                getGroupTitle.hash[customersGroups[i].id] = customersGroups[i].title;
            }
        }
        return getGroupTitle.hash[id];
    }

    function myFunc(res1, res2){
        customers = res1;
        customersGroups = res2;

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

    $.when( $.ajax( "ajax/customers.json" ), $.getJSON( "ajax/customers-groups.json" ) )
        .then( myFunc, myFailure );

})(jQuery)