$(function() {

    $("#jsObservationGrid").jsGrid({
        height: "70%",
        width: "100%",
        filtering: false,
        inserting: false,
        editing: false,
        sorting: true,
        paging: true,
        autoload: true,
        pageSize: 10,
        pageButtonCount: 5,
        deleteConfirm: "Do you really want to delete ?",
        controller: {
            loadData: function(filter) {
                return $.ajax({
                    type: "GET",
                    url: "/Observation/Data/",
                    data: filter
                });
            }
        },
        fields: [
            
            { name: "resource.code.text", type: "text", title:"Observation Code", width: 150 },
             { name: "resource.effectiveDateTime", type: "text", title:"Effective Datetime", width: 150 },
              { name: "resource.valueQuantity.value", type: "text" ,title:"Value", width: 150 },
                { name: "resource.valueQuantity.unit", type: "text", title:"Unit", width: 150 }
           
        ]
    });
    
});

