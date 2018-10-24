$(function() {

    $("#jsGrid").jsGrid({
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
                    url: "/FHIRPatientRouter",
                    data: filter
                });
            }, 
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/FHIRPatientRouter",
                    data: item
                });
            },
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/FHIRPatientRouter",
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/FHIRPatientRouter",
                    data: item
                });
            }
        },
        fields: [
            { name: "resource.resourceType", type: "text", title:"Resource Type", width: 150},
            { name: "resource.id", type: "text", width: 150,
                   itemTemplate: function(value) {
                    return $("<a>").attr("href", "/Observation?id="+value).text(value);}
            },
            { name: "resource.name", type: "text",title:"Last Name", width: 150,
                   itemTemplate: function(value) {
                    return value[0].family;}
            },
            { name: "resource.name", type: "text",title:"First Name", width: 150,
                   itemTemplate: function(value) {
                    return value[0].given;}
            },
            { name: "resource.gender", type: "text", title:"Gender", width: 150 },
            { name: "resource.birthDate", type: "text", title:"Birth Date", width: 150 }
        ]
    });
    
});

