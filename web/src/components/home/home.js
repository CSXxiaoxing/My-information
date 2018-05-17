$(function(){
    var subClass = $('.subclass');
    var changeBtn = $('.glyphicon-cog');
    get('javascript');
    subClass.click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.m-right h3').text($(this).text());
        get($(this).text().toLowerCase());
    });
    changeBtn.click(function(){
        $('#myModal').modal('show');        
        $('.modal-title').text($(this).closest('.head').text()).attr('data-subclass',$(this).closest('.head').attr('data-subclass'));
        var findObj = {
            class:$('.m-right h3').text(),
            subclass:$(this).attr("data-name")
        }
        change(findObj);
    });
    $('.modal-body').on('click','i',function(){
        var findObj = {
            class:$('.m-right h3').text(),
            subclass:$('.modal-title').attr('data-subclass')
        }
        $.get('../api/index.php', {id:$(this).parent().attr('data-id')}, function(data){
            if(data == 'ok'){
                change(findObj);
            }
        } )
    })
    $('.hiddenbtn').click(function(){
        get($('.m-right h3').text());
    });
    $('.add').click(function(daa){
        var webName = $('#InputName').val().trim();
        var webUrl = $('#InputUrl').val().trim();
        if(webName == ''){
            $('#InputName').css('borderColor','#FF5E53');
            return false;
        }else if(webUrl == ''){
            $('#InputName').css('borderColor','#ccc');
            $('#InputUrl').css('borderColor','#FF5E53');
            return false;
        }
        $('#InputUrl').css('borderColor','#ccc');
        var addObj = {
            url:webUrl,
            name:webName,
            class:$('.m-right h3').text(),
            subclass:$('.modal-title').attr('data-subclass')
        }
        var findObj = {
            class:$('.m-right h3').text(),
            subclass:$('.modal-title').attr('data-subclass')
        }
        $.get('../api/index.php', addObj, function(data){
            if(data == 'ok'){
                change(findObj);
            }
        })
        return false;
    });
    function get(param){
        $.get('../api/index.php',{class:param},function(data){
            data = JSON.parse(data);
            var collect = $('.collectsite ul');
            var study = $('.studysite ul');
            study.html('');
            collect.html('');
            $.each(data,function(idx,item){
                if(item.subclass == 'study'){
                    study.html(study.html() + `<li class="collect-web"><a href="${item.url}" target="_blank">${item.name}</a></li>`);
                }
                if(item.subclass == 'collect'){
                    collect.html(collect.html() + `<li class="collect-web"><a href="${item.url}" target="_blank">${item.name}</a></li>`);
                }
            });
        })
    }
    function change(findObj){
        $.get('../api/index.php', findObj, function(data){
            data = JSON.parse(data);
            var modalBody = $(".modal-body");
            modalBody.html('');
            $.each(data,function(idx,item){
                modalBody.html(modalBody.html() + `<li class="changeweb" data-id="${item.id}"><span>${item.name}</span><i class="glyphicon glyphicon-remove-circle delete"></i></li>`);
            })
        })
    }
})