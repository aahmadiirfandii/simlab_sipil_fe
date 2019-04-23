"use strict";
var KTDatatablesSearchOptionsAdvancedSearch = function() {

	$.fn.dataTable.Api.register('column().title()', function() {
		return $(this.header()).text().trim();
	});

	var initTable1 = function() {
		// begin first table
		var table = $('#tbl_list_kegiatan').DataTable({
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

			searchDelay: 100,
			processing: true,
			serverSide: true,
			ajax: {
				url: '../source/kegiatan.json',
				type: 'POST',
				data: {
					// parameters for custom backend script demo
					columnsDef: [
						'id_kegiatan', 'nama_kegiatan', 'jenis_kegiatan', 'waktu', 'Aksi',],
				},
			},
			columns: [
				{data: 'id_kegiatan'},
				{data: 'nama_kegiatan'},
				{data: 'jenis_kegiatan'},
				{data: 'waktu'},
				{data: 'Aksi', responsivePriority: -1},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: -1,
					title: 'Aksi',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a data-toggle="modal" data-target="#rincian_kegiatan" class="btn btn-sm btn-primary btn_rincian" style="color:white;">Rincian</a>`;
					},
				},
				
				
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
	var initTable2 = function() {
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
				{
					targets: [0, 1, 2, 3, 4],
					className: 'text-center'
				}
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
	var initTable3 = function() {
		// begin first table
		var table = $('#tbl_list_pengujian').DataTable({
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
				url: '../source/paket_pengujian.json',
				type: 'POST',
				data: {
					// parameters for custom backend script demo
					columnsDef: [
						'id_pengujian', 'nama_paket_pengujian',  'action'],
				},
			},
			columns: [
				{data: 'id_pengujian'},
				{data: 'nama_paket_pengujian'},
				{data: 'action'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0, 1],
					className: 'text-center'
				},
				{
					targets: -1,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a data-toggle="modal" data-target="#pesan_paket_pengujian" class="btn btn-sm btn-success" style="color:white; width:80px;">Pesan</a>`;
					},
				},
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
	var initTable4 = function() {
		// begin first table
		var table = $('#tbl_list_notifikasi').DataTable({
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
				url: '../source/notifikasi.json',
				type: 'POST',
				data: {
					// parameters for custom backend script demo
					columnsDef: [
						'id_notifikasi','tanggal', 'waktu',  'keterangan'],
				},
			},
			columns: [
				{data: 'id_notifikasi'},
				{data: 'tanggal'},
				{data: 'waktu'},
				{data: 'keterangan'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0,1,2,3],
					className: 'text-center'
				},
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
	var initTable5 = function() {
		// begin first table
		var table = $('#tbl_list_daftar_pesanan').DataTable({
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
				url: '../source/pesanan.json',
				type: 'POST',
				data: {
					// parameters for custom backend script demo
					columnsDef: [
						'checklist','nama_paket', 'jumlah', 'tanggal','waktu','harga','aksi',],
				},
			},
			columns: [
				{data: 'checklist'},
				{data: 'nama_paket'},
				{data: 'jumlah'},
				{data: 'tanggal'},
				{data: 'waktu'},
				{data: 'harga'},
				{data: 'aksi'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: 0,
					title: '#',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <input type="checkbox">`;
					},
				},
				{
					targets: -1,
					title: 'Aksi',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                       <a data-toggle="modal" data-target="#ubah_pesanan" class="btn btn-sm btn-warning" style="color:white;">Ubah</a>`;
					},
				},
				{
					targets: [0,2,3,4,5, -1],
					className: 'text-center'
				}
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
			initTable2();
			initTable3();
			initTable4();
			initTable5();
		},

	};

}();

jQuery(document).ready(function() {
	KTDatatablesSearchOptionsAdvancedSearch.init();
});