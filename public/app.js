$(function () {
    const renderKudos = function () {
        $.ajax({
            method: "GET",
            url: '/kudos'
        }).then(function (kudos) {
            $('#kudosArea').empty();
            for (let i = 0; i < kudos.length; i++) {
                $(`<div class="border border-dark rounded mb-1" id="eachKudo${i}" </div>`).appendTo('#kudosArea');
                $(`#eachKudo${i}`).append(`<h2>${kudos[i].sender_name} gave kudos to ${kudos[i].receiver_name}</h2>`);
                $(`#eachKudo${i}`).append(`<h3 class="text-primary">${kudos[i].title}</h3>`);
                $(`#eachKudo${i}`).append(`<p>${kudos[i].body}</p>`);
            }
        })
    }

    renderKudos();
    const addUser = function (e) {
        if ($('#userNameNew').val()) {
            $.ajax({
                method: 'POST',
                url: 'api/users',
                data: { 'name': $('#userNameNew').val().trim() }
            }).then(function (success) {
                if (success) {
                    $('#userNameNew').val('');
                    $('#userCreate').addClass('invisible');
                    alert('User added successfully!')
                } else alert('Something Happened.... Try Again')
            })
        } else alert('Enter a Name!!');
    }
    const displayKudoBox = function (e) {
        e.preventDefault();
        $.ajax({
            method: 'GET',
            url: '/users'
        }).then(function (users) {
            $('#kudo-sender').empty();
            $('#kudo-getter').empty();
            $('#kudo-sender').append(`<option selected="" disabled="" value="">Select Sender</option>`) 
            $('#kudo-getter').append(`<option selected="" disabled="" value="">Select Reciever</option>`) 
            for (let i = 0; i < users.length; i++) {
                $('#kudo-sender').append(`<option data-val="${users[i]._id}" value="${users[i].name}">${users[i].name}</option>`);
                $('#kudo-getter').append(`<option data-val="${users[i]._id}" value="${users[i].name}">${users[i].name}</option>`)
            }

        }).then(function () {
            $('#kudosModal').modal('show');
        })

    };
    const sendKudos = function () {
        
        const Kudo = {
            // sender_id: $('#kudo-sender').data('val'),
            // getter_id: $('#kudo-getter').data('val'),
            sender_name: $('#kudo-sender').val(),
            receiver_name: $('#kudo-getter').val(),
            title: $('#kudo-title').val().trim(),
            body: $('#kudo-body').val().trim()
        };
        if ($('#kudo-sender').val() && $('#kudo-getter').val() && $('#kudo-title').val() && $('#kudo-body').val()) {
            $.ajax({
                method: 'POST',
                url: 'api/kudos',
                data: Kudo
            }).then(function (resp) {
                console.log(resp);
                $('#kudo-sender').val('');
                $('#kudo-getter').val('');
                $('#kudo-title').val('');
                $('#kudo-body').val('');
                $('#kudosModal').modal('hide');
            })
        } else alert('Please fill out your Kudo completely!');
        renderKudos();
    }



    $('#kudosButton').on('click', displayKudoBox);

    $('#kudosModal').on('click', 'data-dismiss', function (e) {
        e.preventDefault();
        $('#kudosModal').modal('dispose');
        $('#kudosModal').modal('hide');
    })
    $('#submitKudos').on('click', sendKudos);
    $('#userAdd').on('click', function (e) {
        e.preventDefault();
        $('#userCreate').toggleClass('invisible');
    });
    $('#userAuth').on('click', addUser);

})