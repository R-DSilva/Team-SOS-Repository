(function (parent) {
    var timesheetViewModel = kendo.observable({
        jsdoDataSource: undefined,
        jsdoModel: undefined,
        selectedRow: {},
        origRow: {},
        resourceName: undefined,

        // The order of the firing of events is as follows:
        //   before-show
        //   init (fires only once)
        //   show

        var ds = {
            data    : createRandomData(20),
            pageSize: 5,
            schema  : {
                model: {
                    fields: {
                        Id       : { type: 'number' },
                        FirstName: { type: 'string' },
                        LastName : { type: 'string' },
                        City     : { type: 'string' }
                    }
                }
            }
        };

        var grid = $("#grid").kendoGrid({
            dataSource: ds,
            editable  : true,
            pageable  : true,
            selectable: true,
            columns   :
            [
            { field: "FirstName", width: 90, title: "First Name" },
            { field: "LastName", width: 200, title: "Last Name" },
            { field: "City", width: 200 }
            ]
        }).data("kendoGrid");

        $("#after").on("click", function() {
            var grid = $("#grid").data("kendoGrid");
            // Get selected item
            var sel = grid.select();
            var sel_idx = sel.index();
            // Get the item
            var item = grid.dataItem(sel);
            // Get the index in the DataSource (not in current page of the grid)
            var idx = grid.dataSource.indexOf(item);
            // Insert element before
            grid.dataSource.insert(idx + 1, { LastName: "Smith", FirstName: "John", City: "Baiona" });
            grid.editRow($("#grid tr:eq(" + ( sel_idx + 2) + ")"));
        });

    });

    parent.dataViewModel = dataViewModel;

})(app.viewModels);
