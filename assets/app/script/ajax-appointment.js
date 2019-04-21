"use strict";
var KTDatatablesDataSourceAjaxServer = function() {

	var initTable1 = function() {
		var table = $('#kt_table_1');

		// begin first table
		table.DataTable({
			responsive: true,
			searchDelay: 500,
			processing: true,
			serverSide: true,
			ajax: '../source/appoinment.json',
			columns: [
				{data: 'id_appmt'},
				{data: 'nama'},
				{data: 'lab'},
				{data: 'waktu'},
				{data: 'keperluan'},
				{data: 'actions', responsivePriority: -1},
			],
			columnDefs: [
				{
					targets: -1,
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <span class="dropdown">
                            <a href="#" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown" aria-expanded="true">
                              <i class="la la-ellipsis-h"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" href="master_data-lab-edit.html"><i class="la la-edit"></i> Edit Details</a>
                                <a class="dropdown-item" href="#"><i class="la la-trash"></i> Delete Record</a>
                            </div>
                        </span>`;
					},
				},
				{
					targets: [0, -1],
					className: 'text-center'
				},
				{
					targets: [4],
					width: '250px'
				}
			],
		});
	};

	return {

		//main function to initiate the module
		init: function() {
			initTable1();
		},

	};

}();

jQuery(document).ready(function() {
	KTDatatablesDataSourceAjaxServer.init();
});