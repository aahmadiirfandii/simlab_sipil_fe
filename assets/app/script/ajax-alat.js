"use strict";
var KTDatatablesSearchOptionsAdvancedSearch = function() {

	$.fn.dataTable.Api.register('column().title()', function() {
		return $(this.header()).text().trim();
	});

	var initTable1 = function() {
		// begin first table
		var table = $('#tbl_list_peralatan').DataTable({
			responsive: true,
			// Pagination settings
			dom: `<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			// read more: https://datatables.net/examples/basic_init/dom.html

			lengthMenu: [5, 10, 25, 50],

			pageLength: 10,

			language: {
				'lengthMenu': 'Display _MENU_',
			},

			searchDelay: 500,
			processing: true,
			serverSide: true,
			ajax: {
				url: '../source/alat.json',
				type: 'POST',
				data: {
					// parameters for custom backend script demo
					columnsDef: [
						'id_alat', 'gambar_alat', 'nama_alat', 'fungsi_utama', 'jumlah_alat',],
				},
			},
			columns: [
				{data: 'id_alat'},
				{data: 'gambar_alat'},
				{data: 'nama_alat'},
				{data: 'fungsi_utama'},
				{data: 'jumlah_alat'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
			],
		});

		var filter = function() {
			var val = $.fn.dataTable.util.escapeRegex($(this).val());
			table.column($(this).data('col-index')).search(val ? val : '', false, false).draw();
		};

		var asdasd = function(value, index) {
			var val = $.fn.dataTable.util.escapeRegex(value);
			table.column(index).search(val ? val : '', false, true);
		};

		$('#kt_search').on('click', function(e) {
			e.preventDefault();
			var params = {};
			$('.kt-input').each(function() {
				var i = $(this).data('col-index');
				if (params[i]) {
					params[i] += '|' + $(this).val();
				}
				else {
					params[i] = $(this).val();
				}
			});
			$.each(params, function(i, val) {
				// apply search params to datatable
				table.column(i).search(val ? val : '', false, false);
			});
			table.table().draw();
		});

		$('#kt_reset').on('click', function(e) {
			e.preventDefault();
			$('.kt-input').each(function() {
				$(this).val('');
				table.column($(this).data('col-index')).search('', false, false);
			});
			table.table().draw();
		});

		$('#kt_datepicker').datepicker({
			todayHighlight: true,
			templates: {
				leftArrow: '<i class="la la-angle-left"></i>',
				rightArrow: '<i class="la la-angle-right"></i>',
			},
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
	KTDatatablesSearchOptionsAdvancedSearch.init();
});