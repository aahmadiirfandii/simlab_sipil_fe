"use strict";
var KTDatatablesSearchOptionsAdvancedSearch = function() {

	$.fn.dataTable.Api.register('column().title()', function() {
		return $(this.header()).text().trim();
	});

	var initTable1 = function() {
		// begin first table
		var table = $('#tbl_list_verifikasi_praktikum').DataTable({
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
				url: '../source/verifikasi_praktikum.json',
				type: 'POST',
				
			},
			columns: [
				{data: 'no'},
				{data: 'nim'},
				{data: 'nama'},
				{data: 'nama_praktikum'},
				{data: 'semester'},
				{data: 'tahun_ajaran'},
				{data: 'status',responsivePriority: -1},
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
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="rincian_verifikasi_praktikum.html" class="btn btn-sm btn-warning" style="color:#212121;">Rincian</a>`;
					},
				},
				{
					targets: [0, 1, 2, 3, 4,5,6],
					className: 'text-center'
				},
				{
					targets: 6,
					width: 220,
					render: function(data, type, full, meta) {
						var status = {
							terverifikasi: {'title': 'Terverifikasi', 'class': ' btn-label-success'},
							belum: {'title': 'Belum Terverifikasi', 'class': 'btn-label-danger'},
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
	var initTable2 = function() {
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

			searchDelay: 500,
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
					width: 120,
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="rincian_praktikum.html" class="btn btn-sm btn-warning" style="color:#212121;margin-right:5px">Rincian</a>` +
                        '<button data-toggle="modal" data-target=".hapus" class="btn btn-sm btn-danger" style="margin-right:5px">Hapus</button>' +
                        '<button data-toggle="modal" data-target="#edit_praktikum" class="btn btn-sm btn-primary">Edit</button>';
					},
				},
				{
					targets: [0, 1, 2, 3, 4,5],
					className: 'text-center',
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
	var initTable3 = function() {
		// begin first table
		var table = $('#tbl_rincian_praktikum').DataTable({
			responsive: false,
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
			scrollX: true,
			processing: true,
			serverSide: true,
			ajax: {
				url: '../source/rincian_praktikum.json',
				type: 'POST',
				
			},
			columns: [
				{data: 'no_praktikum'},
				{data: 'nim_praktikan'},
				{data: 'nama_praktikan'},
				{data: 'pertemuan_1',},
				{data: 'pertemuan_2'},
				{data: 'pertemuan_3'},
				{data: 'pertemuan_4'},
				{data: 'pertemuan_5'},
				{data: 'pertemuan_6'},
				{data: 'pertemuan_7'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0, 1, 2, 3, 4,5,6,7,8,9],
					className: 'text-center'
				},
				{
					targets: -1,
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="#" class="kehadiran ">?</a>`;
					},
				},
				{
					targets: [3,,4,5,6,7,8,9],
					render: function(data, type, full, meta) {
						var status = {
							1: {'title': '', 'class': ' fa fa-check'},
							0: {'title': '', 'class': 'fa fa-times'},
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
	var initTable4 = function() {
		// begin first table
		var table = $('#tbl_list_appointment').DataTable({
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
				url: '../source/list_appointment.json',
				type: 'POST',
				
			},
			columns: [
				{data: 'no_appointment'},
				{data: 'id_appointment'},
				{data: 'nama'},
				{data: 'e-mail',},
				{data: 'pilihan_lab'},
				{data: 'tanggal_janjian'},
				{data: 'waktu'},
				{data: 'keperluan'},
				{data: 'aksi'},
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
					targets: 8,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <button data-toggle="modal" data-target="#kt_modal_alasan_penolakan" class="btn btn-sm btn-danger" style="margin-bottom:5px">Tolak</button>` +
                        '<button type="button" class="btn btn-sm btn-success kt_sweetalert_terima" >Terima</button>';
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
	var initTable4_laboran = function() {
		// begin first table
		var table = $('#tbl_list_appointment_laboran').DataTable({
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
				url: '../source/list_appointment.json',
				type: 'POST',
				
			},
			columns: [
				{data: 'no_appointment'},
				{data: 'id_appointment'},
				{data: 'nama'},
				{data: 'e-mail',},
				{data: 'pilihan_lab'},
				{data: 'tanggal_janjian'},
				{data: 'waktu'},
				{data: 'keperluan'},
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
		var table = $('#tbl_daftar_permohonan').DataTable({
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
				url: '../source/daftar_permohonan.json',
				type: 'POST',
				
			},
			columns: [
				{data: 'no'},
				{data: 'nama_lab'},
				{data: 'paket_pengujian'},
				{data: 'jenis'},
				{data: 'nama_kegiatan'},
				{data: 'jumlah'},
				{data: 'tanggal'},
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
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="rincian_daftar_permohonan.html" class="btn btn-sm btn-warning" style="color:#212121;">Rincian</a>`;
					},
				},
				{
					targets: [0, 1, 2, 3, 4,5,6,7],
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
				{data: 'jenis_pembayaran'},
				{data: 'no_invoice'},
				{data: 'total'},
				{data: 'status'},
				{data: 'lampiran'},
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
                        <a class="btn btn-sm btn-success" style="color:white;"><i class="fa fa-check"></i> Terima</a>`+' <a class="btn btn-sm btn-danger" style="color:white;"><i class="fa fa-times"></i>Tolak</a>';
					},  
				},
				{
					targets: -2,
					title: 'lampiran',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a class="btn btn-sm btn-warning" style="color:white;">Rincian</a>`+' <a class="btn btn-sm btn-brand" style="color:white;">Bukti Transfer</a>';
					},  
				},
				{
					targets: 5,
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
					targets: [0,1,2,3,4,5,6,7],
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
		var table = $('#tbl_rincian_kegiatan').DataTable({
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
				url: '../source/rincian_kegiatan.json',
				type: 'POST',
				
			},
			columns: [
				{data: 'no'},
				{data: 'laboratorium'},
				{data: 'layanan_laboratorium'},
				{data: 'tanggal'},
				{data: 'jam_mulai'},
				{data: 'jam_selesai'},
				{data: 'status',responsivePriority: -1},
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
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <button type="button" data-toggle="modal" data-target="#kt_modal_rincian_kegiatan" class="btn btn-primary">Rincian</button>`;
					},
				},
				{
					targets: [0,1,2,3,4,5,6,7],
					className: 'text-center'
				},
				{
					targets: -2,
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
	var initTable8 = function() {
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
				{data: 'kondisi'},
				{data: 'catatan'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: 2,
					title: 'Kondisi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
						<div class="kt-radio-inline">` +
						'<label class="kt-radio">' +
						'<input type="radio" name="radio2"> Baik'+
						'<span></span>'+
						'</label>' +
						'<label class="kt-radio">'+
						'<input type="radio" name="radio2"> Rusak'+
						'<span></span>'+
						'</label>'+
						'</div>';
					},
				},
				{
					targets: 3,
					title: 'Catatan',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `<input class="form-control" type="text" placeholder="input catatan(opsional)" id="catatan">`;
					},
				},
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
	var initTable9 = function() {
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
				{data: 'status_publikasi'},
				{data: 'Aksi', responsivePriority: -1},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0, 1, 2, 3, 4,5,6,7,8,9],
					className: 'text-center'
				},
				{
					targets: -1,
					title: 'Aksi',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a style="margin-top:5px" href="rincian_kegiatan.html" class="btn btn-sm btn-primary btn_rincian" style="color:white;">Rincian</a>`;
					},
				},
				{
					targets: -2,
					title: 'Status Publikasi',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
						<label style="display:none" id="status_publikasi_tampilkan">Sembunyikan</label>
						<span class="kt-switch kt-switch--outline kt-switch--icon kt-switch--primary">
						<label>
						<input type="checkbox" name="status_publikasi_switch">
						<span></span>
						</label>
						</span>`;
					},
				},
				{
					targets: -3,
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
	var initTable10 = function() {
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
			},
			columns: [
				{data: 'id_alat'},
				{data: 'no_inventaris'},
				{data: 'tahun_pengadaan'},
				{data: 'gambar_alat'},
				{data: 'nama_alat'},
				{data: 'tipe'},
				{data: 'sumber_biaya'},
				{data: 'fungsi_utama'},
				{data: 'jumlah_alat'},
				{data: 'kondisi_alat'},
				{data: 'harga_sewa'},
				{data: 'aksi', responsivePriority: -1},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0, 1, 2, 3, 4,5,6,7,8,9,10,11],
					className: 'text-center',
				},
				{
					targets: -1,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="rincian_alat.html" class="btn btn-sm btn-warning" style="color:#212121;">Rincian</a>`;
					},
				},
				{
					targets: 3,
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <img style="width:100%" src="https://www.w3schools.com/html/pic_trulli.jpg" alt="Italian Trulli">`;
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
		var table = $('#tbl_jadwal_pemakaian').DataTable({
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
				url: '../source/jadwal_pemakaian.json',
				type: 'POST',
			},
			columns: [
				{data: 'no'},
				{data: 'penanggung_jawab'},
				{data: 'jenis_kegiatan'},
				{data: 'tanggal'},
				{data: 'waktu_mulai'},
				{data: 'waktu_selesai'},
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
					className: 'text-center',
				},
				{
					targets: -1,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="rincian_kegiatan.html" class="btn btn-sm btn-warning" style="color:#212121;">Rincian</a>`;
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
	var initTable12 = function() {
		// begin first table
		var table = $('#tbl_kalibrasi').DataTable({
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
				url: '../source/kalibrasi.json',
				type: 'POST',
			},
			columns: [
				{data: 'no'},
				{data: 'no_kode_alat'},
				{data: 'nama_kalibrasi'},
				{data: 'tanggal'},
				{data: 'instansi'},
				{data: 'hasil_kalibrasi'},
				{data: 'file'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0,1,2,3,4,5,6],
					className: 'text-center',
				},
				{
					targets: -1,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="/books/a-great-book.pdf" target="_blank" class="btn btn-sm btn-warning" style="color:#212121;">View</a>`+
                        ' <a  class="btn btn-sm btn-secondary" style="color:#212121;">Hapus</a>';
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
		var table = $('#tbl_layanan_lab').DataTable({
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
				url: '../source/layanan_lab_a.json',
				type: 'POST',
			},
			columns: [
				{data: 'no'},
				{data: 'paket_pengujian'},
				{data: 'durasi'},
				{data: 'deskripsi'},
				{data: 'harga'},
				{data: 'status_publikasi'},
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
					className: 'text-center',
				},
				{
					targets: -1,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a data-toggle="modal" data-target="#edit_paket_pengujian" class="btn btn-sm btn-warning" style="color:#212121;">Edit</a>`;
					},
				},
				{
					targets: -2,
					title: 'Status Publikasi',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
						<div class="row">
							<div style="padding-right:0px" class="col-4">
								<label>Sembunyikan</label>
							</div>
							<div style="padding-right:0px;padding-left:0px" class="col-4">
								<label style="display:none" id="status_publikasi_tampilkan">Sembunyikan</label>
								<span class="kt-switch kt-switch--outline kt-switch--icon kt-switch--primary">
								<label>
								<input style="width:100%" type="checkbox" name="status_publikasi_switch">
								<span></span>
								</label>
								</span>
							</div>
							<div style="padding-left:0px" class="col-4">
								<label>Tampilkan</label>
							</div>
						</div>
						`;
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
		var table = $('#tbl_jadwal_layanan').DataTable({
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
				url: '../source/jadwal_layanan.json',
				type: 'POST',
			},
			columns: [
				{data: 'no'},
				{data: 'tanggal'},
				{data: 'nama'},
				{data: 'nama_layanan'},
				{data: 'jenis_kegiatan'},
				{data: 'instansi'},
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
					className: 'text-center',
				},
				{
					targets: -1,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <button class="btn btn-sm btn-warning" style="margin-right:5px">Pengujian Selesai</button>` +
                        '<a href="rincian_kegiatan.html" class="btn btn-sm btn-info">Rincian</a>';
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
		var table = $('#tbl_daftar_permohonan_mahasiswa').DataTable({
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
				url: '../source/permohonan_pengujian.json',
				type: 'POST',
			},
			columns: [
				{data: 'no'},
				{data: 'tanggal_permohonan'},
				{data: 'nama_pemohon'},
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
					targets: [0,1,2,3,4,5,6],
					className: 'text-center',
				},
				{
					targets: -1,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="rincian_daftar_permohonan_mahasiswa.html" class="btn btn-sm btn-warning" >Rincian</a>`;
					},
				},
				{
					targets: -2,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							m_konfirmasi: {'title': 'Menunggu Konfirmasi', 'class': 'btn-label-warning'},
							diterima: {'title': 'Diterima', 'class': ' btn-label-success'},
							ditolak: {'title': 'Ditolak', 'class': ' btn-label-danger'},
							terkonfirmasi: {'title': 'terkonfirmasi', 'class': ' btn-label-info'},
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
		var table = $('#tbl_layanan_lab_mahasiswa').DataTable({
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
				url: '../source/layanan_lab_mahasiswa.json',
				type: 'POST',
			},
			columns: [
				{data: 'no'},
				{data: 'laboratorium'},
				{data: 'layanan_lab'},
				{data: 'tanggal'},
				{data: 'jam_mulai'},
				{data: 'jam_selesai'},
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
					targets: [0,1,2,3,4,5,6],
					className: 'text-center',
				},
				{
					targets: -1,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <button  class="btn btn-sm btn-danger" ><i class="fa fa-times"></i>Tolak</button>` +
                        '<button style="margin:0px 5px" class="btn btn-sm btn-success" ><i class="fa fa-check"></i>Terima</button>'+
                        '<button type="button" data-toggle="modal" data-target="#kt_modal_rincian_kegiatan"  class="btn btn-sm btn-warning">Rincian</button>';
					},
				},
				{
					targets: -2,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							pembayaran: {'title': 'Menunggu Pembayaran', 'class': 'btn-label-warning'},
							diterima: {'title': 'Diterima', 'class': ' btn-label-success'},
							ditolak: {'title': 'Ditolak', 'class': ' btn-label-danger'},
							terkonfirmasi: {'title': 'terkonfirmasi', 'class': ' btn-label-info'},
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
	var initTable16_kepala_lab = function() {
		// begin first table
		var table = $('#tbl_layanan_lab_kepala_lab').DataTable({
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
				url: '../source/layanan_lab_mahasiswa.json',
				type: 'POST',
			},
			columns: [
				{data: 'no'},
				{data: 'laboratorium'},
				{data: 'layanan_lab'},
				{data: 'tanggal'},
				{data: 'jam_mulai'},
				{data: 'jam_selesai'},
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
					targets: [0,1,2,3,4,5,6],
					className: 'text-center',
				},
				{
					targets: -1,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <button type="button" data-toggle="modal" data-target="#kt_modal_rincian_kegiatan"  class="btn btn-sm btn-warning">Rincian</button>`;
					},
				},
				{
					targets: -2,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							pembayaran: {'title': 'Menunggu Pembayaran', 'class': 'btn-label-warning'},
							diterima: {'title': 'Diterima', 'class': ' btn-label-success'},
							ditolak: {'title': 'Ditolak', 'class': ' btn-label-danger'},
							terkonfirmasi: {'title': 'terkonfirmasi', 'class': ' btn-label-info'},
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
	var initTable17 = function() {
		// begin first table
		var table = $('#tbl_daftar_permohonan_dosen').DataTable({
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
				url: '../source/permohonan_pengujian.json',
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
					className: 'text-center',
				},
				{
					targets: -1,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="rincian_daftar_permohonan_dosen.html" class="btn btn-sm btn-warning" >Rincian</a>`;
					},
				},
				{
					targets: -2,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							m_konfirmasi: {'title': 'Menunggu Konfirmasi', 'class': 'btn-label-warning'},
							diterima: {'title': 'Diterima', 'class': ' btn-label-success'},
							ditolak: {'title': 'Ditolak', 'class': ' btn-label-danger'},
							terkonfirmasi: {'title': 'terkonfirmasi', 'class': ' btn-label-info'},
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
		var table = $('#tbl_layanan_lab_dosen').DataTable({
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
				url: '../source/layanan_lab_mahasiswa.json',
				type: 'POST',
			},
			columns: [
				{data: 'no'},
				{data: 'laboratorium'},
				{data: 'layanan_lab'},
				{data: 'tanggal'},
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
					targets: [0,1,2,3,4,5,6],
					className: 'text-center',
				},
				{
					targets: -1,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <button  class="btn btn-sm btn-danger" ><i class="fa fa-times"></i>Tolak</button>` +
                        '<button style="margin:0px 5px" class="btn btn-sm btn-success" ><i class="fa fa-check"></i>Terima</button>'+
                        '<button type="button" data-toggle="modal" data-target="#kt_modal_rincian_kegiatan"  class="btn btn-sm btn-warning">Rincian</button>';
					},
				},
				{
					targets: -2,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							pembayaran: {'title': 'Menunggu Pembayaran', 'class': 'btn-label-warning'},
							diterima: {'title': 'Diterima', 'class': ' btn-label-success'},
							ditolak: {'title': 'Ditolak', 'class': ' btn-label-danger'},
							terkonfirmasi: {'title': 'terkonfirmasi', 'class': ' btn-label-info'},
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
		var table = $('#tbl_daftar_permohonan_mitra').DataTable({
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
				url: '../source/layanan_lab_mahasiswa.json',
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
					targets: [0,1,2,3,4,5,6],
					className: 'text-center',
				},
				{
					targets: -1,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="rincian_daftar_permohonan_mitra.html" class="btn btn-sm btn-warning" >Rincian</a>`;
					},
				},
				{
					targets: -2,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							m_konfirmasi: {'title': 'Menunggu Konfirmasi', 'class': 'btn-label-warning'},
							diterima: {'title': 'Diterima', 'class': ' btn-label-success'},
							ditolak: {'title': 'Ditolak', 'class': ' btn-label-danger'},
							terkonfirmasi: {'title': 'terkonfirmasi', 'class': ' btn-label-info'},
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
		var table = $('#tbl_layanan_lab_mitra').DataTable({
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
				url: '../source/layanan_lab_mahasiswa.json',
				type: 'POST',
			},
			columns: [
				{data: 'no'},
				{data: 'laboratorium'},
				{data: 'layanan_lab'},
				{data: 'tanggal'},
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
					targets: [0,1,2,3,4,5,6],
					className: 'text-center',
				},
				{
					targets: -1,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <button  class="btn btn-sm btn-danger" ><i class="fa fa-times"></i>Tolak</button>` +
                        '<button style="margin:0px 5px" class="btn btn-sm btn-success" ><i class="fa fa-check"></i>Terima</button>'+
                        '<button type="button" data-toggle="modal" data-target="#kt_modal_rincian_kegiatan"  class="btn btn-sm btn-warning">Rincian</button>';
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
		var table = $('#tbl_daftar_permohonan_lainnya').DataTable({
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
				url: '../source/permohonan_pengujian.json',
				type: 'POST',
			},
			columns: [
				{data: 'no'},
				{data: 'tanggal_permohonan'},
				{data: 'nama_pemohon'},
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
					targets: [0,1,2,3,4,5,6],
					className: 'text-center',
				},
				{
					targets: -1,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="rincian_daftar_permohonan_lainnya.html" class="btn btn-sm btn-warning" >Rincian</a>`;
					},
				},
				{
					targets: -2,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							m_konfirmasi: {'title': 'Menunggu Konfirmasi', 'class': 'btn-label-warning'},
							diterima: {'title': 'Diterima', 'class': ' btn-label-success'},
							ditolak: {'title': 'Ditolak', 'class': ' btn-label-danger'},
							terkonfirmasi: {'title': 'terkonfirmasi', 'class': ' btn-label-info'},
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
	var initTable22 = function() {
		// begin first table
		var table = $('#pemakaian_alat_b').DataTable({
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
					targets: 2,
					title: 'Kondisi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
						<div class="kt-radio-inline">` +
						'<label class="kt-radio">' +
						'<input type="radio" name="radio2"> Baik'+
						'<span></span>'+
						'</label>' +
						'<label class="kt-radio">'+
						'<input type="radio" name="radio2"> Rusak'+
						'<span></span>'+
						'</label>'+
						'</div>';
					},
				},
				{
					targets: 3,
					title: 'Catatan',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `<input class="form-control" type="text" placeholder="input catatan(opsional)" id="catatan">`;
					},
				},
				{
					targets: [0,1,2,3,4],
					className: 'text-center'
				},
				{
					targets: -1,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="#" class="btn btn-sm btn-warning" style="color:#212121;">Rincian</a>`;
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
	var initTable23 = function() {
		// begin first table
		var table = $('#tbl_daftar_kerjasama').DataTable({
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
				url: '../source/daftar_kerjasama.json',
				type: 'POST',
				
			},
			columns: [
				{data: 'no'},
				{data: 'jenis_kegiatan'},
				{data: 'instansi'},
				{data: 'region'},
				{data: 'waktu'},
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
					targets: [0,1,2,3,4,5,6],
					className: 'text-center'
				},
				{
					targets: -1,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="#" class="btn btn-sm btn-warning" style="color:#212121;">Rincian</a>`;
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
		var table = $('#tbl_penggunaan_alat').DataTable({
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
				{data: 'tanggal'},
				{data: 'jam_mulai'},
				{data: 'jam_selesai'},
				{data: 'status_pembayaran'},
				{data: 'keterangan'},
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
					width: 120,
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a data-toggle="modal" data-target="#modal_pemakaian_alat" class="btn btn-sm btn-warning" style="color:#212121;">Rincian</a>`;
					},
				},
				{
					targets: [0, 1, 2, 3, 4,5,6,7],
					className: 'text-center',
				},
				{
					targets: -3,
					width: 200,
					render: function(data, type, full, meta) {
						var status = {
							lunas: {'title': 'Lunas', 'class': ' btn-label-success'},
							b_lunas: {'title': 'Belum Lunas', 'class': ' btn-label-danger'},
							
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
	var initTable25 = function() {
		// begin first table
		var table = $('#tbl_daftar_harga_sewa_alat').DataTable({
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
				{data: 'jumlah_alat'},
				{data: 'harga_sewa'},
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
					width: 120,
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="rincian_alat.html" class="btn btn-sm btn-warning" style="color:#212121;">Rincian</a>`;
					},
				},
				{
					targets: [0,1,2,3,4],
					className: 'text-center',
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
	var initTable26 = function() {
		// begin first table
		var table = $('#tbl_pelatihan_baru').DataTable({
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
				url: '../source/pelatihan_baru.json',
				type: 'POST',
				
			},
			columns: [
				{data: 'no'},
				{data: 'nama_kegiatan'},
				{data: 'instansi'},
				{data: 'tanggal_mulai'},
				{data: 'tanggal_selesai'},
				{data: 'lokasi'},
				{data: 'jumlah_peserta'},
				{data: 'biaya_kegiatan'},
				{data: 'link'},
				{data: 'status_publikasi'},
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
					width: 120,
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="rincian_pelatihan.html" class="btn btn-sm btn-warning" style="color:#212121;">Rincian</a>`;
					},
				},
				{
					targets: [0,1,2,3,4,5,6,7,8,9,10],
					className: 'text-center',
				},
				{
					targets: -2,
					title: 'Status Publikasi',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
						<label style="display:none" id="status_publikasi_tampilkan">Sembunyikan</label>
						<span class="kt-switch kt-switch--outline kt-switch--icon kt-switch--primary">
						<label>
						<input type="checkbox" name="status_publikasi_switch">
						<span></span>
						</label>
						</span>`;
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
	var initTable_2_kelompok = function() {
		// begin first table
		var table = $('#jumlah_kelompok_2').DataTable({
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
				url: '../source/pembagian_kelompok.json',
				type: 'POST',
				
			},
			columns: [
				{data: 'kelompok_1'},
				{data: 'kelompok_2'},
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
	var initTable_3_kelompok = function() {
		// begin first table
		var table = $('#jumlah_kelompok_3').DataTable({
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
				url: '../source/pembagian_kelompok.json',
				type: 'POST',
				
			},
			columns: [
				{data: 'kelompok_1'},
				{data: 'kelompok_2'},
				{data: 'kelompok_3'},
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
	var initTable_4_kelompok = function() {
		// begin first table
		var table = $('#jumlah_kelompok_4').DataTable({
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
				url: '../source/pembagian_kelompok.json',
				type: 'POST',
				
			},
			columns: [
				{data: 'kelompok_1'},
				{data: 'kelompok_2'},
				{data: 'kelompok_3'},
				{data: 'kelompok_4'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0, 1,2,3],
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
	var initTable_5_kelompok = function() {
		// begin first table
		var table = $('#jumlah_kelompok_5').DataTable({
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
				url: '../source/pembagian_kelompok.json',
				type: 'POST',
				
			},
			columns: [
				{data: 'kelompok_1'},
				{data: 'kelompok_2'},
				{data: 'kelompok_3'},
				{data: 'kelompok_4'},
				{data: 'kelompok_5'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: [0, 1,2,3,4],
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
	var initTable27 = function() {
		// begin first table
		var table = $('#tbl_list_nama_praktikan').DataTable({
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
				url: '../source/praktikan.json',
				type: 'POST',
				
			},
			columns: [
				{data: 'checkbox'},
				{data: 'no'},
				{data: 'nim'},
				{data: 'nama'},
				{data: 'nama_kelompok'},

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
					width: 50,
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
						<label class="kt-checkbox kt-checkbox--solid kt-checkbox--success">
						<input type="checkbox">
						<span></span>
						</label>`;
					},
				},
				{
					targets: [0,1,2,3,4],
					className: 'text-center',
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
			initTable2();
			initTable3();
			initTable4();
			initTable4_laboran();
			initTable5();
			initTable6();
			initTable7();
			initTable8();
			initTable9();
			initTable10();
			initTable11();
			initTable12();
			initTable13();
			initTable14();
			initTable15();
			initTable16();
			initTable16_kepala_lab();
			initTable17();
			initTable18();
			initTable19();
			initTable20();
			initTable21();
			initTable22();
			initTable23();
			initTable24();
			initTable25();
			initTable26();
			initTable_2_kelompok();
			initTable_3_kelompok();
			initTable_4_kelompok();
			initTable_5_kelompok();
			initTable27();
		},

	};

}();

jQuery(document).ready(function() {
	KTDatatablesSearchOptionsAdvancedSearch.init();
});