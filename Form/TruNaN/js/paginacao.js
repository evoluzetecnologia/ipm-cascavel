$(document).ready(function () {
	//var originalTable = $('#myTable tr').clone().get();
	//var jsonTable = JSON.stringify(originalTable);
	
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
		$("#myTable tr").filter(function () {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
		});
    });
});

$(document).ready(function () {
    $("#myInputImportacao").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        if (value === '') {
            importarClientes();
        } else {
            $("#myTableImportacao tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        }
    });
});

function initializePagination(data, nItems, table, pagination) {
    var itemsPerPage = nItems; // Number of items to display per page
    var totalPages = Math.ceil(data.length / itemsPerPage);
    var container = $('#' + table);

    // Initialize the bootpag plugin
    var pagination = $('#' + pagination).bootpag({
        total: totalPages,
        page: 1,
        maxVisible: 10, // Maximum number of visible pages
        leaps: true, // Enable/disable next/previous leaps through maxVisible
        firstLastUse: true, // Enable/disable first/last buttons
        href: "#pro-page-{{number}}",

    }).on("page", function (event, num) {
        var startIndex = (num - 1) * itemsPerPage;
        var endIndex = startIndex + itemsPerPage;

        // Hide all rows
        container.find('tr').hide();

        // Show rows for the current page
        container.find('tr').slice(startIndex, endIndex).show();
    });

    // Click on the first page after loading
    container.find('tr').slice(0, itemsPerPage).show();
}
