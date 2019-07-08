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
			},
			columns: [
				{data: 'id_kegiatan'},
				{data: 'nama'},
				{data: 'nama_kegiatan'},
				{data: 'jenis_kegiatan'},
				{data: 'instansi'},
				{data: 'tanggal_mulai'},
				{data: 'tanggal_selesai'},
				{data: 'status'},
				{data: 'Aksi', responsivePriority: -1},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0, 1, 2, 3, 4,5,6,7,8],
					className: 'text-center'
				},
				{
					targets: -1,
					title: 'Aksi',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a class="btn btn-sm btn-warning btn_rincian" style="color:white;">Published</a>` 
                        	+ '<a href="rincian_kegiatan.html" class="btn btn-sm btn-primary btn_rincian" style="color:white;">Rincian</a>';
					},
				},
				{
					targets: 7,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							m_verifikasi: {'title': 'Menunggu verifikasi', 'class': 'btn-label-warning'},
							selesai: {'title': 'Selesai', 'class': ' btn-label-success'},
							ditolak: {'title': 'Ditolak', 'class': ' btn-label-danger'},
							terkonfirmasi: {'title': 'Terkonfirmasi', 'class': ' btn-label-info'},
							expired: {'title': 'Expired', 'class': ' btn-label-dark'},
							persetujuan: {'title': 'Menunggu Persetujuan', 'class': ' btn-label-primary'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="btn btn-bold btn-sm btn-font-sm ' + status[data].class + '">' + status[data].title + '</span>';
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
	var initTable1a = function() {
		// begin first table
		var table = $('#tbl_list_kegiatan_m').DataTable({
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
					targets: [0, 1, 2, 3, 4],
					className: 'text-center'
				},
				{
					targets: -1,
					title: 'Aksi',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a class="btn btn-sm btn-warning btn_rincian" style="color:white;">Published</a>` 
                        	+ '<a href="rincian_kegiatan.html" class="btn btn-sm btn-primary btn_rincian" style="color:white;">Rincian</a>';
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
			},
			columns: [
				{data: 'id_pengujian'},
				{data: 'nama_paket_pengujian'},
				{data: 'jenis_paket_pengujian'},
				{data: 'durasi_paket_pengujian'},
				{data: 'harga_paket_pengujian'},
				{data: 'action'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0, 1,2,3,4,5],
					className: 'text-center'
				},
				{
					targets: -1,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="daftar_pesanan.html" class="btn btn-sm btn-success" style="color:white; width:80px;">Pesan</a>`;
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
				
			},
			columns: [
				{data: 'id_paket'},
				{data: 'nama_paket'},
				{data: 'jumlah'},
				{data: 'waktu'},
				{data: 'harga'},
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
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <input type="checkbox"></input`;
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
	var initTable6 = function() {
		// begin first table
		var table = $('#tbl_list_invoice').DataTable({
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
				url: '../source/riwayat.json',
				type: 'POST',
				
			},
			columns: [
				{data: 'id_riwayat'},
				{data: 'tgl_permohonan'},
				{data: 'no_invoice'},
				{data: 'total'},
				{data: 'status'},
				{data: 'aksi'},
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
                        <a data-toggle="modal" data-target="#upload_bukti_pembayaran" class="btn btn-sm btn-success" style="color:white;">Upload</a>`+' <a href="print_invoice.html" class="btn btn-sm btn-warning" style="color:white;" target="_blank">Cetak</a>';
					},  
				},
				{
					targets: 4,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							pembayaran: {'title': 'Menunggu Pembayaran', 'class': 'btn-label-warning'},
							diterima: {'title': 'Diterima', 'class': ' btn-label-success'},
							ditolak: {'title': 'Ditolak', 'class': ' btn-label-danger'},
							konfirmasi: {'title': 'Menunggu Konfirmasi', 'class': ' btn-label-info'},
							expired: {'title': 'Expired', 'class': ' btn-label-dark'},
							persetujuan: {'title': 'Menunggu Persetujuan', 'class': ' btn-label-primary'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="btn btn-bold btn-sm btn-font-sm ' + status[data].class + '">' + status[data].title + '</span>';
					},
				},
				{
					targets: [0,4,-1],
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
	var initTable7 = function() {
		// begin first table
		var table = $('#tbl_invoice').DataTable({
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
			paging: false,
			ajax: {
				url: '../source/invoice.json',
				type: 'POST',
				
			},
			columns: [
				{data: 'no'},
				{data: 'nama_paket'},
				{data: 'jumlah'},
				{data: 'waktu'},
				{data: 'harga_paket'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				
				{
					targets: [0,2,-1],
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
	var initTable8 = function() {
		// begin first table
		var table = $('#tbl_jadwal_praktikum').DataTable({
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
				url: '../source/jadwal_praktikum.json',
				type: 'POST',
			},
			columns: [
				{data: 'id_praktikum'},
				{data: 'nama_praktikum'},
				{data: 'tempat_praktikum'},
				{data: 'semester'},
				{data: 'tahun_ajaran'},
				{data: 'status_praktikum', responsivePriority: -1},
				{data: 'download'},
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
					width: 150,
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="#" class="btn btn-sm btn-success" style="color:white;margin-bottom:5px" target="_blank">Modul</a>`+' <a href="#" class="btn btn-sm btn-warning" style="color:white;" target="_blank">Pembagian Kelompok</a>';
					},
				},
				{
					targets: [0,1,2,3,4,5,6],
					className: 'text-center'
				},
				{
					targets: 5,
					width: 220,
					render: function(data, type, full, meta) {
						var status = {
							terverifikasi: {'title': 'Terverifikasi', 'class': ' btn-label-success'},
							belum: {'title': 'Belum Terverifikasi', 'class': ' btn-label-warning'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="btn btn-bold btn-sm btn-font-sm ' + status[data].class + '">' + status[data].title + '</span>';
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
	var initTable9 = function() {
		// begin first table
		var table = $('#tbl_list_riwayat').DataTable({
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
				url: '../source/riwayat_layanan.json',
				type: 'POST',
			},
			columns: [
				{data: 'no'},
				{data: 'tanggal_permohonan'},
				{data: 'nama_pemohon'},
				{data: 'instansi'},
				{data: 'judul_kegiatan'},
				{data: 'jenis_kegiatan'},
				{data: 'status'},
				{data: 'aksi'},
				],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0,1,2,3,4,5,6,7],
					className: 'text-center'
				},
				{
					targets: -1,
					title: 'Aksi',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="rincian_riwayat.html" class="btn btn-sm btn-primary btn_rincian" style="color:white;">Rincian</a>`;
					},
				},
				{
					targets: 6,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							pembayaran: {'title': 'Menunggu Pembayaran', 'class': 'btn-label-warning'},
							diterima: {'title': 'Diterima', 'class': ' btn-label-success'},
							batal: {'title': 'Dibatalkan', 'class': ' btn-label-danger'},
							konfirmasi: {'title': 'Menunggu Konfirmasi', 'class': ' btn-label-info'},
							expired: {'title': 'Expired', 'class': ' btn-label-dark'},
							persetujuan: {'title': 'Menunggu Persetujuan', 'class': ' btn-label-primary'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="btn btn-bold btn-sm btn-font-sm ' + status[data].class + '">' + status[data].title + '</span>';
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
	var initTable9b = function() {
		// begin first table
		var table = $('#tbl_list_riwayat_b').DataTable({
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
				url: '../source/riwayat_layanan.json',
				type: 'POST',
			},
			columns: [
				{data: 'no'},
				{data: 'tanggal_permohonan'},
				{data: 'no_invoice'},
				{data: 'total'},
				{data: 'status'},
				{data: 'aksi'},
				],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0,1,2,3,4,5],
					className: 'text-center'
				},
				{
					targets: -1,
					title: 'Aksi',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="rincian_riwayat.html" class="btn btn-sm btn-primary btn_rincian" style="color:white;">Rincian</a>`;
					},
				},
				{
					targets: -2,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							pembayaran: {'title': 'Menunggu Pembayaran', 'class': 'btn-label-warning'},
							diterima: {'title': 'Diterima', 'class': ' btn-label-success'},
							batal: {'title': 'Dibatalkan', 'class': ' btn-label-danger'},
							konfirmasi: {'title': 'Menunggu Konfirmasi', 'class': ' btn-label-info'},
							expired: {'title': 'Expired', 'class': ' btn-label-dark'},
							persetujuan: {'title': 'Menunggu Persetujuan', 'class': ' btn-label-primary'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="btn btn-bold btn-sm btn-font-sm ' + status[data].class + '">' + status[data].title + '</span>';
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
	var initTable10 = function() {
		// begin first table
		var table = $('#tbl_list_rincian_riwayat').DataTable({
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
				url: '../source/riwayat_layanan.json',
				type: 'POST',
			},
			columns: [
				{data: 'laboratorium'},
				{data: 'nama_pengujian'},
				{data: 'tanggal_mulai'},
				{data: 'tanggal_selesai'},
				{data: 'status'},
				],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0,1,2,3,4],
					className: 'text-center'
				},
				{
					targets: -1,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							pembayaran: {'title': 'Menunggu Pembayaran', 'class': 'btn-label-warning'},
							diterima: {'title': 'Diterima', 'class': ' btn-label-success'},
							ditolak: {'title': 'Ditolak', 'class': ' btn-label-danger'},
							konfirmasi: {'title': 'Menunggu Konfirmasi', 'class': ' btn-label-info'},
							expired: {'title': 'Expired', 'class': ' btn-label-dark'},
							persetujuan: {'title': 'Menunggu Persetujuan', 'class': ' btn-label-primary'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="btn btn-bold btn-sm btn-font-sm ' + status[data].class + '">' + status[data].title + '</span>';
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
	var initTable11 = function() {
		// begin first table
		var table = $('#tbl_list_pengujian_simple').DataTable({
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
			},
			columns: [
				{data: 'id_pengujian'},
				{data: 'nama_paket_pengujian'},
				{data: 'jenis_paket_pengujian'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0, 1,2],
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
	var initTable12 = function() {
		// begin first table
		var table = $('#tbl_list_riwayat_penelitian').DataTable({
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
				url: '../source/riwayat_penelitian.json',
				type: 'POST',
			},
			columns: [
				{data: 'no'},
				{data: 'tanggal_permohonan'},
				{data: 'nama_pemohon'},
				{data: 'judul_kegiatan'},
				{data: 'status'},
				{data: 'aksi'},
				],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0,1,2,3,4,5],
					className: 'text-center'
				},
				{
					targets: -1,
					title: 'Aksi',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="rincian_riwayat.html" class="btn btn-sm btn-primary btn_rincian" style="color:white;">Rincian</a>`;
					},
				},
				{
					targets: 4,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							pembayaran: {'title': 'Menunggu Pembayaran', 'class': 'btn-label-warning'},
							diterima: {'title': 'Diterima', 'class': ' btn-label-success'},
							ditolak: {'title': 'Ditolak', 'class': ' btn-label-danger'},
							konfirmasi: {'title': 'Menunggu Konfirmasi', 'class': ' btn-label-info'},
							expired: {'title': 'Expired', 'class': ' btn-label-dark'},
							persetujuan: {'title': 'Menunggu Persetujuan', 'class': ' btn-label-primary'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="btn btn-bold btn-sm btn-font-sm ' + status[data].class + '">' + status[data].title + '</span>';
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
	var initTable13 = function() {
		// begin first table
		var table = $('#tbl_list_rincian_riwayat_penelitian').DataTable({
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
				url: '../source/riwayat_layanan.json',
				type: 'POST',
			},
			columns: [
				{data: 'laboratorium'},
				{data: 'nama_pengujian'},
				{data: 'tanggal_mulai'},
				{data: 'jam_mulai'},
				{data: 'jam_selesai'},
				{data: 'aksi'},
				],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0,1,2,3,4,5],
					className: 'text-center'
				},
				{
					targets: -1,
					title: 'Aksi',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a class="btn btn-sm btn-warning" style="color:white;">Pengujian Selesai</a>`;
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
	var initTable14 = function() {
		// begin first table
		var table = $('#tbl_list_penggunaan_alat').DataTable({
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
				url: '../source/penggunaan_alat.json',
				type: 'POST',
			},
			columns: [
				{data: 'no'},
				{data: 'nama_alat'},
				{data: 'jam_mulai'},
				{data: 'jam_selesai'},
				{data: 'kondisi'},
				{data: 'catatan'},
				{data: 'aksi'},


				],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0,1,2,3,4,5,6],
					className: 'text-center'
				},
				{
					targets: -1,
					title: 'Aksi',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <button data-toggle="modal" data-target="#kt_modal_rincian_alat" class="btn btn-sm btn-primary btn_rincian" style="color:white;">Rincian</button>`;
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
	var initTable15 = function() {
		// begin first table
		var table = $('#tbl_list_riwayat_layanan_dosen').DataTable({
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
				url: '../source/riwayat_layanan.json',
				type: 'POST',
			},
			columns: [
				{data: 'no'},
				{data: 'tanggal_permohonan'},
				{data: 'nama_pemohon'},
				{data: 'judul_kegiatan'},
				{data: 'jenis_kegiatan'},
				{data: 'sumber_dana'},
				{data: 'status'},
				{data: 'aksi'},
				],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0,1,2,3,4,5,6,7],
					className: 'text-center'
				},
				{
					targets: -1,
					title: 'Aksi',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="rincian_riwayat.html" class="btn btn-sm btn-primary btn_rincian" style="color:white;">Rincian</a>`;
					},
				},
				{
					targets: 6,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							pembayaran: {'title': 'Menunggu Pembayaran', 'class': 'btn-label-warning'},
							diterima: {'title': 'Diterima', 'class': ' btn-label-success'},
							batal: {'title': 'Dibatalkan', 'class': ' btn-label-danger'},
							konfirmasi: {'title': 'Menunggu Konfirmasi', 'class': ' btn-label-info'},
							expired: {'title': 'Expired', 'class': ' btn-label-dark'},
							persetujuan: {'title': 'Menunggu Persetujuan', 'class': ' btn-label-primary'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="btn btn-bold btn-sm btn-font-sm ' + status[data].class + '">' + status[data].title + '</span>';
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
	var initTable16 = function() {
		// begin first table
		var table = $('#tbl_daftar_alat_lab').DataTable({
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
				url: '../source/alat.json',
				type: 'POST',
			},
			columns: [
				{data: 'no'},
				{data: 'nama_alat'},
				{data: 'laboratorium'},
				{data: 'tipe'},
				{data: 'sumber_biaya'},
				{data: 'jumlah_alat'},
				{data: 'kondisi_baik'},
				{data: 'kondisi_rusak'},
				{data: 'harga_sewa'},
				{data: 'kalibrasi_terakhir'},
				{data: 'jumlah_pemakaian'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0, 1, 2, 3, 4,5,6,7,8,9,10],
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
	var initTable17 = function() {
		// begin first table
		var table = $('#tbl_daftar_kegiatan_mahasiswa').DataTable({
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
			},
			columns: [
				{data: 'id_kegiatan'},
				{data: 'nama'},
				{data: 'nama_kegiatan'},
				{data: 'jenis_kegiatan'},
				{data: 'laboratorium'},
				{data: 'tanggal_mulai'},
				{data: 'tanggal_selesai'},
				{data: 'jumlah_layanan'},
				{data: 'status'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0,1,2,3,4,5,6,7,8],
					className: 'text-center'
				},
				{
					targets: -1,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							m_verifikasi: {'title': 'Menunggu verifikasi', 'class': 'btn-label-warning'},
							selesai: {'title': 'Selesai', 'class': ' btn-label-success'},
							ditolak: {'title': 'Ditolak', 'class': ' btn-label-danger'},
							terkonfirmasi: {'title': 'Terkonfirmasi', 'class': ' btn-label-info'},
							expired: {'title': 'Expired', 'class': ' btn-label-dark'},
							persetujuan: {'title': 'Menunggu Persetujuan', 'class': ' btn-label-primary'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="btn btn-bold btn-sm btn-font-sm ' + status[data].class + '">' + status[data].title + '</span>';
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
	var initTable18 = function() {
		// begin first table
		var table = $('#tbl_daftar_kegiatan_dosen').DataTable({
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
			},
			columns: [
				{data: 'id_kegiatan'},
				{data: 'nama'},
				{data: 'nama_kegiatan'},
				{data: 'jenis_kegiatan'},
				{data: 'laboratorium'},
				{data: 'sumber_dana'},
				{data: 'tanggal_mulai'},
				{data: 'tanggal_selesai'},
				{data: 'jumlah_layanan'},
				{data: 'status'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0,1,2,3,4,5,6,7,8,9],
					className: 'text-center'
				},
				{
					targets: -1,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							m_verifikasi: {'title': 'Menunggu verifikasi', 'class': 'btn-label-warning'},
							selesai: {'title': 'Selesai', 'class': ' btn-label-success'},
							ditolak: {'title': 'Ditolak', 'class': ' btn-label-danger'},
							terkonfirmasi: {'title': 'Terkonfirmasi', 'class': ' btn-label-info'},
							expired: {'title': 'Expired', 'class': ' btn-label-dark'},
							persetujuan: {'title': 'Menunggu Persetujuan', 'class': ' btn-label-primary'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="btn btn-bold btn-sm btn-font-sm ' + status[data].class + '">' + status[data].title + '</span>';
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
	var initTable19 = function() {
		// begin first table
		var table = $('#tbl_daftar_kegiatan_mitra').DataTable({
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
			},
			columns: [
				{data: 'id_kegiatan'},
				{data: 'nama'},
				{data: 'instansi'},
				{data: 'nama_kegiatan'},
				{data: 'laboratorium'},
				{data: 'tanggal_mulai'},
				{data: 'tanggal_selesai'},
				{data: 'jumlah_layanan'},
				{data: 'biaya'},
				{data: 'status'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0,1,2,3,4,5,6,7,8,9],
					className: 'text-center'
				},
				{
					targets: -1,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							m_verifikasi: {'title': 'Menunggu verifikasi', 'class': 'btn-label-warning'},
							selesai: {'title': 'Selesai', 'class': ' btn-label-success'},
							ditolak: {'title': 'Ditolak', 'class': ' btn-label-danger'},
							terkonfirmasi: {'title': 'Terkonfirmasi', 'class': ' btn-label-info'},
							expired: {'title': 'Expired', 'class': ' btn-label-dark'},
							persetujuan: {'title': 'Menunggu Persetujuan', 'class': ' btn-label-primary'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="btn btn-bold btn-sm btn-font-sm ' + status[data].class + '">' + status[data].title + '</span>';
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
	var initTable20 = function() {
		// begin first table
		var table = $('#tbl_daftar_laporan_kerjasama').DataTable({
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
			},
			columns: [
				{data: 'id_kegiatan'},
				{data: 'laboratorium'},
				{data: 'jenis_kegiatan'},
				{data: 'instansi'},
				{data: 'region'},
				{data: 'waktu'},
				{data: 'status_kerjasama'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0,1,2,3,4,5,6],
					className: 'text-center'
				},
				{
					targets: -1,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							m_verifikasi: {'title': 'Menunggu verifikasi', 'class': 'btn-label-warning'},
							selesai: {'title': 'Selesai', 'class': ' btn-label-success'},
							ditolak: {'title': 'Ditolak', 'class': ' btn-label-danger'},
							terkonfirmasi: {'title': 'Terkonfirmasi', 'class': ' btn-label-info'},
							expired: {'title': 'Expired', 'class': ' btn-label-dark'},
							persetujuan: {'title': 'Menunggu Persetujuan', 'class': ' btn-label-primary'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="btn btn-bold btn-sm btn-font-sm ' + status[data].class + '">' + status[data].title + '</span>';
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
	var initTable21 = function() {
		// begin first table
		var table = $('#tbl_daftar_laporan_pelatihan').DataTable({
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
			},
			columns: [
				{data: 'id_kegiatan'},
				{data: 'nama_kegiatan'},
				{data: 'tanggal_mulai'},
				{data: 'tanggal_selesai'},
				{data: 'lokasi'},
				{data: 'jumlah_peserta'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0,1,2,3,4,5],
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
	var initTable22 = function() {
		// begin first table
		var table = $('#tbl_daftar_laporan_praktikum').DataTable({
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
			},
			columns: [
				{data: 'id_kegiatan'},
				{data: 'mata_kuliah'},
				{data: 'semester'},
				{data: 'tahun_ajaran'},
				{data: 'laboratorium'},
				{data: 'jumlah_peserta'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0,1,2,3,4,5],
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
	var initTable23 = function() {
		// begin first table
		var table = $('#tbl_daftar_surat_permohonan').DataTable({
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
				url: '../source/surat_permohonan.json',
				type: 'POST',
			},
			columns: [
				{data: 'no'},
				{data: 'no_surat'},
				{data: 'tanggal_surat'},
				{data: 'tujuan'},
				{data: 'perihal'},
				{data: 'instansi'},
				{data: 'scan_surat'},
				{data: 'aksi'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0, 1, 2, 3, 4,5,6,7],
					className: 'text-center'
				},
				{
					targets: -1,
					title: 'Aksi',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="rincian_daftar_permohonan.html" class="btn btn-sm btn-warning btn_rincian" style="color:white;">Rincian</a>` 
                        	+ '<a class="btn btn-sm btn-success btn_rincian" style="color:white;margin-left:5px">Disposisi</a>'
                        	+ '<a class="btn btn-sm btn-danger btn_rincian" style="color:white;margin-left:5px">Tolak</a>';
					},
				},
				{
					targets: -2,
					title: 'Scan Surat',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a class="btn btn-sm btn-primary btn_rincian" style="color:white;">Lihat</a>`;
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
	var initTable24 = function() {
		// begin first table
		var table = $('#pemakaian_alat').DataTable({
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
				url: '../source/pemakaian_alat.json',
				type: 'POST',
				
			},
			columns: [
				{data: 'no'},
				{data: 'alat'},
				{data: 'kondisi_alat'},
				{data: 'catatan'},
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

	return {

		//main function to initiate the module
		init: function() {
			initTable1();
			initTable1a();
			initTable2();
			initTable3();
			initTable4();
			initTable5();
			initTable6();
			initTable7();
			initTable8();
			initTable9();
			initTable9b();
			initTable10();
			initTable11();
			initTable12();
			initTable13();
			initTable14();
			initTable15();
			initTable16();
			initTable17();
			initTable18();
			initTable19();
			initTable20();
			initTable21();
			initTable22();
			initTable23();
			initTable24();
		},

	};

}();

jQuery(document).ready(function() {
	KTDatatablesSearchOptionsAdvancedSearch.init();
});