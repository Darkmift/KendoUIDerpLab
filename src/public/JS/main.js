$(document).ready(function() {
    $("#grid").kendoGrid({
        columns: [{
                field: "FirstName",
                title: "First Name"
            },
            {
                field: "LastName",
                title: "Last Name"
            }
        ],
        dataSource: {
            data: [{
                    FirstName: "Joe",
                    LastName: "Smith"
                },
                {
                    FirstName: "Jane",
                    LastName: "Smith"
                }
            ]
        }
    });
});

// Initialize the Kendo UI DatePicker by calling the kendoDatePicker jQuery plugin.
$(function() {
    $("#datepicker").kendoDatePicker();
});