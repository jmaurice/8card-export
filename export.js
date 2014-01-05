function export_contacts(ra, pa) {
	res = (typeof res == 'undefined' ? [] : ra);
	page = (typeof pa == 'undefined' ? 1 : pa);

	$.ajax({
		type: "GET",
		url: "https://8card.net/people/display_personal_cards.json?0.13670155755244195&_method=get&sort=5&transcribing=0&per_page=100&web=1&use_paginate=1&tags=&index=&keyword=&page=" + page,
		dataType: "json",
		success: function(data)
		{
			$.each(data, function(i,obj)
			{
				$.each(obj, function(month,cards)
				{
					if (!cards || cards.length === 0)
						return;

					$.each(cards, function(j, card)
					{
						var person = card.person;
						var info = person.personal_cards[0].eight_card || person.personal_cards[0].friend_card;
						var r = [];
						r.push(info.front_company_name === "" ? info.back_company_name : info.front_company_name);
						r.push(info.front_company_name_reading === "" ? info.back_company_name_reading : info.front_company_name_reading);
						r.push(info.front_full_name === "" ? info.back_full_name : info.front_full_name);
						r.push(info.front_full_name_reading === "" ? info.back_full_name_reading : info.front_full_name_reading);
						r.push(info.front_department === "" ? info.back_department : info.front_department);
						r.push(info.front_title === "" ? info.back_title : info.front_title);
						r.push(info.front_postal_code === "" ? info.back_postal_code : info.front_postal_code);
						r.push(info.front_address === "" ? info.back_address : info.front_address);
						r.push(info.front_company_phone_number === "" ? info.back_company_phone_number : info.front_company_phone_number);
						r.push(info.front_tel1 === "" ? info.back_tel1 : info.front_tel1);
						r.push(info.front_email === "" ? info.back_email : info.front_email);
						r.push(month);
						res.push(r);

						document.body.innerHTML = '<span style="font-size: 24pt;">exported ' + res.length + ' contacts...</span>';
					});
				});
			});
			if (data.length > 0)
			{
				export_contacts(res, page + 1);
			}
			else
			{
				out = '<span style="font-size: 24pt;">done! got ' + res.length + ' contacts.</span><br>';
				out += '<table style="font-size: 8pt">';
				$.each(res, function(i, card)
					{
						out += '<tr nowrap="nowrap">';
						out += '<td nowrap="nowrap">';
						card.forEach(function(datum)
							{
								out += '<td>';
								out += (typeof datum === 'undefined' ? '' : datum);
								out += '</td>';
							}
						);
						out += '</td>';
						out += '</tr>';
					}
				);
				out += '<table>';

				document.body.innerHTML = out;
			}
		}
	});
}

var btn = $('<button style="font-size: 2em">EXPORT CONTACTS TO TEXT</button>');
btn.click(export_contacts);
$('.btns_l').append(btn);

